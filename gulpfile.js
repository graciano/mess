var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src([
            'src/**/*.js',
            'node_stuff/**/*.js'
        ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'));
});
