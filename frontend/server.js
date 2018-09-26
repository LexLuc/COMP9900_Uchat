const express = require('express');

const app = express();


app.get('/api/questions/:question', (req, res) => {
  console.log('adsfadfdasdf',req.params.question);
  const question = req.params.question;
  if (question === 'hi'){
    const a = {'hi':'nihao'};
    return res.json(a);
  } 
  
});



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);