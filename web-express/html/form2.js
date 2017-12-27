var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var multer  = require('multer');
var time = require('silly-datetime');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    var fileFormat =path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + fileFormat);
  }
});

let fileFilter = (req,file,cb)=>{
		if(/^image\/(\w)+$/.test(file.mimetype)){
			cb(null, true);
		}else{
			cb(null,false);
		}
};

var upload = multer({storage,fileFilter});

var app = express();

app.set('views','./');
app.set('view engine','ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var ups = upload.array('tupian',3);

app.use((request,response,next)=>{
	if(request.method.toLowerCase()=='post'){
		ups(request,response,(error)=>{
			if(error){
				throw error;
			}else{
				response.json(request.files);
			}
		});
		return;
	}
	let message ='hello body-parser,this is multer';
	response.render('form2',{message}); 
});


app.listen(3000);