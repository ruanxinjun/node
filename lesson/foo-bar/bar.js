function family(name,age,sex){
	this.name = name;
	this.age = age;
	this.sex = sex;
};

family.prototype = {
	sayHello(){
		console.log(this.name+this.age+this.sex);
	}
};


module.exports = family;
