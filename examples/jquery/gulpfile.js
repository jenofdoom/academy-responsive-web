const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const flexfixes = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');

const PATHS = {
  'src': {
    'scss': './scss/**/*.scss'
  },
  'dist': {
    'css': './css/'
  }
}

const BROWSERSYNCOPTS = {
  server: { baseDir: './' },
  files: [
    '**/*.html',
    '**/*.js',
    // you can add other paths to watch for reloads here,
    // e.g. 'templates/**/*.twig' or 'templates/**/*.ss' or '**/*.php'
  ]
}
let buildFlag = false; // used to determine if minification needed


gulp.task('scss', () => {
  return gulp.src(PATHS.src.scss)
    .pipe(sass({
        includePaths: []
      })
      .on('error', sass.logError)
    )
    .pipe(sourcemaps.init())
    .pipe(gulpif(buildFlag,
      postcss([ // building, run minification
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false,
          remove: false
        }),
        flexfixes(),
        cssnano()
      ]),
      postcss([ // not building, don't run minification
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false,
          remove: false
        }),
        flexfixes()
      ])
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.dist.css))
    .pipe(browsersync.stream({match: '**/*.css'}));
});


gulp.task('set-build-flag', function(done) {
  // only set when gulp is called via `build` command
  buildFlag = true;
  done();
});

gulp.task('build', gulp.series('set-build-flag', 'scss'));

gulp.task('testserver', () => {
  browsersync.init(BROWSERSYNCOPTS);
  gulp.watch(PATHS.src.scss, gulp.parallel('scss'));
});

gulp.task('watch', () => {
  gulp.watch(PATHS.src.scss, gulp.parallel('scss'));
});

gulp.task('default', gulp.series('scss', 'watch'));
