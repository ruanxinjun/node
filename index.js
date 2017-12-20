var http = require('http');
var fs = require('fs');


var server = http.createServer((req,rep)=>{
	if(req.url=="/favicon.ico"){
		return;
	}
	rep.setHeader("content-type","text/html;charset=utf8");
	fs.readdir("./files", function(error,files) {
		var folderfiles = [];
		(function iterator(i){
			if(i==files.length){
				console.log(folderfiles);
				return;
			}
			fs.stat("./files/"+files[i], function(error,stat) {
					if(stat.isFile())
					{
						folderfiles.push(files[i]);
					}
				iterator(i+1);
			});	
		})(0);
		
	})
	rep.end();
});


server.listen(3000);