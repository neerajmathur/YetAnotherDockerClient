module.service('Todos', function ($http,docker) {
	
	  //simply returns the host information
	return {
		getImageInfo: function(imageid,callback) {
			$http.get(docker.baseurl+'/images/'+imageid+'/json').success(callback);
     },
     
     getImageHistory: function(imageid,callback) {
			$http.get(docker.baseurl+'/images/'+imageid+'/history').success(callback);
     },
     
     
     destroyImage: function(imageid,callback) {
			$http.delete(docker.baseurl+'/images/'+imageid).success(callback);
     }
     
   }
	
	
});