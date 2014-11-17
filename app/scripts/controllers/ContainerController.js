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
						'ContainerService',
						function($scope, $routeParams, $location, docker, tty,
								ContainerService) {

							$scope.Console = {
								logs : {
									terminal : null,
									connection : null
								}
							};

							$scope.attachConsole = function() {
								var parser = document.createElement('a'), termContainer = angular
										.element('#terminal'), url;
								url = (parser.protocol === 'https:' ? 'wss'
										: 'ws')
										+ '://'
										+ '192.168.232.133:4243/containers/'
										+ $routeParams.containerid
										+ '/attach/ws?logs=0&stream=1&stdout=1&stderr=1&stdin=1';

								termContainer.html("");
								$scope.Console.terminal = tty(termContainer[0],
										url);
							};

							$scope.loadContainerInfo = function() {
								ContainerService.getContainerInfo(
										$routeParams.containerid,
										function(data) {
											$scope.Info = data;
										});
							}

							$scope.start = function() {
								ContainerService.start(
										$routeParams.containerid,
										function(data) {
											$scope.loadContainerInfo();
										});
							}
							
							$scope.stop = function() {
								ContainerService.stop(
										$routeParams.containerid,
										function(data) {
											$scope.loadContainerInfo();
										});
							}
							
							$scope.restart = function() {
								ContainerService.restart(
										$routeParams.containerid,
										function(data) {
											$scope.loadContainerInfo();
										});
							}
							
							$scope.kill = function() {
								ContainerService.kill(
										$routeParams.containerid,
										function(data) {
											$scope.loadContainerInfo();
										});
							}

							$scope.loadContainerInfo();

						} ]);