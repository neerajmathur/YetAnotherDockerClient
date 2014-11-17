module.service('ContainerService', function($http, docker) {

	return {
		getContainerInfo : function(containerid, callback) {
			$http.get(docker.baseurl + '/containers/' + containerid + '/json')
					.success(callback);
		},

		start : function(containerid, callback) {
			$http
					.post(
							docker.baseurl + '/containers/' + containerid
									+ '/start').success(callback);
		},
		
		stop : function(containerid, callback) {
			$http
					.post(
							docker.baseurl + '/containers/' + containerid
									+ '/stop?t=5').success(callback);
		},
		
		restart : function(containerid, callback) {
			$http
					.post(
							docker.baseurl + '/containers/' + containerid
									+ '/restart').success(callback);
		},
		
		kill : function(containerid, callback) {
			$http
					.post(
							docker.baseurl + '/containers/' + containerid
									+ '/kill').success(callback);
		}
	}

});