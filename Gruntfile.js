module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //our concat options
    concat: {
      options: {
        separator: ';' //separates scripts
      },
      basic_and_extras: {
        files: {
          'js/plugins.js': ['js/**/*.js', 'bower/bootstrap/js/*.js'],
          'js/main.js': ['js/main.js']
        }
      }
    },
    clean: {
      dev: ["js/plugins.js"]
    },
    recess: {
      dev: {
        options: {
          compile: true,
        },
        files: {
          'css/style.css': ['css/style.less']
        }
      },
      build: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'css/style.css': ['css/style.less']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-recess');

  grunt.registerTask('dev', ['clean', 'concat', 'recess:dev']);
};