var source = require('vinyl-source-stream'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    notify = require('gulp-notify');

var sourcesDir = '',
    appEntryPoint = "./ui/js/main.js",
    targetDir = './build';


gulp.task('default', function() {
  return browserify({entries: [appEntryPoint], debug: true})
    .transform(reactify)
    .bundle()
    .pipe(source(appEntryPoint))
    .pipe(gulp.dest(targetDir))
    //.pipe(notify("Bundling done."));
});

gulp.task('watch', function() {
  gulp.watch(sourcesDir + '/' + "*.js", ['default']);
});