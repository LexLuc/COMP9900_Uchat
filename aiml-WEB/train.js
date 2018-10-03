const natural = require('natural');
const classifier = new natural.BayesClassifier();
function train(){
    classifier.addDocument('give a phone', '* CONTACTED * LECTURER *');
    classifier.addDocument('swap', '* CHANGE * PROGRAM*');
    classifier.addDocument('WC', 'result');
    classifier.addDocument('sell gold', 'sell');
    classifier.addDocument('shorttttttttt gold', 'haha');
    classifier.addDocument('selereerrererl gold', 'haha');
    classifier.train();
};

function getLabel(){
    console.log('object')
    train();
    console.log(classifier.classify('I want to know about winter courses'));
    console.log(classifier.getClassifications('I want to know about winter courses'));

}
