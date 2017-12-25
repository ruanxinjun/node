var photos = require('../models/');

//show folders
exports.showIndex = (request,response,next)=>{
	photos.getFolders((folders)=>{
		response.render('albums',{folders});
	});
};

//show albums
exports.showPhotos= (request,response,next)=>{
	 var folder = request.params.folder;
	 photos.getPhotos(folder,function(albums){
		response.render('shows',{albums,folder});
	 });
};

//upload photos 
exports.uploadPhotos  = (request,response,next)=>{
	 var folder = request.params?request.params.folder:'share';
	 if(request.method.toLowerCase()=='post'){
	 	photos.uploadFiles(request,'./uploads/'+folder,function(){
	 		response.redirect('/photos/'+folder);
	 	});
	 	return;
	 }
	 response.render('upload',{folder});
};

//delete photos
exports.deletePhotos = (request,response,next)=>{
	if(request.method.toLowerCase()=='post'){
		photos.deletFiles(request.body.folder,request.body.file,(status)=>{;
			response.json({status});
		});
	};
};

// get single first folder imgs 
exports.singleFolder = (request,response,next)=>{
	if(request.params){
		photos.getSingleFolder(request.params.folder,function(file,len){
			response.json({file,len});
		});
	}
};