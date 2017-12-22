var ejs = require('ejs');
var fs = require('fs');

fs.readFile('./ejsmodel.ejs',(error,data)=>{
	if(error){
		throw error;
	}
	var message = 'hello ejs';
	var html = ejs.render(data.toString(),{message:message});
	console.log(html)
});
