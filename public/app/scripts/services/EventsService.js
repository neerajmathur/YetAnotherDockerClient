module.service('EventsService', function ($http,docker) {
	
	  //simply returns the host information
	return {
		getEvents: function(since,callback) {
       $http.get(docker.baseurl+'/events?since='+since).success(callback);
     }
   }
	
});