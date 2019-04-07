const {src, dest, task, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const htmlmin = require("gulp-htmlmin");
const less = require('gulp-less');
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const path = require('path');

let serverTask = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
};

const minify = () => {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
};

const compressImages = () => {
  return src("src/img/*")
    .pipe(imagemin())
    .pipe(dest("dist/img"));
};

let lessTask = function () {
  return src('./src/less/**/*.less')
  .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(sourcemaps.write("."))
    .pipe(concat("styles.css"))
    .pipe(dest('./dist/css'));
};

task('js', () => {
  return src('./src/js/*.js')
  .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())

    .pipe(sourcemaps.write("."))
    .pipe(dest('dist/js'));
});

task('default', series(minify, lessTask, compressImages, 'js'));

exports.serve = () => {
  serverTask();
  watch("./src/*.html").on("change", reload);
  watch('./src/less/*.less', lessTask).on("change", reload);
  watch(["./src/**/*.html"], minify);
  watch('./src/js/*.js', series('js'));
};
