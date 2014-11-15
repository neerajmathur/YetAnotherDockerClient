module.controller('HostController', function ($scope,$http, HostService,docker) {
 
	$scope.loadInfo= function () {
		HostService.getInfo(function(data) {
			 $scope.info = data;
			 $scope.info.serverurl=docker.baseurl;
		  });
	  }

	$scope.loadInfo();
	
	
});