module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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