const express = require('express');
const app = express();
const natural = require('natural');
//const tokenizer = new natural.WordTokenizer();
//const stemmer = natural.PorterStemmer;

const classifier = new natural.BayesClassifier();
classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q\'s', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
classifier.addDocument('shorttttttttt gold', 'haha');
classifier.addDocument('selereerrererl gold', 'haha');
classifier.train();

//const wordnet = new natural.WordNet();



app.get('/api/questions/:question', (req, res) => {
  console.log(classifier.classify('i am selereerrererl copper'));
  console.log(classifier.getClassifications('i am selereerrererl copper'));

  // wordnet.lookup('term', function(results) {
  //   results.forEach(function(result) {
  //       console.log('------------------------------------');
  //       console.log(result.synsetOffset);
  //       console.log(result.pos);
  //       console.log(result.lemma);
  //       console.log(result.synonyms);
  //       console.log(result.pos);
  //       console.log(result.gloss);
  //   });
  // });  

  const question = req.params.question;
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