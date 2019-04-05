const gulp = require('gulp')
const brotli = require('gulp-brotli')
const gzip = require('gulp-gzip')

gulp.task('brotli-js',
  () => {
    return gulp.src('js/*.js')
      .pipe(brotli.compress({
        extension: 'brotli',
        skipLarger: true,
        mode: 0,
        quality: 11,
        lgblock: 0
      }))
      .pipe(gulp.dest('js'))
  }
)
gulp.task('brotli-css',
  () => {
    return gulp.src('css/*.css')
      .pipe(brotli.compress({
        extension: 'brotli',
        skipLarger: true,
        mode: 0,
        quality: 11,
        lgblock: 0
      }))
      .pipe(gulp.dest('css'))
  }
)

gulp.task('gzip-js',
  () => {
    return gulp.src('js/*.js')
      .pipe(gzip())
      .pipe(gulp.dest('js'))
  }
)

gulp.task('gzip-css',
  () => {
    return gulp.src('css/*.css')
      .pipe(gzip())
      .pipe(gulp.dest('css'))
  }
)
