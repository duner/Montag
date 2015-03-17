// Django Gruntfile

module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Paths
	var pkg = grunt.file.readJSON('package.json');
	var name = pkg.name.toLowerCase();
	var paths = {
		app: name,
		manage: 'manage.py',
		templates: name + '/templates',
		assets: name + '/assets',
		css: name + '/assets/css',
		sass: name + '/assets/sass',
		fonts: name + '/assets/fonts',
		img: name + '/assets/img',
		js: name + '/assets/js',
		dist: name + '/static/',
	};

	grunt.initConfig({

		paths: paths,

		watch: {
			options: { livereload: true },
			gruntfile: {
        files: ['Gruntfile.js']
      },
			bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      sass: {
        files: ['<%= paths.sass %>/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      js: {
        files: ['<%= paths.js %>/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: false
        }
      },
      livereload: {
      	options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= paths.templates %>/{,*/}*.html',
          '<%= paths.css %>/{,*/}*.css',
          '<%= paths.img %>/{,*/}*'
        ]
      }
		},

    connect: {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                base: [
                    '.tmp',
                    '<%= paths.assets %>',
                    '<%= paths.templates %>'
                ]
            }
        },
        test: {
            options: {
                open: false,
                port: 9001,
                base: [
                    '.tmp',
                    '<%= paths.assets %>',
                    '<%= paths.templates %>'
                ]
            }
        },
        dist: {
            options: {
                base: [
                    '<%%= paths.dist %>',
                    '<%%= paths.templates %>'
                ],
                livereload: false
            }
        }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= paths.dist %>/*',
            '!<%= paths.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= paths.js %>/scripts/{,*/}*.js',
        '!<%= paths.js %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },


		wiredep: {
		  task: {
		    src: [
		      '<%= paths.sass %>/**/*.{scss,sass}',
          '<%= paths.templates %>/**/*.html'
		    ]
		  }
		},

    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>',
          src: ['*.{scss,sass}'],
          dest: '<%= paths.dist %>/css',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>',
          src: ['*.{scss,sass}'],
          dest: '<%= paths.dist %>/css',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        map: {
          prev: '<%= paths.css %>'
        }
        
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: '{,*/}*.css',
          dest: '<%= paths.dist %>'
        }]
      }
    },


    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.img %>',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.img %>',
          src: '{,*/}*.svg',
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    // htmlmin: {
    //   dist: {
    //     options: {
    //       collapseBooleanAttributes: true,
    //       collapseWhitespace: true,
    //       conservativeCollapse: true,
    //       removeAttributeQuotes: true,
    //       removeCommentsFromCDATA: true,
    //       removeEmptyAttributes: true,
    //       removeOptionalTags: true,
    //       // true would impact styles with attribute selectors
    //       removeRedundantAttributes: false,
    //       useShortDoctype: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: '<%= paths. %>',
    //       src: '{,*/}*.html',
    //       dest: '<%= config.dist %>'
    //     }]
    //   }
    // },
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },

    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },

    // concat: {
    //   dist: {}
    // },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.assets %>',
          dest: '<%= path.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      }
    },

    bgShell: {
      _defaults: {
        bg: true
      },
      runDjango: {
        cmd: 'python <%= paths.manage %> runserver'
      }
    },

    concurrent: {
      server: [
        'sass:server'
      ],
      dist: [
        'sass',
        'imagemin',
        'svgmin'
      ]
    }
  });

  grunt.registerTask('serve', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'wiredep',
    'sass',
    'autoprefixer',
  ]);

  grunt.registerTask('default', [
  	'clean',
    'wiredep',
    'sass:dist',
    'autoprefixer',
    'watch'
	]);
};
