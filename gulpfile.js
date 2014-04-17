(function () {
  'use strict';

  var gulp = require('gulp');
  var jshint = require('gulp-jshint');
  var mocha = require('gulp-mocha');

  // Tests
  gulp.task('test', function () {
    return gulp.src('test/**/*.js')
      .pipe(mocha({reporter: 'spec'}));
  });

  // Linter
  gulp.task('lint', function() {
    return gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  gulp.task('default', ['lint', 'test']);
})();
