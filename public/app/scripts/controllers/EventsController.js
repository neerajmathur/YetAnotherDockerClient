module.controller('EventsController', function ($scope,$http, EventsService) {
 
		  $scope.toggleMin = function() {
	    $scope.maxDate = $scope.maxDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	   };
	   
	   
	   $scope.getEvents = function() {
		   var date = new Date($scope.since.getTime());
		   date.setUTCHours(0);
           date.setUTCMinutes(0);
           date.setUTCSeconds(0);
           
           EventsService.getEvents((date.getTime() / 1000 >>> 0),function(data) {
				 $scope.events = data;
				 alert(data);
			  });
           
		 // alert('since=' + (date.getTime() / 1000 >>> 0));
		};


		 $scope.sinceOpts = {
		            max: new Date().getTime(),
		            'show-button-bar': false,
		            showWeeks: false,
		            startingDay: 1
		 };
		
		
		 $scope.format = 'dd-MMMM-yyyy';
		 
});