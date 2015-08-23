var source = require('vinyl-source-stream'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    notify = require('gulp-notify'),
    less = require('gulp-less'),
    lessImport = require('gulp-less-import'),
    glob = require('glob'),
    es = require('event-stream'),
    rename = require('gulp-rename');

var sourcesDir = '',
    appEntryPoints = ["./app/react/components/bingo/main.js", "./app/react/components/create/main.js"],
    targetDir = './build';


gulp.task('bundle', function(done) {
    glob('./app/react/components/**/main.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .transform(reactify)
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('./build')); 
            });
        es.merge(tasks).on('end', done);
    })
});

gulp.task('less', function () {
  return gulp.src('./app/styles/**.less')
    .pipe(less({
        paths: ['./app/styles']
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {
  gulp.watch("*", ['default']);
});

gulp.task('default', ['bundle', 'less'], function(){
    console.log('DONE!');
})


