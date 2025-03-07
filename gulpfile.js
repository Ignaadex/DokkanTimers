const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const del = require('del');

// Clean dist folder
function clean() {
  return del(['dist/**/*']);
}

// Process HTML files
function html() {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
}

// Process CSS files
function css() {
  return gulp.src('src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

// Process JavaScript files
function js() {
  return gulp.src('src/js/**/*.js')
    .pipe(terser({
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/  // Mangle properties that start with underscore
        }
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      format: {
        comments: false,
        beautify: false
      }
    }))
    .pipe(gulp.dest('dist'));
}

// Watch files for changes
function watch() {
  gulp.watch('src/html/**/*.html', html);
  gulp.watch('src/css/**/*.css', css);
  gulp.watch('src/js/**/*.js', js);
}

// Define build tasks
const build = gulp.series(clean, gulp.parallel(html, css, js));

// Export tasks
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;