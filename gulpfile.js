var gulp = require('gulp');
var zip =require('gulp-zip');

var srcPath = [
    '**/*',
    'gulpfile.js',
    '!.*'

];

gulp.task('build',function(){
    return gulp.src(srcPath)
    .pipe(gulp.dest('dist/'))
});
 
gulp.task('default', () =>
	gulp.src(srcPath)
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('./'))
);