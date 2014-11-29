'use strict';

module.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


module.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

module.controller('ContainersController', function ($scope,$http, $location,$filter,ContainersService,ImagesService,fileUpload) {
 
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
	
	
	function tagsToArray(tags) {
        return (tags || [])
            .map(function (tag) {
                return tag.text;
            })
            .filter(function (value) {
                return !!value;
            });
    }

    function filter(array, term) {
        return $filter('filter')(array, term);
    }
    
    
	$scope.getImages = function () {
		 ImagesService.getImageList(function(data) {
			 var images = data.map(function (image) {
				 var name = image.RepoTags.slice(-1)[0];
                 return name === '<none>:<none>' ? image.Id.substr(0, 12) : name;
             });
			 $scope.images = images;
		  });
	  }
	

	$scope.loadContainerDefault();
	$scope.getImages();
	
	
	$scope.ok= function () {
		var Volumes = {}, PortBindings = {}, Binds = [], Container = angular.extend({}, $scope.input);
        Container.Cmd = Container.Cmd || '';
        Container.Cmd = (Container.Cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || []).map(function (string) {
            var firstChar = string.substr(0, 1),
                lastChar = string.substr(-1);

            //noinspection JSLint
            if ((firstChar === '"' && lastChar === '"' && firstChar === lastChar) ||
                (firstChar === "'" && lastChar === "'" && firstChar === lastChar)) {
                string = string.slice(1, -1);
            }

            return string;
        });

        var prop=['Env', 'Dns', 'ExposedPorts', 'PortSpecs', 'Volumes', 'Links'];
        
       
        
     ['Env', 'Dns', 'ExposedPorts', 'PortSpecs', 'Volumes', 'Links'].forEach(function (prop) {
            if (Array.isArray(Container[prop])) {
                Container[prop] = tagsToArray(Container[prop]);
            }
        });
     
     $.each( [ 'Env', 'Dns', 'ExposedPorts', 'PortSpecs', 'Volumes', 'Links'], function( i, l ){
    	 
    	 if (Array.isArray(Container[l])) {
             Container[l] = tagsToArray(Container[l]);
         }
    	 alert( "Index #" + i + ": " + l );
    	 });

        if (!Container.VolumesFrom.length) {
            delete Container.VolumesFrom;
        }
        if (!Container.Volumes.length) {
            delete Container.Volumes;
        } else {
        	 Container.Volumes.forEach(function (volume) {
                var parsed = volume.split(':'); // hostPath:containerPath:permission
                Volumes[parsed[1]] = {};
                Binds.push(volume);
            });
            Container.Volumes = Volumes;
        }


        if (Container.ExposedPorts.length) {
            Container.ExposedPorts.forEach(function (record) {
                record = record.split(':').reverse();
                var containerPort = record[0] + '/tcp',
                    hostPort = {"HostPort": record[1] || record[0]},
                    hostIp = {"HostIp": record[2]};
                PortBindings[containerPort] = [angular.extend({}, hostIp, hostPort)];
            });
        }
        
        Container.Hostname=Container.name;
        
        ContainersService.create(Container,function(data) {

        	var containerdata ='{"Binds":["'+$scope.input.Volumes[0].text+'"]}'
        	 ContainersService.start(data.Id,containerdata,function(data1) {
        		 $location.path('/containers/'+data.Id);
        	 });
        		
		  });
        

	 }
	
	
	  $scope.uploadFile = function(){
          var file = $scope.myFile;
          console.log('file is ' + JSON.stringify(file));
          //var uploadUrl = "/fileUpload";
          var fd = new FormData();
          fd.append('file', file);
          
          ContainersService.buildFromDockerFile("neeraj123",fd,function(data) {
     		 alert(data)
     	 })
          
          
         /* ContainersService.build("neeraj1231",file,function(data) {
      		 alert(data)
      	 });*/
          //ContainersService.buildFromDockerFile("neeraj123",fd,callback)
          //fileUpload.uploadFileToUrl(file, uploadUrl);
      }
});