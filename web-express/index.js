var express = require('express');

var app = express();

app.get('/',(req,res)=>{
	res.send('express!!!');
});

// /student/12345
app.get(/^\/student\/([\d]{5})$/,(req,res)=>{
	res.send(req.params[0]);
});


app.listen(3000);