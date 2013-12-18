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
    watch: {
      styles: {
        files: ['js/main.js', 'js/**/*.js', 'css/*.less'],
        tasks: ['recess:dev', 'concat:basic_and_extras'],
        options: {
          nospawn: true
        }
      }
    },
    clean: {
      dev: ["js/plugins.js","css/style.css","js/main.min.js"],
      build: ["js/plugins.js","css/style.css","js/main.min.js"]
    },
    uglify: {
      js: {
        files: {
          'js/main.min.js': ['js/plugins.js','js/main.js']
        }
      }
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  grunt.registerTask('dev', ['clean:dev', 'concat', 'recess:dev', 'watch']);
  grunt.registerTask('prod', ['clean', 'concat', 'uglify' , 'recess:build']);
};