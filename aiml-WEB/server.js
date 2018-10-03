const express = require('express');
const app = express();
const natural = require('natural');
//const tokenizer = new natural.WordTokenizer();
//const stemmer = natural.PorterStemmer;



const classifier = new natural.BayesClassifier();
classifier.addDocument('WD', '9900');
classifier.addDocument('WJ', '9900');
classifier.addDocument('WC', '9900');
classifier.addDocument('WD', '4121');
classifier.addDocument('give a phone lecturer', '* CONTACTED * LECTURER *');
classifier.addDocument('swap coures program', '* CHANGE * PROGRAM*');
classifier.addDocument('sell gold', 'sell');
classifier.addDocument('shorttttttttt gold', 'haha');
classifier.addDocument('selereerrererl gold', 'haha');
classifier.train();

//const wordnet = new natural.WordNet();



app.get('/api/questions/:question', (req, res) => {
  
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

  // initial AIMLInterpreter and open aiml files
  const question = req.params.question;
  var AIMLInterpreter = require('./AIMLInterpreter');
  var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
  aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);

  natural.PorterStemmer.attach();
  const tokenizeQuestion = question.tokenizeAndStem()
  console.log(tokenizeQuestion);
  let questions = classifier.classify(tokenizeQuestion);
  console.log(classifier.getClassifications(tokenizeQuestion));
  //console.log("courses".stem());


  // get the answers into json format 
  var callback = function(answer){
    const whatIsQuestion = req.params.question;
    var goodanswer = {};
    goodanswer[whatIsQuestion] = answer;
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