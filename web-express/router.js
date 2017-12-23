var express = require('express');

var app = express();


// app.get(/^\/student\/([\d]{5})$/,(req,res)=>{
// 	res.send(req.params[0]);
// });

// must be /userlist/abc
app.get(/^\/userlist\/([\w]+)$/,(request,response)=>{
	response.send(request.params[0]);
});

//must be /users/124 not /users/0123
app.get('/user/:userid',(request,response)=>{
	var userid = request.params['userid'];
	var reg = /^([1-9]+)(\d?)$/;
	if(reg.test(userid)){
		response.send(userid);
	}else{
		response.send('userid must be integer!!!');
	}
	response.end();
});

app.listen(3000);