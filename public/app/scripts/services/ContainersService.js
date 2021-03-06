module.service('ContainersService', function ($http,docker) {
   
  //simply returns the Imagess list
	return {
     getContainersList: function(callback) {
       $http.get(docker.baseurl+'/containers/json?all=1&size=1').success(callback);
     },
     
     
     create : function(data, callback) {
			$http.post(docker.baseurl + '/containers/create?name='+data.name,data).success(callback);
		}
     
   ,
   
   start : function(containerid,data, callback) {
		$http
				.post(
						docker.baseurl + '/containers/' + containerid
								+ '/start',data).success(callback);
	},
	
	buildFromDockerFile: function(tag,dockerFile, callback) {
		
		$http
		.post(
				docker.baseurl + '/build?t='+tag,dockerFile,
				{
			        withCredentials: true,
			        headers: {'Content-Type': "application/tar" },
			        transformRequest: angular.gzip
			    }		
		
		).success(callback);
		
	}
   
}	
	
	
});