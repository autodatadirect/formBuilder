module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			output: 'build'
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**'],
					dest: '<%= dirs.output %>'
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				sourceMap: true,
				sourceMapIncludeSources: true,
				mangle: true,
				// beautify: true
			},
			build: {
				files: {
					'<%= dirs.output %>/<%= pkg.name %>.min.js': [
						'src/util/**/*.js',
						'src/plugins/**/*.js',
						'src/widgets/**/*.js',
						'src/types/**/*.js',
					]
				}
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'<%= pkg.name %>.js',
				'src/**/*.js',
				'e2eTests/**/*.js',
				'unitTests/**/*.js'
			],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		clean: ['<%= dirs.output %>'],
		jasmine_nodejs: {
			options: {
				specNameSuffix: "spec.js",
				useHelpers: false,
				stopOnFailure: false,
				reporters: {
					console: {
						colors: true,
						cleanStack: 1,
						verbosity: 3,
						listStyle: 'indent',
						// activity: false
					},
					junit: {
						savePath: './spec/reports'
					}
				}
			},
			your_target: {
				specs: ['./*']
			}
		},
		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [{
					cwd: "tests/jade",
					src: '**/[^_]*.jade',
					dest: 'tests/html',
					expand: true,
					ext: '.html'
				}]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-jasmine-nodejs');
	grunt.loadNpmTasks('grunt-contrib-jade');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'clean', 'copy', 'uglify']);
	grunt.registerTask('jTest', ['default', 'jade', 'jasmine_nodejs']);

};
