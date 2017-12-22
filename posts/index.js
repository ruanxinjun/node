var formidable = require('formidable');
var http = require('http');
var fs = require('fs');
var util = require('util');
var time = require('silly-datetime');
var path = require('path');


var server = http.createServer((request,response)=>{

	if(request.method.toLowerCase()=='post'){
		var form = new formidable.IncomingForm();
    	form.uploadDir = "./";
    	form.parse(request, function(err, fields, files) {
		      response.writeHead(200, {'content-type': 'text/plain'});
		      response.write('received upload:\n\n');

		      var sd  = time.format(new Date(),'YYYY-MM-DD-HH-mm');
		      var extname = path.extname(files.tupian.name);

		      var oldname = __dirname+'/'+files.tupian.path;
		      var newname = __dirname+'/'+sd+extname;

		      console.log(util.inspect({fields: fields, files: files}));

		      fs.rename(oldname,newname,()=>{
		      		response.end();
		      });      
		      
	    });
	}
	
});

server.listen(3000,'127.0.0.1');