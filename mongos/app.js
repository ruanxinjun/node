var express = require("express");
var app =  express();
var MongoClient = require('mongodb').MongoClient;

app.get('/',(request,response)=>{
	var url = 'mongodb://127.0.0.1:27017/info';
	MongoClient.connect(url,(error,db)=>{
		if(error)
		{
			return;
		}
		db.collection("kiss").insertOne({"name":"fack","age":28},(error,result)=>{
			if(error){
				return;
			}
			db.close();
			response.send(result.toString());
		});
	});
});


app.listen(3000,'127.0.0.1');

