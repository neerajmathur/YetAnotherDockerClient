var module = angular.module('app', ['ngRoute']);


module.constant('docker', {
    baseurl: 'http://192.168.232.133:4243'
});


module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/images.html',
        controller: 'ImagesController'
    })
	
	 .when('/images', {
        templateUrl: 'app/views/images.html',
        controller: 'ImagesController'
    })
	
	 .when('/containers', {
        templateUrl:'app/views/containers.html',
        controller: 'ContainersController'
    })
	
	 .when('/events', {
        templateUrl:'app/views/images.html',
        controller: 'ImagesController'
    })
	
	.otherwise ({
    redirectTo: '/'
	});
}]);
