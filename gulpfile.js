var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    beeper = require('beeper'),
    notifier = require('node-notifier'),
    cleanCSS = require('gulp-clean-css')
    /*babel =require('gulp-babel')*/
    
gulp.task('SassCompile', function () {
    return gulp.src(['stage/sass/main_ltr.scss', 'stage/sass/main_rtl.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', function (err) {
            console.log(`-----------------------------------------------------------------`);
            console.log(err.message);
            console.log(`-----------------------------------------------------------------`);
            beeper();

            notifier.notify(
                {
                    title: 'Sass Error Compiling',
                    message: `Error in File : ${err.relativePath} \nError in Line : ${err.line} , Column : ${err.column} `,
                    sound: false,
                    wait: false,
                    timeout: 1
                },
                function (err, response) {
                    // Response is response from notification
                }
            );
            this.emit('end');
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

////////////////////////////////////////////////////////////////////
gulp.task('minifyrtlcss', function () {
    return gulp.src(['dist/css/vendor/rtl/*.css','dist/css/vendor/all.min.css','dist/css/vendor/swiper-bundle.min.css','dist/css/vendor/owl.carousel.min.css','dist/css/vendor/owl.theme.default.min.css','dist/css/main_rtl.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('rtlstyle.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/minifiedStyle'));
});

gulp.task('minifyltrcss', function () {
    return gulp.src(['dist/css/vendor/ltr/*.css','dist/css/vendor/all.min.css','dist/css/vendor/swiper-bundle.min.css','dist/css/vendor/owl.carousel.min.css','dist/css/vendor/owl.theme.default.min.css','dist/css/main_ltr.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('ltrstyle.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/minifiedStyle'));
});

/*//////////////////////////////////////////////////////////////////
gulp.task('default', () =>
	gulp.src('js/main.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('js/app'))
);
//////////////////////////////////////////////////////////////////////////////***/

gulp.task('minifyJs', function () { 
    return gulp.src(['dist/scripts/vendor/jquery-3.3.1.min.js','dist/scripts/vendor/all.min.js ','dist/scripts/vendor/swiper-bundle.min.js','dist/scripts/vendor/bootstrap.bundle.min.js','dist/scripts/vendor/jquery.validate.min.js','dist/scripts/vendor/additional-methods.min.js','dist/scripts/vendor/owl.carousel.min.js','stage/scripts/main.js','stage/scripts/app/register.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) 
    .pipe(gulp.dest('dist/scripts/MinifiedJs'));
});
//////////////////////////////////////////////////////////////

gulp.task('watch', function () {
    gulp.watch(['stage/sass/*.scss','stage/sass/*/*.scss','stage/scripts/*.js','stage/scripts/*/*.js'], 
    gulp.series(['SassCompile','minifyltrcss','minifyrtlcss','minifyJs']));
});
