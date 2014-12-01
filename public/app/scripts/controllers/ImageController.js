module.controller('ImageController', function ($scope, $routeParams,$http, ImageService,$location) {
 
	$scope.loadImageInfo= function () {

		ImageService.getImageInfo($routeParams.imageid,function(data) {
			 $scope.info = data;
		  });
		
	  }
	
	$scope.loadImageHistory= function () {

		ImageService.getImageHistory($routeParams.imageid,function(data) {
			 $scope.historyRows = data;
		  });
		
	  }
	
	
	$scope.destroyImage= function () {

		ImageService.destroyImage($routeParams.imageid,function(data) {
			$location.path('/images');
		  });
		
	  }
	

	$scope.loadImageInfo();
	$scope.loadImageHistory();	
});