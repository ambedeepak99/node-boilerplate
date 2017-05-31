/**
 * @module gruntfile
 * @description jsdoc-grunt
 * @author deepak.ambekar [5/25/2017].
 */
module.exports = function (grunt) {
    var myPkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: myPkg,
        jsdoc: {
            dist: {
                src: ['app_modules/**/*.js', 'lib/**/*.js', 'README.md', 'app.js'],
                options: {
                    destination: 'docs',
//                    template : "node_modules/ink-docstrap/template",
//                    configure : "node_modules/ink-docstrap/template/jsdoc.conf.json",
                    template : "node_modules/docdash"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['jsdoc']);
};

