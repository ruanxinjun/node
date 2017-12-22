var http = require('http');
var url = require('url');
var router = require('./router');

var server =http.createServer((request,response)=>{
 	if(request.url=='/'){
 		router.showIndex(request,response);
 	}
});

server.listen(3000);