
var AIMLInterpreter = require('./AIMLInterpreter');


function aaa(){
  var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
  aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);

  var callback = function(answer, wildCardArray, input){
      console.log(answer + ' | ' + wildCardArray + ' | ' + input);
  };

  var caseCallback = function(answer, wildCardArray, input){
    if (answer == this) {
      console.log(answer + ' | ' + wildCardArray + ' | ' + input);
    } else {
      console.log('ERROR:', answer);
      console.log('   Expected:', this.toString());
    }
  };
  var goodanswer = aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your name?', callback);
  return goodanswer;

}
aaa();
//export default aaa;