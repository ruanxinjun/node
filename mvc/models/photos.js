var fs = require('fs');
var formidable = require('formidable');
var time = require('silly-datetime');
var path  =require('path');

//get folders

function Folders(cb){
	fs.readdir('./uploads',(error,folders)=>{
		var folder = [];
		for(let i=0;i<folders.length;i++){
			folder.push(folders[i]);
		}
		cb(folder);
	});
};


//get photos by folder
function Photos(folder,cb){
	fs.readdir('./uploads/'+folder,(error,files)=>{
		var count = files.length;
		var tupian = {folder,files:[],eachsize:[],count,sizes:0};
		for(let i=0;i<count;i++){	
			let stat = fs.statSync('./uploads/'+folder+'/'+files[i]);
			let _size = Math.round(stat.size/1024);
			tupian.eachsize.push(_size+'KB');
			tupian.files.push(files[i]);
			tupian.sizes+=_size;
		}
		tupian.sizes+='KB';
		cb(tupian);
	});
};

//upload
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
    	return;
};

//delete file
function Deletefile(folder,file,cb){
	fs.unlink('./uploads/'+folder+'/'+file, function(error) {
		if(error){
			cb(0)
		}
		cb(1);
	})
};

// get single first folder im
function Getsingfolder(folder,cb){
	fs.readdir('./uploads/'+folder, (error,files)=> {
		var len = files.length;
		if(len>0){
			var singfile = files[0];
			cb('./uploads/'+folder+'/'+singfile,len);
		}else{
			cb('',0);
		}
	})
};

exports.getPhotos = Photos;
exports.getFolders = Folders;
exports.uploadFiles = Uploads;
exports.deletFiles = Deletefile;
exports.getSingleFolder = Getsingfolder;