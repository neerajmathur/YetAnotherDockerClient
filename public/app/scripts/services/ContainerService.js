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
		},
		
		destroy : function(containerid, callback) {
			$http
					.delete(
							docker.baseurl + '/containers/' + containerid
									+ '?v=1').success(callback);
		},
		
		commit : function(containerid,input, callback) {
			$http
					.post(
							docker.baseurl + '/commit?container=' + containerid
									+ '&comment='+input.m+'&repo='+input.repo+'').success(callback);
		},
		
		getProcessList : function(containerid, callback) {
			$http.get(docker.baseurl + '/containers/' + containerid + '/top')
					.success(callback);
		},
		
		getChanges : function(containerid, callback) {
			$http.get(docker.baseurl + '/containers/' + containerid + '/changes')
					.success(callback);
		}
		
	}

});