module.controller('ImagesController', function ($scope,$http, ImagesService) {
 
	$scope.loadImages = function () {
		 ImagesService.getImageList(function(data) {
			 $scope.ImageList = data;
		  });
	  }
	// $scope.ImageList = ImagesService.list();
 
	//$http.get('http://192.168.232.133:4243/images/json').success(function(data) {
    //    return $scope.ImageList=data;
    //});
 
	$scope.saveImages = function () {
        ImagesService.save($scope.newImages);
        $scope.newImages = {};
    }
 
 
    $scope.delete = function (id) {
 
        ImagesService.delete(id);
        if ($scope.newImages.id == id) $scope.newImages = {};
    }
 
 
    $scope.edit = function (id) {
        $scope.newImages = angular.copy(ImagesService.get(id));
    }
	
	$scope.loadImages();
	
});