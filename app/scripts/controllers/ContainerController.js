/* module.controller('ContainerController', function($scope, $routeParams, $http,
		docker, ContainerService, terminal, $location) {

	$scope.attachConsole = function() {
		var parser = document.createElement('a'), termContainer = angular
				.element('#terminal'), url;
		url = (parser.protocol === 'https:' ? 'wss' : 'ws') + '://'
				+ docker.baseurl + '/containers/' + $routeParams.containerid
				+ '/attach/ws?logs=0&stream=1&stdout=1&stderr=1&stdin=1';

		termContainer.html("");
		//$scope.Console.terminal = tty(termContainer[0], url);
	};

	$scope.attachConsole();

}); */

if (typeof setImmediate === 'undefined') {
    var setImmediate = setTimeout;
}

angular
		.module('app')
		.controller(
				'ContainerController',
				[
						'$scope',
						'$routeParams',
						'$location',
						
						'docker',
						'terminal',
						function($scope, $routeParams, $location,
								docker, tty) {
							
							$scope.Console = {logs: {terminal: null, connection: null}};
							
							$scope.attachConsole = function() {
								var parser = document.createElement('a'), termContainer = angular
										.element('#terminal'), url;
								url = (parser.protocol === 'https:' ? 'wss' : 'ws') + '://'
										+  '192.168.232.133:4243/containers/' + $routeParams.containerid
										+ '/attach/ws?logs=0&stream=1&stdout=1&stderr=1&stdin=1';

								termContainer.html("");
								$scope.Console.terminal = tty(termContainer[0], url);
							};

							$scope.attachConsole();
							
						} ]);