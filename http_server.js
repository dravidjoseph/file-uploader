/***********************************************
* Name: http_server.js
* This is the server, written in Node.js
* Usage: node http_server.js
************************************************/


/***********************************************
* Required libraries
* fs and path are already given, but need
* to declare objects.
* express and formidable are included via the
* package.json
************************************************/
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

/*Creates instance for us to use*/
var app = express();


/*Allows us to use the absolute path for safety*/
app.use(express.static(path.join(__dirname, 'public')));

/*Serve index.html page to the client*/
app.get('/', function(request, response){
	response.sendFile(path.join(__dirname, 'views/index.html'));
});


/*Handles the upload from the client*/
app.post('/upload', function(request, response){

	/*handles incoming form*/
	var form = new formidable.IncomingForm();

	/*Allows us to handle multiple files if they are uploaded*/
	form.multiples = true;

	/*All files are stored in the file-upload directory*/
	form.uploadDir = path.join(__dirname, '/file-uploads');

	/*Gives file proper name*/
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});

	/*Just logs errors*/
	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	/*Sends a success response to the client*/
	form.on('end', function() {
		response.end('success');
	});

	/*parse the incoming request containing the form data*/
	form.parse(request);
});

/*View on http://localhost:8080*/
var server = app.listen(8080, function(){
	console.log('Server listening on port 8080');
});