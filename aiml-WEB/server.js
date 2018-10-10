const express = require('express');
const app = express();
const natural = require('natural');
const bodyParser = require('body-parser');
const js2xmlparser = require("js2xmlparser");
const classifier = new natural.BayesClassifier();
const fs = require('fs');
const XMLfilename = 'test.aiml.xml';


// for bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// full
classifier.addDocument("full", "full");
classifier.addDocument("no space", "full");
classifier.addDocument("no membership", "full");
classifier.addDocument("can not enrol in", "full");
// * CONTACTED * LECTURER *
classifier.addDocument("in touch with", "* CONTACTED * LECTURER *");
classifier.addDocument("contact lecturer", "* CONTACTED * LECTURER *");
classifier.addDocument("phone to", "* CONTACTED * LECTURER *");
classifier.addDocument("teacher professor tutor", "* CONTACTED * LECTURER *");
classifier.addDocument("email", "* CONTACTED * LECTURER *");
classifier.addDocument("call", "* CONTACTED * LECTURER *");
// * CHANGE * PROGRAM*
classifier.addDocument("u turn", "* CHANGE * PROGRAM*");
classifier.addDocument("switch program", "* CHANGE * PROGRAM*");
classifier.addDocument("change of program", "* CHANGE * PROGRAM*");
classifier.addDocument("change program", "* CHANGE * PROGRAM*");
classifier.addDocument("swap program", "* CHANGE * PROGRAM*");
// * ENROL * TRANSFER *
classifier.addDocument("enrol", "* ENROL * TRANSFER *");
classifier.addDocument("removal shift alteration", "* ENROL * TRANSFER *");
classifier.addDocument("swap transfer", "* ENROL * TRANSFER *");
classifier.addDocument("transfer enrol", "* ENROL * TRANSFER *");

// ADVISE
classifier.addDocument("advise advice", "ADVISE");
classifier.addDocument("select", "ADVISE");
classifier.addDocument("course selection", "ADVISE");
classifier.addDocument("help guidance", "ADVISE");
classifier.addDocument("consult recommendat suggestion", "ADVISE");

// WINTER
classifier.addDocument("winter july june", "WINTER");
classifier.addDocument("winter holiday", "WINTER");
classifier.addDocument("winter day", "WINTER");
classifier.addDocument("offer winter", "WINTER");


// * OFFER * COURSES * SUMMER *
classifier.addDocument("december november", "* OFFER * COURSES * SUMMER *");
classifier.addDocument("summer holiday day", "* OFFER * COURSES * SUMMER *");
classifier.addDocument("offer summer", "* OFFER * COURSES * SUMMER *");

// CREDIT
classifier.addDocument("credit", "CREDIT");
classifier.addDocument("get credit", "CREDIT");
classifier.addDocument("CREDIT TRANSFER", "CREDIT");
classifier.addDocument("TRANSFER CREDIT ", "CREDIT");

// COE
classifier.addDocument("coe", "COE");
classifier.addDocument("certificate of entitlement", "COE");
classifier.addDocument("online form", "COE");

// DROP
classifier.addDocument("drop ", "DROP");
classifier.addDocument("drop course", "DROP");
classifier.addDocument("program discontinuation", "DROP");
classifier.addDocument("remove program", "DROP");

// * DROP * COURSE * CENSUS DATE
classifier.addDocument("possible drop", "* DROP * COURSE * CENSUS DATE");
classifier.addDocument("when to drop", "* DROP * COURSE * CENSUS DATE");
classifier.addDocument("time deadline of drop", "* DROP * COURSE * CENSUS DATE");
classifier.addDocument("census date", "* DROP * COURSE * CENSUS DATE");

// PRE
classifier.addDocument("pre", "PRE");
classifier.addDocument("fail", "PRE");
classifier.addDocument("pre requisite", "PRE");
classifier.addDocument("requisite before", "PRE");

// swap
classifier.addDocument("swap course", "SWAP");
classifier.addDocument("change swap tutorial time", "SWAP");
classifier.addDocument("change course tut", "SWAP");
classifier.addDocument(" swap change enrol", "SWAP");

// * COURSE IS CANCELLED *
classifier.addDocument("cancel", "* COURSE IS CANCELLED *");
classifier.addDocument("wipe out", "* COURSE IS CANCELLED *");
classifier.addDocument("remove course", "* COURSE IS CANCELLED *");
classifier.addDocument("delete", "* COURSE IS CANCELLED *");

// ALLOCATE
classifier.addDocument("allot", "ALLOCATE");
classifier.addDocument("allocate", "ALLOCATE");
classifier.addDocument("lecture allocate", "ALLOCATE");

// WEB TIMETABLE
classifier.addDocument("web timetable", "WEB TIMETABLE");
classifier.addDocument("agenda schedule calendar", "WEB TIMETABLE");
classifier.addDocument("online timetable net", "WEB TIMETABLE");

// REQUISITE WAIVED
classifier.addDocument("waive", "REQUISITE WAIVED");
classifier.addDocument("requisite", "REQUISITE WAIVED");
classifier.addDocument("requisite waive", "REQUISITE WAIVED");
classifier.addDocument("require", "REQUISITE WAIVED");

// TIMETABLE CLASH
classifier.addDocument("clash", "TIMETABLE CLASH");
classifier.addDocument("timetable clash", "TIMETABLE CLASH");
classifier.addDocument("not permission", "TIMETABLE CLASH");
classifier.addDocument("permit", "TIMETABLE CLASH");

// OVERLOAD
classifier.addDocument("overload", "OVERLOAD");
classifier.addDocument("overload request", "OVERLOAD");
classifier.addDocument("course limit", "OVERLOAD");

// ENROLMENT DEADLINE
classifier.addDocument("deadline", "ENROLMENT DEADLINE");
classifier.addDocument("enrol deadline", "ENROLMENT DEADLINE");
classifier.addDocument("when due", "ENROLMENT DEADLINE");
classifier.addDocument("overdue", "ENROLMENT DEADLINE");

// PROGRESSION CHECK
classifier.addDocument("check", "COURSE SUBSTITUTED");
classifier.addDocument("progression", "COURSE SUBSTITUTED");
classifier.addDocument("progress", "COURSE SUBSTITUTED");

// SPECIAL CONSIDERATION
classifier.addDocument("special", "SPECIAL CONSIDERATION");
classifier.addDocument("consideration", "SPECIAL CONSIDERATION");
classifier.addDocument("special considerate", "SPECIAL CONSIDERATION");
classifier.addDocument("assess perform", "SPECIAL CONSIDERATION");

// SUPPLEMENTARY EXAM
classifier.addDocument("supplement", "SUPPLEMENTARY EXAM");
classifier.addDocument("exam", "SUPPLEMENTARY EXAM");
classifier.addDocument("fail final", "SUPPLEMENTARY EXAM");

// REVIEW RESULTS
classifier.addDocument("review", "REVIEW RESULTS");
classifier.addDocument("review result", "REVIEW RESULTS");
classifier.addDocument("recommend", "REVIEW RESULTS");

// ACADEMIC STANDING
classifier.addDocument("academic stand", "ACADEMIC STANDING");
classifier.addDocument("standing interview form", "ACADEMIC STANDING");
classifier.addDocument("referral", "ACADEMIC STANDING");
classifier.addDocument("probat", "ACADEMIC STANDING");

// RESULT
classifier.addDocument("wd wc wj", "RESULT");
classifier.addDocument("result", "RESULT");
classifier.addDocument("outcome final", "RESULT");


// COURSE SUBSTITUTED
classifier.addDocument("substitut", "COURSE SUBSTITUTED");
classifier.addDocument("substitution request", "COURSE SUBSTITUTED");
classifier.addDocument("faculty enrolment rule", "COURSE SUBSTITUTED");

//test customize question
classifier.addDocument("what is your name", "WHAT");

classifier.train();

// get request
app.get('/api/questions/:question', (req, res) => {
  var questionFixed = ''; //synonmys initial

  // initial AIMLInterpreter and open aiml files
  var AIMLInterpreter = require('./AIMLInterpreter');
  var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
  aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);

  var question = req.params.question;
  natural.PorterStemmer.attach();
  var tokenizeQuestion = question.tokenizeAndStem()
  //let questions = classifier.classify(tokenizeQuestion);
  //let questionList = natural.PorterStemmer.stem(tokenizeQuestion);

  // find the nearest possible synonmys
  questionFixed = classifier.getClassifications(tokenizeQuestion)[0].label;
  console.log(classifier.getClassifications(tokenizeQuestion).slice(0,4))
  
  // get the answers into json format 
  var callback = function(answer){
    const whatIsQuestion = req.params.question;
    var goodanswer = {};
    goodanswer[whatIsQuestion] = answer;
    return (res.json(goodanswer));
  };

  aimlInterpreter.findAnswerInLoadedAIMLFiles(questionFixed,callback);
});

app.post('/api/customizeQuestions', (req, res) => {
  let template = req.body.answer;
  let pattern = req.body.question.toUpperCase();
  let xmlCustomize = {'pattern':pattern, 'template':template};
  const elementXML = js2xmlparser.parse("category", xmlCustomize);
  
  fs.readFile(XMLfilename, "utf8", function(err, data) {
    if (err) throw err;
    let dataPre = data.slice(0,-7);
    let dataRest = data.slice(-7,);
    
    let insertXML = dataPre + elementXML.slice(22,) + dataRest;
    fs.writeFile(XMLfilename, insertXML,function(err) {
      if (err) throw err;
      console.log('done');
    }) 
   });

});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);