const express = require('express');
const app = express();
const natural = require('natural');
const bodyParser = require('body-parser');
const js2xmlparser = require("js2xmlparser");
const classifier = new natural.BayesClassifier();
const fs = require('fs');
const XMLfilename = 'test.aiml.xml';
const train = require('./trainList.json');


// for bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// get request
app.get('/api/questions/:question', (req, res) => {

  const trainList = train[0].FAQ_Dataset;
  for (let i = 0; i < trainList.length; i ++){
    for (let j = 0; j < trainList[i].answer.length; j ++){
      classifier.addDocument(trainList[i].answer[j],trainList[i].question);
    }
  };
  var questionFixed = ''; //synonmys initial

  // initial AIMLInterpreter and open aiml files
  var AIMLInterpreter = require('./AIMLInterpreter');
  var aimlInterpreter = new AIMLInterpreter();
  aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);

  var question = req.params.question;
  natural.PorterStemmer.attach();
  var tokenizeQuestion = question.tokenizeAndStem();
  console.log(tokenizeQuestion)


  // find the nearest possible synonmys
  classifier.train();
  questionFixed = classifier.getClassifications(tokenizeQuestion)[0].label;
  console.log(classifier.getClassifications(tokenizeQuestion).slice(0,4));
  console.log(questionFixed)
  
  // get the answers into json format 
  var callback = function(answer){
    var goodanswer = {};
    goodanswer['whatIsQuestion'] = answer;
    return (res.json(goodanswer));
  };
  aimlInterpreter.findAnswerInLoadedAIMLFiles(questionFixed,callback);
});


app.post('/api/customizeQuestions', (req, res) => {
  let template = req.body.answer;
  let pattern = req.body.question.toUpperCase();

  //parser json data and transfer to xml data
  let xmlCustomize = {'pattern':pattern, 'template':template};
  const elementXML = js2xmlparser.parse("category", xmlCustomize);


  // check if the input data whether we have already set in database
  const trainList = train[0].FAQ_Dataset;
  var ifInsert = 1;
  for (let i = 0; i < trainList.length; i ++){
    console.log(trainList[i].question,pattern)
    if (trainList[i].question === pattern){
      console.log('can not write into files')
      let postRes = {};
      ifInsert = 0;
      postRes['ableToInsert'] = ifInsert;
      return (res.json(postRes))
    }
  };


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

    // if(dataPre.slice(22,).includes(pattern)){
    //   console.log(dataPre.slice(22,).indexOf(pattern));
    //   console.log(dataPre.slice(22+3885,22+3885+33))
    // }