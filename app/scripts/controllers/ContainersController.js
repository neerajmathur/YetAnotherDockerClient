module.controller('ContainersController', function ($scope,$http, $filter,ContainersService,ImagesService) {
 
	$scope.loadContainers= function () {
		 ContainersService.getContainersList(function(data) {
			 $scope.ContainersList = data;
		  });
	  }
 
	$scope.loadContainers();
	
	
	$scope.loadContainerDefault= function () {
		 var defaults = {
                 'Image': '',
                 'PortSpecs': [],
                 'ExposedPorts': [],
                 'Env': [],
                 'Dns': ['8.8.8.8', '8.8.4.4'],
                 'Tty': true,
                 'AttachStdin': true,
                 'AttachStdout': true,
                 'AttachStderr': true,
                 'OpenStdin': true,
                 'StdinOnce': true,
                 'Volumes': [],
                 'VolumesFrom': []
             };
		

		 $scope.input=angular.extend({}, defaults);
		 
	}
	
	
	//function filter(array, term) {
    //    return $filter('filter')(array, term);
    //}
	
	
	$scope.getImages = function () {
		 ImagesService.getImageList(function(data) {
			 images = data.map(function (image) {
				 var name = image.RepoTags.slice(-1)[0];
                 return name === '<none>:<none>' ? image.Id.substr(0, 12) : name;
             });
			 $scope.images = images;
		  });
	  }
	

	$scope.loadContainerDefault();
	$scope.getImages();
	
	
});