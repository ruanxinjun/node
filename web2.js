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
		let extname = path.extname(pathname);
		fs.readFile('./static/'+pathname,(error,data)=>{
			if(error){
				throw error;
			}else{
				getMine(extname,function(me){
					rep.writeHead(200,{"Content-type":me});
					rep.end(data);
				});
			}
			
			});
	});


	let getMine = (extname,callback)=>{
		fs.readFile('./mime.json',(error,data)=>{
			if(error){
				throw error;
			}else{
				var jsondata = JSON.parse(data);
				callback(jsondata[extname]||'text/html');
			}
		});
	};



server.listen(3000);