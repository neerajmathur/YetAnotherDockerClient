module.controller('ContainersController', function ($scope,$http, ContainersService) {
 
	$scope.loadContainers= function () {
		 ContainersService.getContainersList(function(data) {
			 $scope.ContainersList = data;
		  });
	  }
 
	$scope.loadContainers();
	
	
});