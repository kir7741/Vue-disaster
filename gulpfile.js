const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');

gulp.task('copyHTML', function () {
  return gulp.src('./source/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./public/'))
});

gulp.task('copyCss', function () {
  return gulp.src('./source/scss/*.css')
    .pipe($.plumber())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('sass', function () {
  var plugins = [
    autoprefixer({browsers: ['last 3 version','> 5%','ie 8']})
  ];
  return gulp.src('./source/scss/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', () =>
  gulp.src('./source/js/*.js')
    .pipe($.plumber())
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/js'))
);

gulp.task('watch',function () {
  gulp.watch('./source/**/*.html', ['copyHTML'])
  gulp.watch('./source/scss/**/*.scss', ['sass'])
  gulp.watch('./source/js/**/*.js', ['babel'])
})