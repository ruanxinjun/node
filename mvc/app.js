var express = require('express');
var router = require('./controller');

var app = express();

app.set('view engine','ejs');

//static
app.use('/static',express.static('./public'));
app.use('/uploads',express.static('./uploads'));

//index.html
app.get('/',router.showIndex);
//get first folders image
app.get('/single/:folder',router.singleFolder);
//folders
app.get('/photos/:folder',router.showPhotos);
//upload
app.use('/upload/:folder',router.uploadPhotos);
//delete
app.post('/deletefile',router.deletePhotos);

app.listen(3000,'127.0.0.1');