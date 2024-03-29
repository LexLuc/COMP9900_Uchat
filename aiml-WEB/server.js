const express = require('express');
const app = express();
const natural = require('natural');
const bodyParser = require('body-parser');
const js2xmlparser = require("js2xmlparser");
const classifier = new natural.BayesClassifier();
const fs = require('fs');
const XMLfilename = 'Website.aiml.xml';
const trainFilename = 'trainList.json';
const train = require('./trainList.json');
const fetch = require('node-fetch')

// for bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// get request
app.get('/api/questions/:question', (req, res) => {

  console.log('object')
  const trainList = train;
  var trainAnswerListCheckIfExsit = [];
  for (let i = 0; i < trainList.length; i ++){
    for (let j = 0; j < trainList[i].answer.length; j ++){
      classifier.addDocument(trainList[i].answer[j],trainList[i].question);
      trainAnswerListCheckIfExsit.push(trainList[i].answer[j]);
    }
  };
  var questionFixed = ''; //synonmys initial

  // initial AIMLInterpreter and open aiml files
  var AIMLInterpreter = require('./AIMLInterpreter');
  var aimlInterpreter = new AIMLInterpreter();
  aimlInterpreter.loadAIMLFilesIntoArray(['./Website.aiml.xml']);

  var question = req.params.question;
  natural.PorterStemmer.attach();
  var tokenizeQuestion = question.tokenizeAndStem();


  // check if it has no answer 
  var checkIfNoAnswer = false;
  for (let i = 0;i< tokenizeQuestion.length; i ++){
    for (let j = 0;j< trainAnswerListCheckIfExsit.length; j ++){    
      let attentionSpace = trainAnswerListCheckIfExsit[j].split(' ');
      for (let z = 0;z < attentionSpace.length ;z ++){
        if(attentionSpace[z] === tokenizeQuestion[i]){
          checkIfNoAnswer = true;
        }
      } 
    }
  }
   
  if (checkIfNoAnswer === true){
    // find the nearest possible synonmys
    classifier.train();
    questionFixed = classifier.getClassifications(tokenizeQuestion)[0].label;
    
    // get the answers into json format 
    var callback = function(answer){
      var goodanswer = {};
      goodanswer['whatIsQuestion'] = answer;
      return (res.json(goodanswer));
    };
    aimlInterpreter.findAnswerInLoadedAIMLFiles(questionFixed,callback);
  }

  // when it comes to no answer from aiml
  else{
    let data = {'question': req.params.question};
    fetch('http://127.0.0.1:8080/api/dailychat', {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
          'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      let output = {'whatIsQuestion': json['whatIsQuestion']};
      return (res.json(output));
    })

  }

});



app.post('/api/customizeQuestions', (req, res) => {
  let template = req.body.answer;
  let pattern = req.body.question.toUpperCase();

  //parser json data and transfer to xml data
  let xmlCustomize = {'pattern':pattern, 'template':template};
  const elementXML = js2xmlparser.parse("category", xmlCustomize);

  // check if the input data whether we have already set in database
  const trainList = train;
  var ifInsert = 1;
  for (let i = 0; i < trainList.length; i ++){
    if (trainList[i].question === pattern){
      let postRes = {};
      ifInsert = 0;
      postRes['ableToInsert'] = ifInsert;
      return (res.json(postRes))
    }
  };

  // train the customize data
  fs.readFile(trainFilename, 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    var tokenizeQuestion = template.split(' ');
    tokenizeQuestion.push(req.body.question.toLowerCase());
    obj.push({"question": pattern, "answer":tokenizeQuestion}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(trainFilename, json, 'utf8', function(err){
      if(err) throw err;
    }); // write it back 
    }
  });

  // write the customize data into aiml database
  fs.readFile(XMLfilename, "utf8", function(err, data) {
    if (err) throw err;
    let dataPre = data.slice(0,-7);
    let dataRest = data.slice(-7,);

    let insertXML = dataPre + elementXML.slice(22,) + dataRest;
    fs.writeFile(XMLfilename, insertXML,function(err) {
      if (err) throw err;
      let postRes = {};
      postRes['ableToInsert'] = ifInsert;
      return (res.json(postRes));
    }) 
   });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);