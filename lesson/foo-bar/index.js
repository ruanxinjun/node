var foo = require('./foo');
var family = require('./bar');
var comm = require('comm');
var fack = require('hello');
var vue = require('world');d

//from node_moduels  by package.json
console.log(vue.vue);

//from node_modules by index.js
console.log(fack.fack);

//from node_modules direct comm.js
console.log(comm.msg);

//from current directory 
//module.exports
var bar = new family('a',12,'ann');
bar.sayHello();

console.log(foo.sum(1,2));