YetAnotherDockerClient
======================

About Project:
======================
The project aims to implement a Cloud Orchestration Layer in which we will Create Delete Virtual Machines(VMs) containers with the help of Docker Remote API.

Also we will create a web interface to interact with the docker remote API.The goal is to provide a pure client side implementation so it is effortless to connect and manage docker.

This projects helps users to easily manage their created containers, create new containers and delete them.

Technology Stack:
======================
Technology Stack: 
  AngularJS, 
  BootStrap, 
  HTML5, 
  Local Database (NodeJS or MongoDB), 
  Apache Web Server or any web server which can run angularjs
 
 
Usage
==================== 
  
  Before using the docker client, you must launch docker RESTAPI with additional arguments this will enable to query rest api with enable-cors, eg:
  
  ```bash
 $ docker -d -H=0.0.0.0:4243 -api-enable-cors
```

Modify app.js file with docker Rest API URL

  ```bash
 module.constant('docker', {
    baseurl: 'http://<docker IP>:4243'
});
```

Modify app\scripts\controllers\ContainerController.js to update docker API URL to attach terminal , Line 48




  ```bash
url = (parser.protocol === 'https:' ? 'wss'
										: 'ws')
										+ '://'
										+ '<Docker IP/URL>:<Docker API Port>/containers/'
										+ $routeParams.containerid
										+ '/attach/ws?logs=0&stream=1&stdout=1&stderr=1&stdin=1';
```
