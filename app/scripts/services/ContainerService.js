module.service('ContainerService', function ($http,docker) {
	
	return {
		getContainerInfo: function(containerid,callback) {
			$http.get(docker.baseurl+'/containers/'+containerid+'/json').success(callback);
     }
	
}
});