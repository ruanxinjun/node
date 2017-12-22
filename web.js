var http = require('http');
var fs = require('fs');
var url =  require('url');
var path = require('path');


var server = http.createServer((req,rep)=>{
	var pathname = url.parse(req.url).pathname;
	if(req.url=="/favicon.ico"){
		return;
	}
	if(req.url=="/"){
		pathname="index.html";
	};
	let extname = path.extname(pathname).replace('.','');
	fs.readFile('./static/'+pathname,(error,data)=>{
		if(error){
			throw error;
		}else{
			var mime = fs.readFileSync('./mime.json');
			var js = JSON.parse(mime.toString().replace(/\./g,''));
			var type = eval('js.'+extname);
			console.log(type);
			rep.writeHead(200,{"Content-type":type});
			rep.end(data);
		}
		
	});
});

server.listen(3000);