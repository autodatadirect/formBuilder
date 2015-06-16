module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			output: 'build',
			distribution: 'dist'
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**'],
					dest: '<%= dirs.output %>'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**'],
					dest: '<%= dirs.distribution %>'
				}]
			}
		},
		uglify: {
			testBuild: {
				options: {
					banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					sourceMap: true,
					sourceMapIncludeSources: true,
					mangle: false,
					beautify: true,
					compress: false
				},
				files: {
					'<%= dirs.output %>/<%= pkg.name %>.min.js': [
						'src/util/**/*.js',
						'src/plugins/**/*.js',
						'src/widgets/**/*.js',
						'src/types/**/*.js',
					]
				}
			},
			dist: {
				options: {
					banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					sourceMap: true,
					sourceMapIncludeSources: true,
					mangle: true,
					beautify: false,
					compress: true
				},
				files: {
					'<%= dirs.distribution %>/<%= pkg.name %>.min.js': [
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
		clean: {
			output: ['<%= dirs.output %>'],
			dist: ['<%= dirs.distribution %>']
		},
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
		},

		// Auto rebuild
		watch: {
			scrips: {
				files: ['src/**/*.js'],
				tasks: ['default'],
				options: {

				}
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
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'clean:output', 'copy:main', 'uglify:testBuild']);
	grunt.registerTask('dist', ['jshint', 'clean:dist', 'copy:dist', 'uglify:dist']);

	grunt.registerTask('jTest', ['default', 'jade', 'jasmine_nodejs']);
	
};
