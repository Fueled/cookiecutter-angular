'use strict';

// Gulp Plugins
var gulp           = require('gulp');
var prefix         = require('gulp-autoprefixer');
var concat         = require('gulp-concat');
var imagemin       = require('gulp-imagemin');
var ngConstant     = require('gulp-ng-constant');
var pngquant       = require('imagemin-pngquant');
var ngHtml2Js      = require("gulp-ng-html2js");
var plumber        = require('gulp-plumber');
var sass           = require('gulp-sass');
var uglify         = require('gulp-uglify');
var size           = require('gulp-size');
var config         = require('config');
var gulpHTMLAssets = require('gulp-html-assets');
var fs             = require('fs');
var path           = require('path');
var server         = require('gulp-develop-server');

var manifest       = {};

// Plugins
var mainBowerFiles = require('main-bower-files');
var browserSync    = require('browser-sync');

// Paths
var appPath        = './app/';


/**
*
* Server
* - Run server.js
*
**/
gulp.task('server:start', function() {
    server.listen({
        path: './server.js'
    });
});

/**
*
* Styles
* - Compile
* - Catch errors (gulp-plumber)
* - Autoprefixer
*
**/
gulp.task('sass', function() {
    gulp.src('styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(prefix('last 5 versions'))
    .pipe(gulp.dest('dist/styles'));
});


/**
*
* Components scripts
* - Retrieve all bower dependencies
* - Concatenate them into one file
* - Uglify file
*
**/
gulp.task('component-scripts', function () {
    return gulp.src(mainBowerFiles(['**/*.js']))
    .pipe(concat('vendor.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size());
});


/**
*
* Main Scripts
* - Retrieve all Javascript (angular and non-angualr)
* - Concatenate them into one file
* - Uglify file
*
**/
gulp.task('scripts', ['component-scripts'], function () {
    return gulp.src([appPath + 'scripts/**/*.js', 'js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size());
});


/**
*
* HTML
* - Take all HTML files
* - Check everything is chill
* - Put it somewhere useful like the dist folder
*
**/
gulp.task('html', function () {
    return gulp.src(['app/**/*.html', '!app/bower_components/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist'))
    .pipe(size());
});

gulp.task('version-assets', function () {
    var stream = gulp.src(['dist/index.html'])
        .pipe(gulpHTMLAssets({
            root: path.resolve('dist'),
            dest: './dist',
            file: '[name]' + '-[hash]' + '.[ext]',
            prefix: '',
            indexes: manifest

        }))
        .pipe(gulp.dest('dist'));

    stream.on('end', function () {
        fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
    });

    return stream;
});

/**
 * ng include has a lot of performance drawbacks, this module creates a template cahce js and loads all the templates
 * in starting.
 */
gulp.task('partials', function () {
    gulp.src("app/views/partials/*.html")
    .pipe(ngHtml2Js({
        moduleName: "{{cookiecutter.base_app_name}}",
        prefix: "views/partials/"
    }))
    .pipe(concat("partials.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/partials"));

});

gulp.task('favicon', function() {
    return gulp.src('favicon/*')
        .pipe(gulp.dest('./dist/favicon'))
});

gulp.task('images', ['move-svg'], function () {
    return gulp.src(['images/**/*', '!images/**/*.svg'])
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('move-svg', function () {
    return gulp.src('images/**/*.svg')
    .pipe(gulp.dest('./dist/images'))
});


/**
 * Task to get server specific values and then create a ng constant file.
 */
gulp.task('config', function () {
    console.log(config)
    return ngConstant({
        name: '{{cookiecutter.base_app_name}}.settings',
        constants: {'settings': config},
        wrap: false,
        stream: true
    })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
});


/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync', function() {
    browserSync.init(['./dist/styles/*.css', './dist/scripts/**/*.js', './dist/*.html'], {
        proxy: 'localhost:8000'
    });
});

/**
*
* Default task
* - Builds images, scripts and sass
*
**/
gulp.task('default', function(){
    return gulp.start(['html', 'sass', 'scripts', 'config', 'images', 'favicon', 'partials']);
});

/**
*
* Watch task
* - Runs sass, browser-sync and scripts
* - Watchs for file changes for scripts and sass/css
*
**/
gulp.task('watch', ['server:start', 'default', 'browser-sync'], function () {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['html', 'partials']);
    gulp.watch(appPath + '**/*.js', ['scripts', 'config']);
    gulp.watch('js/**/*.js', ['scripts', 'config']);
    gulp.watch('config/*.json', ['config']);
});
