/**
 * Simple node app to grab all the specs and put them into a single html file.
 */

var fs = require('fs');
var path = require('path');
var jade = require('jade');

module.exports = function(done){
	var priortySpecFiles = [];
	var specFiles = [];
	var specDirs = [];
	

	
	var inputJadeFile = path.join(__dirname, 'base.jade');
	var outputHtmlFile = path.join(__dirname, 'testRunner.html');

	

	// Get all the specs
	var searchDirectory = function(dir, ignoreDirs) {
		if(!dir)
			dir = '';
		
		var stat, filePath, relPath;

		fs.readdirSync(dir).forEach(function(file) {
			filePath = dir+'/'+file;
			relPath = path.relative(__dirname, filePath);
			stat = fs.lstatSync(filePath);

			if(stat.isFile()) {
				if(file[0] === '_') {
					priortySpecFiles.push(relPath);
					console.log('FOUND PRIORITY TESTSCRIPT '+relPath);
				} else {
					specFiles.push(relPath);
					console.log('FOUND TESTSCRIPT '+relPath);
				}
			} else if(stat.isDirectory() && !ignoreDirs) {
				specDirs.push(filePath);
			}
		});
	};

	var searchFull = function(root) {
		specDirs = [];
		specDirs.push(path.join(__dirname, root));
		var dir;
		while(specDirs.length > 0) {
			dir = specDirs[0];
			searchDirectory(dir);
			specDirs.splice(0,1);
		}
	};

	// Search order (determines test order)
	searchDirectory(path.join(__dirname, 'specs'), true);
	searchFull('specs/plugins');
	searchFull('specs/widgets');
	searchFull('specs/types');

	// Compile Jade
	var fn, html;
	
	fn = jade.compileFile(inputJadeFile, {
		pretty: true
	});

	html = fn({
		'specs': (priortySpecFiles.length > 0)? priortySpecFiles : specFiles
	});

	fs.writeFile(outputHtmlFile, html, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log('"'+outputHtmlFile+'" created successfully');

		//Complete outside callback
		if(done !== undefined)
			done();
	});


};