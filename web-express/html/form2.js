var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


var upload = multer({ storage: storage,fileFilter:(req, file, cb)=>{
	cb(null, true)
}});

var app = express();

app.set('views','./');
app.set('view engine','ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var ups = upload.array('tupian',3);

app.use('/',(request,response,next)=>{
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
	response.render('form2',{message:'hello body-parser,this is multer'}); 
});


app.listen(3000);