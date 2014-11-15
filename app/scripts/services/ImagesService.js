module.service('ImagesService', function ($http,docker) {
    //to create unique Images id
    var uid = 1;
     
    //Imagess array to hold list of all Imagess
	var ImageLists ;
	
     
    //save method create a new Images if not already exists
    //else update the existing object
    this.save = function (Images) {
        if (Images.id == null) {
            //if this is new Images, add it in Imagess array
            Images.id = uid++;
            this.ImageLists.push(Images);
        } else {
            //for existing Images, find this Images using id
            //and update it.
            for (i in Images) {
                if (Images[i].id == Images.id) {
                    Images[i] = Images;
                }
            }
        }
 
    }
 
    //simply search Imagess list for given id
    //and returns the Images object if found
    this.get = function (id) {
        for (i in this.ImageLists) {
            if (this.ImageLists[i].id == id) {
                return this.ImageLists[i];
            }
        }
 
    }
     
    //iterate through Imagess list and delete
    //Images if found
    this.delete = function (id) {
        for (i in this.ImageLists) {
            if (this.ImageLists[i].id == id) {
                Images.splice(i, 1);
            }
        }
    }
 
  //simply returns the Imagess list
	return {
     getImageList: function(callback) {
       $http.get(docker.baseurl+'/images/json').success(callback);
     }
   }
});