module.service('ContainersService', function ($http,docker) {
   
  //simply returns the Imagess list
	return {
     getContainersList: function(callback) {
       $http.get(docker.baseurl+'/containers/json?all=1&size=1').success(callback);
     }
   }
});