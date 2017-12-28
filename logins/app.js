var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');

app.set('view engine','ejs');
app.set('views','views');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({  
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'love'
}));  

function crystr(str) {
  var a = crypto.createHash('md5');
  a.update(str);
  return a.digest('hex');
}


app.use((req,res,next)=>{
	if(req.session.user)
	{
		next();
	}else{
		if(req.url!='/login'||req.url!='/error'){
			res.redirect('/login');
		}else{
			res.render('login');	
		}
	}
});

app.all('/login',(req,res,next)=>{
	if(req.method.toLowerCase()=='post'){
		var lgname=  req.body.username;
		var lgpwd = req.body.userpwd;
		if(lgname=='rxj'&&lgpwd=='1'){
			var lgdata = {lgname,lgpwd:crystr(lgpwd)};
			req.session.user =lgdata;
			res.redirect('/users');
		}else{
			return;
		}
	}else{
		res.render('login');
	}
});

app.get('/users',(req,res,next)=>{
	res.render('users',req.session.user);
});


app.get('/error',(req,res)=>{
	res.send('error');
	return;
});




app.listen(3000);