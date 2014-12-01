var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};


function getTodo(res,todo_id){
	console.log(todo_id);
	Todo.findOne({_id:todo_id},function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	//create local users
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	app.get('/api/Singletodos/:todo_id', function(req, res) {
		// use mongoose to get all todos in the database
		getTodo(res,req.params.todo_id);
	});


	app.post('/api/single/:todo_id', function(req, res) {
		/*var condition = {text : "adfs"};
		Todo.update(condition ,
			{ 
			text : 'asdadsffad'
		}, function(err, todo) {
			if (err)
				res.send(err);
			getTodo(res,req.params.todo_id);

		});*/
			console.log(req);
			console.log(req.params.todo_id);
		Todo.findOne({_id:req.params.todo_id},function(err, res) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			//var a = ["ASDFFDS"];
			//a.push("ashish");
			res.con_id.push(req.body.con_id);
			//res.text = "Vasdfadsf";
			res.save();
		});
//		getTodos(res);

		// use mongoose to get all todos in the database
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		console.log(req)
		Todo.create({
			text : req.body.text,
			pass : req.body.pass,
			con_id : req.body.con_id,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
