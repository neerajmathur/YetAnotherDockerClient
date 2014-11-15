module.service('HostService', function ($http,docker) {
	
	  //simply returns the host information
	return {
     getInfo: function(callback) {
       $http.get(docker.baseurl+'/info').success(callback);
     }
   }
	
});