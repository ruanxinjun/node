var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var time = require('silly-datetime');
var util = require('util');

var app = express();

app.set('views','./');
app.set('view engine','ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request,response,next)=>{
	if(request.method.toLowerCase()=='post'){
		//response.write(request.body.toString());
		var form = new formidable.IncomingForm();
    	form.uploadDir = "./";
    	form.parse(request, function(err, fields, files) { 
    		  var sd  = time.format(new Date(),'YYYY-MM-DD-HH-mm');
		      var extname = path.extname(files.tupian.name);
    		  var oldname = __dirname+'/'+files.tupian.path;
		      var newname = __dirname+'/'+sd+extname;
		      console.log(util.inspect({fields: fields, files: files}));
		      fs.rename(oldname,newname); 
			  response.send(fields.username+'...'+fields.sex); 
    	});
    	 return;   
	}
	response.render('form',{message:'hello body-parser'}); 
});


app.listen(3000);