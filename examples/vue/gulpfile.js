// Include gulp & plugins
const gulp = require('gulp');
const nodesass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');

// Paths setup
const PATHS = {
  'in': {
    'css': './scss/**/*.scss'
  },
  'out': {
    'css': './css/'
  }
}

// Turn sass into css, autoprefix and minify
gulp.task('scss', () => {
  return gulp.src(PATHS.in.css)
    .pipe(nodesass().on('error', nodesass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(PATHS.out.css));
});

// Watch files for changes
gulp.task('watch', () => {
  gulp.watch(PATHS.in.css, ['scss']);
});

// Build
gulp.task('build', ['scss']);

// Default task (build before watching)
gulp.task('default', ['build', 'watch']);