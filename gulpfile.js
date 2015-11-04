"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		fonts: './src/fonts/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      		'node_modules/toastr/toastr.css',
      		'./src/css/main.css',
      		'./src/css/sass/*.scss'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

// gulp.task('express', function() {
// 	var fs = require('fs');
// 	var path = require('path');
// 	var express = require('express');
// 	var bodyParser = require('body-parser');
// 	var app = express();

// 	var COMMENTS_FILE = path.join(__dirname, 'items.json');

// 	app.set('port', (process.env.PORT || 9005));

// 	app.use('/', express.static(path.join(__dirname, 'public')));
// 	app.use(bodyParser.json());
// 	app.use(bodyParser.urlencoded({extended: true}));

// 	app.get('/api/comments', function(req, res) {
// 	  fs.readFile(COMMENTS_FILE, function(err, data) {
// 	    res.setHeader('Cache-Control', 'no-cache');
// 	    res.json(JSON.parse(data));
// 	  });
// 	});

// 	app.post('/api/comments', function(req, res) {
// 	  fs.readFile(COMMENTS_FILE, function(err, data) {
// 	    var comments = JSON.parse(data);
// 	    comments.push(req.body);
// 	    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
// 	      res.setHeader('Cache-Control', 'no-cache');
// 	      res.json(comments);
// 	    });
// 	  });
// 	});


// 	app.listen(app.get('port'), function() {
// 	  console.log('Server started: http://localhost:' + app.get('port') + '/');
// 	});
// });

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('fonts', function() {
	gulp.src(config.paths.fonts)
		.pipe(gulp.dest(config.paths.dist + '/fonts'))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(sass())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src('./src/**/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest(config.paths.dist + '/css/'));
});

// Migrates images to dist folder
// Note that I could even optimize my images here
// gulp.task('images', function () {
//     gulp.src(config.paths.images)
//         .pipe(gulp.dest(config.paths.dist + '/images'))
//         .pipe(connect.reload());

//     //publish favicon
//     gulp.src('./src/favicon.ico')
//         .pipe(gulp.dest(config.paths.dist));
// });

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('open', ['connect'], function() {
	gulp.src('./dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.css, ['css', 'sass']);
	gulp.watch(config.paths.sass, ['sass']);
});

gulp.task('default', ['html', 'js', 'watch', 'fonts', 'sass', 'css', 'lint', 'open']);