var clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    htmlBeautify = require('gulp-html-beautify'),
    imageMin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    twig = require('gulp-twig'),
    uglify = require('gulp-uglify'),

    src = './src',
    dest = './docs';

gulp.task('default', ['build:js', 'build:html', 'build:css']);

gulp.task('watch', ['build:js', 'build:html', 'build:css'], function() {
    gulp.watch(src + '**/*.html', ['build:html']);
    gulp.watch(src + '/js/**/*.js', ['build:js']);
    gulp.watch(src + '/sass/**/*.sass', ['build:css']);
    process.on('SIGINT', function() {
        setTimeout(function() {
            gulpUtil.log(gulpUtil.colors.red('Successfully closed'));
            process.exit(1);
        }, 500);
    });
});

gulp.task('clean', function () {
    gulp.src(dest, {read: false})
        .pipe(clean());
});

gulp.task('build:html', function() {
    var options = {
        "preserve_newlines": true,
        "max_preserve_newlines": 0,
        "end_with_newline": true
    };
    return gulp.src(src + '/html/index.html')
        .pipe(twig())
        .pipe(htmlBeautify(options))
        .pipe(gulp.dest(dest));
});

gulp.task('build:img', function () {
    gulp.src(src + '/assets/images/*')
        .pipe(imageMin())
        .dest(dest + '/assets/images');
    return gulp.src(src + '/assets/logos/*')
        .pipe(imageMin())
        .dest(dest + '/assets/logos');
});

gulp.task('build:js', function() {
    return gulp.src(src + '/js/**/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest(dest + '/js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest + '/js'));
});

gulp.task('build:css', function () {
    return gulp.src(src + '/sass/index.sass')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest(dest + '/css'));
});
