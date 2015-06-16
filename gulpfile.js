/**
 * Gulp buildfile
 * 
 * Basics: http://www.hongkiat.com/blog/getting-started-with-gulp-js/
 * Good Plugins: http://geekswithblogs.net/shaunxu/archive/2015/02/17/10-awesome-gulp-plugins-working-with-angularjs-and-bower.aspx
 * More: https://github.com/Pestov/essential-gulp-plugins
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var karma = require('karma').server;

var del = require('del'); // rm -rf
var pkg = require('./package.json');

// Command line flags (the yargs github guide is glorious)
var argv = require('yargs')
	.alias('d', 'dist')	// building dirstribution or test build
	.alias('o', 'original') // uglify without mangling variable names or compressing
	.alias('m', 'mangle') // uglify with mangling/compressing (default is true)
	.alias('k', 'keepalive') // run karma with singlerun=false (defualt true)
	.boolean('d')
	.boolean('o')
	.boolean('m')
	.boolean('k')
	.argv;


var dirs = {
	assets: './assets',
	build: './build',
	distribution: './dist',
	src: './src',
	e2eTests: './e2eTests',
	unitTests: './unitTests'
};

var date = new Date();
var today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

var outDir = argv.dist? dirs.distribution : dirs.build;

gulp.task('lint', function(){
	return gulp.src([
			'gulpfile.js',
			dirs.src + '/**/*.js',
			dirs.e2eTests + '/**/*.js',
			dirs.unitTests + '/**/*.js',
		])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean', function(done){
	del(outDir + '/**/*', done);
});

gulp.task('copy:assets', ['clean'], function(){
	gulp.src(dirs.assets + '/**')
		.pipe(gulp.dest(outDir));
});

gulp.task('build', ['lint', 'copy:assets'], function(){
	var stream = gulp.src([
			dirs.src + '/util/**/*.js',
			dirs.src + '/plugins/**/*.js',
			dirs.src + '/widgets/**/*.js',
			dirs.src + '/types/**/*.js',
		])
		.pipe(sourcemaps.init())
			.pipe(concat(pkg.name + '.min.js'))
			.pipe(uglify({
				banner: '/*! ' + pkg.name + ' ' + pkg.version + ' ' + today + '*/\n',
				mangle: !argv.original && argv.dist || argv.mangle,
				compress: !argv.original && argv.dist || argv.mangle,
				preserveComments: argv.original || !argv.dist
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

gulp.task('test', ['build', 'refreshTester'], function(done){
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: !argv.keepalive
	}, done);
});


gulp.task('default', ['build']);

gulp.task('autoBuild', function(){
	gulp.watch([
		dirs.src + '/**/*',
		dirs.assets + '/**/*'
	], ['build']);
});

gulp.task('autoTest', function(){
	gulp.watch([
		dirs.src + '/**/*',
		dirs.assets + '/**/*',
		dirs.unitTests + '/**/*'
	], ['test']);
});

