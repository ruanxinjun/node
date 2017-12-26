var fs = require('fs');
var formidable = require('formidable');
var time = require('silly-datetime');
var path  =require('path');
var imagesize = require('image-size');
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
    		 //for(var k in files){
    		   var sd  = time.format(new Date(),'YYYYMMDDHHmmss');
		       var extname = path.extname(files.tupian.name);
    		   var oldname = files.tupian.path;
		       var newname = uploaddir+'/'+sd+extname;
		       console.log(fields);
		       fs.renameSync(oldname,newname); 
		       cb();
    	});
    	return;
};

//删除文件
//folder:目录
//file:图片
function Deletefile(folder,file,cb){
	fs.unlink('./uploads/'+folder+'/'+file, function(error) {
		if(error){
			cb(0);
		}else{
			cb(1);
		}
	})
};

//获取相册封面
//folder:目录
function Getsingfolder(folder,cb){
	
	fs.readdir('./uploads/'+folder, (error,files)=> {
		var len = files.length;
		if(files&&len>0){
			var singfile = files[0];
			cb('./uploads/'+folder+'/'+singfile,len);
		}else{
			cb('',0);
		}
	})
};

//获取一个图片的尺寸
//folder:文件夹
//file:文件
function GetSinglePhoto(folder,file,cb){
	var path = './uploads/'+folder+'/'+file;
	imagesize(path,(error,pixels)=>{
		if(error){
			return;
		}
		cb(
			pixels.width,pixels.height
		);
	});
}

//添加相册
//folder:文件夹
function AddFolder(folder,cb){
	var path = './uploads/'+folder;
	fs.mkdir(path,(error)=>{
		if(error){
			cb(0);
			return;
		}
		cb(1);
	});
};

//删除相册
//folder:文件夹
function DelFolder(folder,cb){
	var path = './uploads/'+folder;
	fs.readdir(path, (error,files)=>{
		if(error){
			cb(0); //发生错误
			return;
		}
		if(files.length>0){
			cb(-1); //存在图片，不能删除
			return;
		}else{
			fs.rmdir(path,(error)=>{
				if(error)
				{
					cb(0); //发生错误
					return;
				}
				cb(1); //删除成功
			});
		}

	});
};

//暴露
exports.getPhotos = Photos;
exports.getFolders = Folders;
exports.uploadFiles = Uploads;
exports.deletFiles = Deletefile;
exports.getSingleFolder = Getsingfolder;
exports.getSinglePhoto = GetSinglePhoto;
exports.addFolder = AddFolder;
exports.delFolder = DelFolder;