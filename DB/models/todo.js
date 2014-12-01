var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''},
	con_id :{type : Array,default : [] },
	pass : {type : String, default:''}
});
