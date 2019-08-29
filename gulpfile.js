'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-terser'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    change = require('gulp-change'),
    reload = browserSync.reload,
    debug = false;

var path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/img/',
        fonts: 'build/assets/fonts/'
    },
    build_dev: {
        html: 'build_dev/',
        js: 'build_dev/assets/js/',
        css: 'build_dev/assets/css/',
        img: 'build_dev/assets/img/',
        fonts: 'build_dev/assets/fonts/'
    },
    src: {
        html: 'src/atomic_design/pages/*.html',
        html_dev: 'src/atomic_design/**/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/scss/**/*.scss',
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch: {
        html: 'src/atomic_design/pages/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/scss/**/*.scss',
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch_dev: {
        html: 'src/atomic_design/**/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/scss/**/*.scss',
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    clean: './build',
    clean_dev: './build_dev'
};

var config = {
    server: {
        baseDir: "./build"
    },
    livereload: true,
    host: 'localhost',
    port: 8080,
    logPrefix: "karpus-host-fe",
    startPath: "/main.html"
};

var config_dev = (() => {const c = JSON.parse(JSON.stringify(config));
                          c.server.baseDir = "./build_dev";
                          c.startPath = "/index.html";
                          return c;})();

gulp.task('webserver', function (cb) {
    browserSync(config);
	cb();
});

gulp.task('webserver:dev', function (cb) {
    browserSync(config_dev);
	cb();
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
    rimraf(path.clean_dev, cb);
});

//build
gulp.task('html:build', function (cb) {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('js:build', function (cb) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('style:build', function (cb) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('image:build', function (cb) {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('fonts:build', function(cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
	cb();
});
//end build
//build html_dev
gulp.task('html:build:dev', function (cb) {
    gulp.src(path.src.html_dev)
        .pipe(rigger())
        .pipe(gulp.dest(path.build_dev.html))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('js:build:dev', function (cb) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build_dev.js))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('style:build:dev', function (cb) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build_dev.css))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('image:build:dev', function (cb) {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build_dev.img))
        .pipe(reload({stream: true}));
	cb();
});

gulp.task('fonts:build:dev', function(cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build_dev.fonts));
	cb();
});
//end build dev

gulp.task('build', gulp.parallel('html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'));

gulp.task('build:dev', gulp.parallel('html:build:dev',
    'js:build:dev',
    'style:build:dev',
    'fonts:build:dev',
    'image:build:dev'));


gulp.task('watch', function(cb){
    watch([path.watch.html], gulp.series(gulp.task('html:build')));
    watch([path.watch.style], gulp.series(gulp.task('style:build')));
    watch([path.watch.js], gulp.series(gulp.task('js:build')));
    watch([path.watch.img], gulp.series(gulp.task('image:build')));
    watch([path.watch.fonts], gulp.series(gulp.task('fonts:build')));
	cb();
});

gulp.task('watch:dev', function(cb){
    watch([path.watch_dev.html], gulp.series(gulp.task('html:build:dev')));
    watch([path.watch_dev.style], gulp.series(gulp.task('style:build:dev')));
    watch([path.watch_dev.js], gulp.series(gulp.task('js:build:dev')));
    watch([path.watch_dev.img], gulp.series(gulp.task('image:build:dev')));
    watch([path.watch_dev.fonts], gulp.series(gulp.task('fonts:build:dev')));
	cb();
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));
gulp.task('dev', gulp.parallel('build:dev', 'webserver:dev', 'watch:dev'));
