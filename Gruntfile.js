module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      styles: {

        files: ['js/*.js', 'js/*/*.js', 'css/**/*.less', 'css/*.less'],
        tasks: ['recess:dev', 'concat'],
        options: {
          nospawn: true
        }
      }
    },

    //our concat options
    concat: {
      options: {
        separator: ';' //separates scripts
      },
      basic_and_extras: {
        files: {
          'js/plugins.js': ['js/extra/*.js', 'js/plugins/*.js']
        }
      }
    },

    //our uglify options
    uglify: {
      js: {
        files: {
          'build/js/main.js': ['js/main.js', 'js/plugins.js']
        }
      }
    },

    recess: {
      dev: {
        options: {
          compile: true,
          // compress: true
        },
        files: {
          'css/main.css': ['css/main.less']
        }
      },
      build: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'build/css/main.css': ['css/main.less']
        }
      }
    },

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/index.html': 'index.html',         // 'destination': 'source'
        }
      }
    },

    // usemin for html file
    usemin: {
      html: ['index.html']
    },
    
    copy: {
      main: {
        files: [
          {expand: true, src: ['fonts/**'], dest: 'build/'},
          {expand: true, src: ['js/vendor/*'], dest: 'build/'},
          {expand: true, src: ['img/*'], dest: 'build/'},
          {expand: false, src: ['package.json'], dest: 'build/package.json', filter: 'isFile'},
          {expand: false, src: ['config.json'], dest: 'build/config.json', filter: 'isFile'},
          {expand: false, src: ['favicon.png'], dest: 'build/favicon.png', filter: 'isFile'},
          {expand: false, src: ['.nodemonignore'], dest: 'build/.nodemonignore', filter: 'isFile'},
          {expand: false, src: ['porutalu-comingsoon.js'], dest: 'build/porutalu-comingsoon.js', filter: 'isFile'},
        ]
      }
    },

    symlink: {
      explicit:{src: 'node_modules', dest: 'build/node_modules'}
    },

    clean: {
      dev: ["js/plugins.js"],
      build: ["build/*"]
    },
  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-recess');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //default tasks to run
  grunt.registerTask('compile', ['clean:build', 'recess:build', 'concat', 'uglify', 'copy:main', 'usemin', 'htmlmin','symlink']);

  grunt.registerTask('dev', ['clean:dev', 'recess:dev', 'concat', 'watch']);

};