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
          'js/main.js': ['js/frontend/main.js']
        }
      }
    },
    clean: {
      dev: ["js/plugins.js"]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('dev', ['clean', 'concat']);
};