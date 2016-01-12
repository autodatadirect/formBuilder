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
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var header = require('gulp-header');

var ghPages = require('gulp-gh-pages');
var replace = require('gulp-replace');
var filter = require('gulp-filter');

var gMarked = require('gulp-marked');
var marked = require('marked');

var karma = require('karma').server;

var del = require('del'); // rm -rf
var pkg = require('./package.json');

// Command line flags (the yargs github guide is glorious)
var argv = require('yargs')
	.usage('Usage: $0 [command] [options]')

	.command('build','(default) runs the build process for the main code base')
	.command('build:nested', 'builds js with nested external dependencies')

	.command('test', 'run karma testing')
	.command('test:watch', 'runs test automatically on found changes')
	
	.command('tester', 'recompiles the testRunner.html used for manual browser testing')

	.command('lint', 'run linter on test and source files')
	
	.command('clean','empty the build folder')

	.command('copy:assets', 'copies assets into build folder')
	.command('copy:locales', 'uglifies and copies locales into build folder')

	.command('sass', 'compiles sass into the build folder')
	.command('css:nested', 'concatenates css with nested external dependencies')
	.command('sass:watch', 'runs sass automatically on found changes')

	.command('compileMarkdown', 'compiles the documentation markdown into formatted html partials')
	.command('compileJade', 'compiles the jade into the final .html')
	.command('docs', 'recompiles the documentaion pages + cleans partials')
	.command('docs:watch', 'runs docs automatically on found changes')
	

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

	.alias('l', 'local')
	.describe('l','deploys docs:deploy to local branch only, for checking if cache is correct')

	.argv;

var banner = 
	'/** \n' +
	' * <%= pkg.name %> - <%= pkg.description %>\n' +
	' * @version v<%= pkg.version %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @repository <%= pkg.repository %>\n' +
	' * @license <%= pkg.license %>\n' +
	' */\n\n';

var dirs = {
	assets: __dirname + '/assets',
	build: __dirname + '/build',
	distribution: __dirname + '/dist',
	src: __dirname + '/src',
	unitTests: __dirname + '/unitTests',
	sass: __dirname + '/sass',
	docs: __dirname + '/docs',
	bowerComponents: __dirname + '/bower_components'
};

dirs.out = argv.dist? dirs.distribution : dirs.build;

var date = new Date();
var today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

gulp.task('lint', function(done){
	return gulp.src([
			'gulpfile.js',
			dirs.src + '/**/*.js',
			dirs.unitTests + '/**/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean', function(done){
	del(dirs.out + '/**/*', done);
});

gulp.task('copy:assets', ['clean'], function(){
	return gulp.src(dirs.assets + '/**/*')
		.pipe(gulp.dest(dirs.out));
});

gulp.task('copy:locales', ['clean'], function(){
	return gulp.src(dirs.src + '/locales/**.js')
		.pipe(rename(function(path){
			path.basename = pkg.name + '_' + path.basename;
		}))
		.pipe(header(banner, {pkg : pkg}))
		.pipe(gulp.dest(dirs.out + '/locales'))
		.pipe(uglify({
				mangle: !argv.original && argv.dist || argv.mangle,
				compress: !argv.original && argv.dist || argv.mangle
		}))
		.pipe(header(banner, {pkg : pkg}))
		.pipe(rename(function(path){
			path.extname = '.min.js';
		}))
		.pipe(gulp.dest(dirs.out + '/locales'));
});

gulp.task('sass', ['clean'], function() {
	return gulp.src(dirs.sass + '/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('./', {
			addComment: true,
			includeContent: true
		}))
		.pipe(gulp.dest(dirs.out + '/css'));
});

gulp.task('css:nested', ['sass'], function() {
	return gulp.src([
			dirs.bowerComponents + '/jquery-timepicker-jt/jquery.timepicker.css',
			dirs.bowerComponents + '/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css',
			dirs.out + '/css/'+pkg.name+'.css'
		])
		.pipe(sourcemaps.init())
		.pipe(concat(pkg.name + '.nested.css'))
		.pipe(gulp.dest(dirs.out + '/css'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename(function(path){
			path.extname = '.min.css';
		}))
		.pipe(sourcemaps.write('./', {
			addComment: true,
			includeContent: true
		}))
		.pipe(gulp.dest(dirs.out + '/css'));
});

gulp.task('sass:watch', function(){
	gulp.watch(dirs.sass + '/**/*.scss', ['sass']);
});

gulp.task('build', ['lint', 'clean', 'copy:assets', 'copy:locales', 'sass', 'css:nested'], function(){
	return gulp.src([
			dirs.src + '/locales/english.en.js',
			dirs.src + '/locales/spanish.es.js',
			dirs.src + '/util/**/*.js',
			dirs.src + '/plugins/**/*.js',
			dirs.src + '/widgets/**/*.js',
			dirs.src + '/types/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat(pkg.name + '.js'))
		.pipe(header(banner, {pkg : pkg}))
		.pipe(gulp.dest(dirs.out))
		.pipe(rename(function(path){
			path.extname = '.min.js';
		}))
		.pipe(uglify({
			mangle: !argv.original && argv.dist || argv.mangle,
			compress: !argv.original && argv.dist || argv.mangle
		}))
		.pipe(header(banner, {pkg : pkg})) //uglify removes it, add it back
		.pipe(sourcemaps.write('./',{
			addComment: true,
			includeContent: true
		}))
		.pipe(gulp.dest(dirs.out));
});

// Builds dependencies into it as well
gulp.task('build:nested', ['build'], function() {
	return gulp.src([
			dirs.bowerComponents + '/spinjs/spin.min.js',
			dirs.bowerComponents + '/jquery-timepicker-jt/jquery.timepicker.min.js',
			dirs.bowerComponents + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
			dirs.out + '/'+pkg.name+'.min.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat(pkg.name + '.nested.min.js'))
		.pipe(sourcemaps.write('./',{
			addComment: true,
			includeContent: true
		}))
		.pipe(gulp.dest(dirs.out));
});

gulp.task('tester', function(done){
	require(dirs.unitTests)(done);
});

gulp.task('test',['build:nested'], function(done){
	var reporters = ['progress'];
	var browsers = [
		'PhantomJS',
		'Chrome',
		'Firefox'
	];
	var karmaOptions;
	var karmaFailureMessage = '\n**** KARMA TEST FAILURE ****\n';

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
		karma.start(karmaOptions, function(exitCode){
			if(exitCode !== 0) {
				console.log(karmaFailureMessage);
				done(exitCode);
			}
		});
	} else {
		// Do all browsers in a chain (JS events mess up when done asynchronously)
		karmaOptions.browsers = [browsers[0]];
		karma.start(karmaOptions, function(exitCode){
			if(exitCode !== 0) {
				console.log(karmaFailureMessage);
				done(exitCode);
				return;
			}

			karmaOptions.browsers = [browsers[1]];
			karma.start(karmaOptions, function(exitCode){
				if(exitCode !== 0) {
					console.log(karmaFailureMessage);
					done(exitCode);
					return;
				}

				karmaOptions.browsers = [browsers[2]];
				karma.start(karmaOptions, function(exitCode){
					if(exitCode !== 0) {
						console.log(karmaFailureMessage);
					}

					done(exitCode);
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
	], ['build:nested']);
};


gulp.task('default', ['build:nested'], function(){
	if(argv.watch) {
		startBuildWatch();
	}
});

gulp.task('test:watch', ['test'], function(){
	console.log('Watching for changes to rebuild & test...');
	gulp.watch([
		dirs.src + '/**/*',
		dirs.assets + '/**/*',
		dirs.unitTests + '/**/*',
		dirs.sass + '/**/**'
	], ['test']);
});



// Render headers to fit style
var renderer = new marked.Renderer();
var anchorGroup;

renderer.heading = function(text, level) {
	var anchor;

	if(level > 2) {
		return '<h'+level+'>'+text+'</h'+level+'>';
	}

	anchor = text.replace(/[^\w]+/g,'');
	anchor = anchor.charAt(0).toLowerCase() + anchor.substring(1);

	if(anchorGroup && level === 2) {
		return '<h'+level+'><a name="'+anchorGroup+anchor+'" class="anchor"></a>'+text+'</h'+level+'>';
	}

	anchorGroup = anchor + '-';
	return '<h'+level+'><a name="'+anchor+'" class="anchor"></a>'+text+'</h'+level+'>';
	
};


gulp.task('compileMarkdown', function() {
	return gulp.src(dirs.docs + '/content/*.md')
		.pipe(gMarked({
			gfm: false,
			renderer: renderer
		}))
		.pipe(gulp.dest(dirs.docs + '/content/'));
});

gulp.task('compileJade', ['compileMarkdown'], function() {
	return gulp.src([
			dirs.docs + '/index.jade',
			dirs.docs + '/guide.jade',
			dirs.docs + '/api.jade'
		])
		.pipe(jade({
			pretty: true,
			locals: {
				release: 'v' + pkg.version
			}
		}))
		.pipe(gulp.dest(dirs.docs));
});

gulp.task('docs', ['compileJade'], function(done) {
	// cleanup partials
	del(dirs.docs + '/content/**/*.html', done);
});



gulp.task('docs:watch', ['docs'], function() {
	return gulp.watch([
			dirs.docs + '/**/**.jade',
			dirs.docs + '/**/**.md'
		], ['docs']);
});


gulp.task('docs:deploy', ['build', 'docs'], function() {
	var docsFilter = filter([
		'*.html'
	], {restore: true});

	// only use files that are needed for docs
	return gulp.src([
		dirs.docs + '/css/**/*',
		dirs.docs + '/img/**/*',
		dirs.docs + '/js/**/*',
		dirs.docs + '/*.html',
		dirs.distribution + '/**/*',
		dirs.bowerComponents + '/**/*'
	], {base: __dirname})

	// put pages in root folder and update relative paths to dependencies
	.pipe(rename(function(path) {
		path.dirname = path.dirname.replace('docs', '');
		if(path.dirname[0] === '/') {
			path.dirname = path.dirname.substring(1);
		}
	}))
	.pipe(docsFilter)
	.pipe(replace('="../bower_components/', '="./bower_components/'))
	.pipe(replace('="../dist/', '="./dist/'))
	.pipe(docsFilter.restore)

	// push to git
	.pipe(ghPages({
		remoteUrl: pkg.repository,
		branch: 'gh-pages',
		push: !argv.local,
		force: true,
		message: 'gh-pages update v' + pkg.version,
		cacheDir: '.gh-pages'
	}));
});