const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');  
const cleanCSS = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const groupMedia = require('gulp-group-css-media-queries');
const browserSync = require('browser-sync').create();

const paths = {
  scss: './src/scss/**/*.scss',
  cssDest: './dist/css',
  html: './*.html',
};

function styles() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ cascade: false })])) 
    .pipe(groupMedia())
    .pipe(csscomb())
    .pipe(gulp.dest(paths.cssDest))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: './' });
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html).on('change', browserSync.reload);
}

exports.styles = styles;
exports.default = gulp.series(styles, serve);
