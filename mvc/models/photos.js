var fs = require('fs');
var formidable = require('formidable');
var time = require('silly-datetime');
var path  =require('path');
let {random,round} = Math;

//获取一个目录下面的文件夹
function Folders(cb){
	fs.readdir('./uploads',(error,folders)=>{
		var folder = [];
		for(let i=0;i<folders.length;i++){
			folder.push(folders[i]);
		}
		cb(folder);
	});
};


//获取1个目录下面的图片
//folder:目录
function Photos(folder,cb){
	fs.readdir('./uploads/'+folder,(error,files)=>{
		var count = files.length;
		var tupian = {folder,files:[],eachsize:[],count,sizes:0};
		for(let i=0;i<count;i++){	
			let stat = fs.statSync('./uploads/'+folder+'/'+files[i]);
			let _size = round(stat.size/1024);
			tupian.eachsize.push(_size+'KB');
			tupian.files.push(files[i]);
			tupian.sizes+=_size;
		}
		tupian.sizes+='KB';
		cb(tupian);
	});
};

//上传
//uploaddir:上传目录
function Uploads(request,uploaddir,cb){
		var form = new formidable.IncomingForm();
    	form.uploadDir = uploaddir;
    	form.parse(request, function(err, fields, files) { 
    		  var sd  = time.format(new Date(),'YYYYMMDDHHmm');
		      var extname = path.extname(files.tupian.name);
    		  var oldname = files.tupian.path;
		      var newname = uploaddir+'/'+sd+extname;
		      fs.rename(oldname,newname); 
		      cb();  
    	});
};

//删除文件
//folder:目录
//file:图片
function Deletefile(folder,file,cb){
	fs.unlink('./uploads/'+folder+'/'+file, function(error) {
		if(error){
			cb(0)
		}
		cb(1);
	})
};

//从目录获取随机1个图片
//folder:目录
function Getsingfolder(folder,cb){
	
	fs.readdir('./uploads/'+folder, (error,files)=> {
		var len = files.length;
		if(len>0){
			var singfile = files[round(random() * (0 - len)) + len];
			cb('./uploads/'+folder+'/'+singfile,len);
		}else{
			cb('',0);
		}
	})
};

//暴露
exports.getPhotos = Photos;
exports.getFolders = Folders;
exports.uploadFiles = Uploads;
exports.deletFiles = Deletefile;
exports.getSingleFolder = Getsingfolder;