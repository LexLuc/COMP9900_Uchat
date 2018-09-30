const express = require('express');
const app = express();



app.get('/api/questions/:question', (req, res) => {
  const question = req.params.question;
  //const question = 'What is your name?';

  var AIMLInterpreter = require('./AIMLInterpreter');
  var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
  aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);
  var callback = function(answer){
    const whatIsQuestion = req.params.question;
    var goodanswer = {};
    goodanswer[whatIsQuestion] = answer;
    //console.log('sdfs')
    return (res.json(goodanswer));
  };
  // var caseCallback = function(answer, wildCardArray, input){
  //   if (answer == this) {
  //     console.log(answer + ' | ' + wildCardArray + ' | ' + input);
  //   } else {
  //     console.log('ERROR:', answer);
  //     console.log('   Expected:', this.toString());
  //   }
  // };
  aimlInterpreter.findAnswerInLoadedAIMLFiles(question,callback);
  // var goodanswers = aimlInterpreter.findAnswerInLoadedAIMLFiles(question);;
  // var nowGetAnswerJson = res.json(goodanswers);
  // return nowGetAnswerJson;
  
  
  
});



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);