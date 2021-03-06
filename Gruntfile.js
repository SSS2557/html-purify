/*
* Copyright 2015, Yahoo Inc. 
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/*.js'],
      options: {
        scripturl: true,
        camelcase: true
      }
    },
    copy: {
      testResultFile: {
        files: [
          { dest: 'artifacts/test/node-test-results.xml', src: 'xunit.xml'}
        ]
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'tests/unit',
        options: {
          coverageFolder: 'artifacts/test/coverage',
          check: {
            lines: 80,
            statements: 80
          },
          timeout: 10000,
          reporter: 'xunit-file'
        }
      },
      target: {
        src: 'tests/unit'
      }
    },
    clean: {
      all: ['xunit.xml', 'artifacts', 'coverage', 'node_modules'],
      buildResidues: ['xunit.xml', 'artifacts', 'coverage']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint', 'clean:buildResidues', 'mocha_istanbul:coverage', 'copy:testResultFile']);
  grunt.registerTask('unittest', ['jshint', 'clean:buildResidues', 'mocha_istanbul:target']);

  grunt.registerTask('default', ['test']);

};
