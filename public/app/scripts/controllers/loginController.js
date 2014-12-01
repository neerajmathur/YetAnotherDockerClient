module.controller('loginController', function ($scope, $http, $location, ContainersService,userID, $window , $cookies) {

		$scope.formData = {};
//		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		ContainersService.get()
			.success(function(data) {
				$scope.todos = data;
//				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will consolehappen.log(formData);
			if ($scope.formData.text != undefined) {
		//		$scope.loading = true;

				// call the create function from our service (returns a promise object)
				ContainersService.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						//$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}

		};
		
		//$scope.found = 0;
		$scope.checkLogin = function(){
			var found =0;
			for(var i=0;i<$scope.todos.length;i++)
			{
				if($scope.todos[i].text == $scope.login.text)
				{
					$cookies.userID = $scope.todos[i]._id;
					$cookies.userCon = $scope.todos[i].con_id;

					found = 1;
					$location.path('/host');

					//alert(userID);
					break;
				}
			}
			//$scope.found = found;

		};
	
		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
		//	$scope.loading = true;

			ContainersService.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
				//	$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};


	});
