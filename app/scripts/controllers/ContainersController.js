'use strict';


module.controller('ContainersController', function ($scope,$http, $location,$filter,ContainersService,ImagesService) {
 
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

        	$location.path('/containers/'+data.Id);
		  });
        
        
        
        

	 }
});