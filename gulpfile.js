/**
 * Gulp Doc Create File
 *
 * Basics: http://www.hongkiat.com/blog/getting-started-with-gulp-js/
 * Good Plugins: http://geekswithblogs.net/shaunxu/archive/2015/02/17/10-awesome-gulp-plugins-working-with-angularjs-and-bower.aspx
 * More: https://github.com/Pestov/essential-gulp-plugins
 *
 * Command line flags (the yargs github guide is glorious)
 */

/*jshint -W024 */

// 'use strict';

var gulp = require('gulp');
var marked = require('marked');
var del = require('del'); // rm -rf
var pkg = require('./package.json');


var argv = require('yargs')
.usage('Usage: $0 [command] [options]')

	.command('compileMarkdown', 'compiles the documentation markdown into formatted html partials')
	.command('compileJade', 'compiles the jade into the final .html')

	.command('docs', 'recompiles the documentaion pages + cleans partials')
	.command('docs:watch', 'runs docs automatically on found changes')

	.alias('h', 'help')
	.help('h')
	.describe('h', 'show help')

	.argv;

var $ = require('gulp-load-plugins')({lazy: true, camelize: true});

var dirs = {
	distribution: __dirname + '/dist',
	src: __dirname + '/src',
	docs: __dirname + '/docs',
	nodeModules: __dirname + '/node_modules'
};

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
		.pipe($.marked({
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
		.pipe($.jade({
			pretty: true,
			locals: {
				release: 'v' + pkg.version
			}
		}))
		.pipe(gulp.dest(dirs.docs));
});

gulp.task('docs', ['compileJade'], function(done) {
	// cleanup partials
	del(dirs.docs + '/content/**/*.html', done());
});

gulp.task('docs:watch', ['docs'], function() {
	return gulp.watch([
			dirs.docs + '/**/**.jade',
			dirs.docs + '/**/**.md'
		], ['docs']);
});

gulp.task('docs:deploy', ['docs'], function() {
	var docsFilter = $.filter([
		'*.html'
	], {restore: true});

	// only use files that are needed for docs
	return gulp.src([
		dirs.docs + '/css/**/*',
		dirs.docs + '/img/**/*',
		dirs.docs + '/js/**/*',
		dirs.docs + '/*.html',
		dirs.distribution + '/**/*',
		dirs.nodeModules + '/**/*'
	], {base: __dirname})

	// put pages in root folder and update relative paths to dependencies
	.pipe($.rename(function(path) {
		path.dirname = path.dirname.replace('docs', '');
		if(path.dirname[0] === '/') {
			path.dirname = path.dirname.substring(1);
		}
	}))
	.pipe(docsFilter)
	.pipe($.replace('="../node_modules/', '="./node_modules/'))
	.pipe($.replace('="../dist/', '="./dist/'))
	.pipe(docsFilter.restore)

	// push to git
	.pipe($.ghPages({
		remoteUrl: pkg.repository,
		branch: 'gh-pages',
		push: !argv.local,
		force: true,
		message: 'gh-pages update v' + pkg.version,
		cacheDir: '.gh-pages'
	}));
});

function log(msg){
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.yellow(msg[i]));
			}
		}
	} else {
		$.util.log($.util.colors.yellow(msg));
	}
}
