'use strict'

// Require modules
const gulp = require("gulp"); 
const concat = require("gulp-concat");  
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const del = require("del");
const cleanCSS = require('gulp-clean-css');
const image = require("gulp-image");
const browserSync = require("browser-sync").create();

// Concatenate js scripts and create map files
gulp.task('scripts', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'js/*.js', 
        'js/**/*.js'
    ])
        .pipe(maps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
});


// css concat
gulp.task('styles', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(rename('all.min.css'))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream())
});

// Set browserSync server, watch and serve sass files
gulp.task('serve', () => {
    browserSync.init({server: 'dist'});
    gulp.watch( ( 'sass/*.scss'), ['styles']);
})

// Image optimization
gulp.task('images', () => {
    return gulp.src('images/*')
        .pipe(image())
        .pipe(gulp.dest('dist/content'))
})

// Removal of designated files and directories
gulp.task('clean', () => {
    del(['dist', 'js/all*.js*', 'css/global.css*']);
});

// Build the static website  
gulp.task('build', ['scripts', 'styles', 'images'], () => {
    return gulp.src([
        'icons/*',
        'index.html'
    ], {base: './'})
        .pipe(gulp.dest('dist'))
});

// Default task
gulp.task('default', ['clean', 'build'], ()=>{
    gulp.start('serve');
})