// Django Gruntfile

module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Paths
	var pkg = grunt.file.readJSON('package.json');
	var name = pkg.name.toLowerCase();
	var paths = {
		app: name,
		templates: name + '/templates',
		css: name + '/static/css',
		sass: name + '/static/sass',
		fonts: name + '/static/fonts',
		img: name + '/static/img',
		js: name + '/static/js'
	};

	grunt.initConfig({

		paths: paths,

		watch: {
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
        tasks: ['jshint']
      },
		},


    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
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
          dest: '<%= paths.css %>',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>',
          src: ['*.{scss,sass}'],
          dest: '<%= paths.css %>',
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
          cwd: '<%= paths.css %>',
          src: '{,*/}*.css',
          dest: '<%= paths.css %>'
        }]
      }
    },

	});



};
