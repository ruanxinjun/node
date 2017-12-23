var express = require('express');
var fs = require('fs');
var app = express();

//默认路由
app.use((request,response,next)=>{
	var filepath = request.originalUrl;
	filepath = filepath =='/'?'index.html':filepath;
	fs.readFile('./public/'+filepath,(error,data)=>{
		if(error){
			next();
			return;
		}else{
			console.log(data.toString());
		}
	});
});

//use function
// app.use(users);
// function users(request,response,next){
// 	console.log('self function');
// 	next();
// };

//show url
app.use('/admin',(request,response)=>{
  console.log(request.originalUrl); // '/admin/new'
  console.log(request.baseUrl); // '/admin'
  console.log(request.path); // '/new'
});

app.listen(3000);