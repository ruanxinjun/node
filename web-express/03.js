var express=  require('express');

var app = express();

app.set('view engine','ejs');

app.get('/',(request,response)=>{
	response.render('haha',{
		"news":['a','b','c']
	});
});

app.listen(3000);