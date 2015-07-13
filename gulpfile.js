/**
 * Gulp buildfile
 * 
 * Basics: http://www.hongkiat.com/blog/getting-started-with-gulp-js/
 * Good Plugins: http://geekswithblogs.net/shaunxu/archive/2015/02/17/10-awesome-gulp-plugins-working-with-angularjs-and-bower.aspx
 * More: https://github.com/Pestov/essential-gulp-plugins
 */


/*jshint -W024 */

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var karma = require('karma').server;

var del = require('del'); // rm -rf
var pkg = require('./package.json');

// Command line flags (the yargs github guide is glorious)
var argv = require('yargs')
	.usage('Usage: $0 [command] [options]')

	.command('build','(default) run')
	.command('test', 'run karma testing')
	.command('lint', 'run linter on test and source files')
	.command('clean','empty the build folder')
	.command('copy:assets', 'copies assets into build folder')
	.command('autoTest', 'runs test automatically on found changes')

	.alias('h', 'help')
	.help('h')
	.describe('h', 'show help')

	.alias('d', 'dist')
	.boolean('d')
	.describe('d','building dirstribution or test build')

	.alias('o', 'original')
	.boolean('o')
	.describe('o','uglify without mangling variable names or compressing')

	.alias('m', 'mangle')
	.boolean('m') 
	.describe('m','uglify with mangling/compressing (default is true)')

	.alias('w', 'watch')
	.boolean('w')
	.describe('w','[default] watch assets/src for changes and rebuild')

	.alias('k', 'keepalive')
	.boolean('k')
	.describe('k','[test] run karma with singlerun=false (defualt true)')

	.alias('n', 'nice')
	.boolean('n')
	.describe('n','[test] run karma with a nice display format')

	.alias('b', 'browser')
	.describe('b','[test] specify browser to use with karma (Chrome/PhantomJS/Firefox)')

	.argv;


var dirs = {
	assets: __dirname + '/assets',
	build: __dirname + '/build',
	distribution: __dirname + '/dist',
	src: __dirname + '/src',
	e2eTests: __dirname + '/e2eTests',
	unitTests: __dirname + '/unitTests',
	sass: __dirname + '/sass'
};

var date = new Date();
var today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

var outDir = argv.dist? dirs.distribution : dirs.build;

gulp.task('lint', function(done){
	return gulp.src([
			'gulpfile.js',
			dirs.src + '/**/*.js',
			// dirs.e2eTests + '/**/*.js',
			dirs.unitTests + '/**/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean', function(done){
	del(outDir + '/**/*', done);
});

gulp.task('copy:assets', ['clean'], function(){
	return gulp.src(dirs.assets + '/**/*')
		.pipe(gulp.dest(outDir));
});

gulp.task('sass', ['clean'], function(){
	return gulp.src(dirs.sass + '/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(/*{outputStyle: 'compressed'}*/).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(outDir + '/css'));
});
gulp.task('sass:watch', function(){
	gulp.watch(dirs.sass + '/**/*.scss', ['sass']);
});

gulp.task('build', ['lint', 'clean', 'copy:assets', 'sass'], function(){
	return gulp.src([
			dirs.src + '/locales/_*.js', // only select locales
			dirs.src + '/util/**/*.js',
			dirs.src + '/plugins/**/*.js',
			dirs.src + '/widgets/**/*.js',
			dirs.src + '/types/**/*.js'
		])
		.pipe(sourcemaps.init())
			.pipe(concat(pkg.name + '.min.js'))
			.pipe(uglify({
				banner: '/*! ' + pkg.name + ' ' + pkg.version + ' ' + today + '*/\n',
				mangle: !argv.original && argv.dist || argv.mangle,
				compress: !argv.original && argv.dist || argv.mangle
			}))
		.pipe(sourcemaps.write('./',{
			addComment: true,
			includeContent: true
		}))
		.pipe(gulp.dest(outDir));
});

gulp.task('refreshTester', function(done){
	require(dirs.unitTests)(done);
});

gulp.task('test',['build'], function(done){
	var reporters = ['progress'];
	var browsers = [
		'PhantomJS',
		'Chrome',
		'Firefox'
	];
	var karmaOptions;

	if(argv.nice) {
		reporters.push('html');
	}

	if(process.env.TRAVIS) {
		// Switch to travis-ci specific browsers
		browsers[1] = 'Chrome_travis_ci'; 
	}

	karmaOptions = {
		configFile: dirs.unitTests + '/karma.conf.js',
		singleRun: !argv.keepalive,
		reporters: reporters,
		browsers: browsers
	};


	if(argv.browser && browsers.indexOf(argv.browser) !== -1) {
		// Just do the one browser
		karmaOptions.browsers = [argv.browser];
		karma.start(karmaOptions, done);
	} else {
		// Do all browsers in a chain (JS events mess up when done asynchronously)
		karmaOptions.browsers = [browsers[0]];
		karma.start(karmaOptions, function(){
			karmaOptions.browsers = [browsers[1]];
			karma.start(karmaOptions, function(){
				karmaOptions.browsers = [browsers[2]];
				karma.start(karmaOptions, function(){
					done();
				});
			});
		});
	}

});

var startBuildWatch = function(){
	console.log('Watching for changes to rebuild...');
	gulp.watch([
		dirs.src + '/**/*',
		dirs.assets + '/**/*',
		dirs.sass + '/**/**'
	], ['build']);
};


gulp.task('default', ['build'], function(){
	if(argv.watch) {
		startBuildWatch();
	}
});

gulp.task('autoTest', ['test'], function(){
	console.log('Watching for changes to rebuild & test...');
	gulp.watch([
		dirs.src + '/**/*',
		dirs.assets + '/**/*',
		dirs.unitTests + '/**/*',
		dirs.sass + '/**/**'
	], ['test']);
});
