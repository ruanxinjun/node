var http = require('http');
var fs = require('fs');
var url =  require('url')


var server = http.createServer((req,rep)=>{
	var pathname = url.parse(req.url).pathname;
	if(req.url=="/"){
		pathname="./static/index.html";
	}
	console.log(pathname);
	fs.readFile('./static'+pathname,(error,data)=>{
		if(error){
			throw error;
		}else{
			rep.end(data);
		}

	});
	
});


server.listen(3000);