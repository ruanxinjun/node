var express = require('express');
var app = express();
var swig = require('swig');


//设置swig页面不缓存
swig.setDefaults({
  cache: false
});

app.set('view engine','html');
app.engine('html', swig.renderFile);

app.get('/',(request,response,next)=>{
	let news  = [{title:'a'},{title:'b'},{title:'c'},{title:'b'},{title:'e'},{title:'a'}];
	response.render('index',{content:'hello swig',news});
});

app.listen(3000,'127.0.0.1');