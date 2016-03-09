const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

const files = {
  all: [__dirname + '/app/**/*.html', __dirname + '/app/js/*.js'],
  sass: [__dirname + '/app/styles/sass/**/*.scss']
};

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!**/node_modules/*', '!**/build/*'])
    .pipe(eslint(__dirname + '/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('js:dev', () => {
  gulp.src(__dirname + '/app/js/scripts/*.js')
    .pipe(gulp.dest(__dirname + '/build/scripts'));
});

gulp.task('img:dev', () => {
  gulp.src(__dirname + '/app/img/**/*')
    .pipe(gulp.dest(__dirname + '/build/img'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', () => {
  gulp.src(files.sass)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(__dirname + '/build/css'));
});

gulp.task('build:dev', ['html:dev', 'webpack:dev', 'sass:dev', 'js:dev', 'img:dev']);


gulp.task('sass:watch', () => {
  gulp.watch(files.sass, ['sass:dev']);
});

gulp.task('dev:watch', () => {
  gulp.watch(files.all, ['webpack:dev', 'html:dev']);
});

gulp.task('default', ['dev:watch', 'sass:watch']);
