var module = angular.module('app', ['ngRoute','ui.bootstrap','ui.bootstrap.typeahead', 'ui.bootstrap.modal','ngTagsInput']);

module.constant('docker', {
    baseurl: 'http://localhost:4243'
});


module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/dologin.html',
        controller: 'DologinController'
    })
	
     .when('/host', {
        templateUrl: 'app/views/host.html',
        controller: 'HostController'
    })
    
  
    
	 .when('/images', {
        templateUrl: 'app/views/images.html',
        controller: 'ImagesController'
    })
    
     .when('/images/:imageid', {
        templateUrl: 'app/views/image.html',
        controller: 'ImageController'
    })
	
	 .when('/containers/:containerid', {
        templateUrl:'app/views/container.html',
        controller: 'ContainerController'
    })
    
     .when('/containers', {
        templateUrl:'app/views/containers.html',
        controller: 'ContainersController'
    })
	
	   .when('/events', {
        templateUrl: 'app/views/events.html',
        controller: 'EventsController'
    })
	
	.otherwise ({
    redirectTo: '/host'
	});
}]);
