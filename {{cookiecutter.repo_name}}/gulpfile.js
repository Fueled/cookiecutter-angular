'use strict';
// generated on 2014-10-07 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var gutil = require('gulp-util');
var magenta = gutil.colors.magenta;

// load plugins
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');


gulp.task('styles', function () {
    var path = require('path');
    return gulp.src('app/styles/main.scss')
        .pipe(plugins.compass({
          project: path.join(__dirname),
          sass: 'app/styles',
          css: 'app/styles'
        }))
        .pipe(plugins.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe(plugins.size())
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(require('jshint-stylish')))
        .pipe(plugins.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = plugins.filter('**/*.js', {restore: true});
    var cssFilter = plugins.filter('**/*.css', {restore: true});

    return gulp.src(['app/**/*.html', '!app/bower_components/**/*'])
        .pipe(plugins.useref({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe(plugins.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.csso())
        .pipe(cssFilter.restore)
        .pipe(plugins.rev())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*.*')
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(plugins.size());
});

gulp.task('fonts', function () {
  var bowerFiles = mainBowerFiles();

  bowerFiles.push('app/fonts/**/*.*');

    return gulp.src(bowerFiles)
        .pipe(plugins.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe(plugins.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe(plugins.clean());
});

gulp.task('build', ['clean'], function(){
  return gulp.start(['wiredep', 'html', 'images', 'fonts', 'extras']);
});

gulp.task('default', ['clean'], function(){
    return gulp.start('serve');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('app'))
        .use(serveStatic('.tmp'));

    var port = 9003;

    require('http').createServer(app)
        .listen(port)
        .on('listening', function () {
            gutil.log('Started connect web server at : '+ magenta('http://localhost:'+port.toString()));
        });
});

gulp.task('serve', ['wiredep', 'styles', 'watch'], function () {
    gulp.start('connect');
    require('opn')('http://localhost:9003');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', function () {
    var server = require('gulp-livereload');

    // watch for changes

    gulp.watch([
        'app/**/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
