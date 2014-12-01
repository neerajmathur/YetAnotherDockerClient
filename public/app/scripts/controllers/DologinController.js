module.controller('DologinController', function ($scope, $routeParams,$location) {
 
	$scope.login= function () {

		$location.path('/host');
	  }
	});