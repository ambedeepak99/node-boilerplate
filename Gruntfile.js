/**
 * Created by deepak on 5/25/2017.
 */
module.exports = function (grunt) {
    var myPkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: myPkg,
        jsdoc: {
            dist: {
                src: ['app_modules/**/*.js', 'lib/**/*.js', 'README.md', 'app.js', '/routes/**/*.js'],
                options: {
                    destination: 'api.document'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['jsdoc']);
};

