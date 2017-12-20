var http = require('http');
var fs = require('fs');


var server = http.createServer((req,rep)=>{
	if(req.url=="/favicon.ico"){
		return;
	};
	var files = fs.readdirSync("./files");
	var folders = [];
	files.forEach(i=>{
		var stat  = fs.statSync("./files/"+i);
		 if(stat.isDirectory()){
		 	folders.push(i);
		};
	});
	console.log(folders);
	rep.end('fack');
});


server.listen(3000);