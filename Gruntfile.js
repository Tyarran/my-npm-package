module.exports = function(grunt) {

    // load grunt config
    require('load-grunt-config')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat']);

}
