'use strict'

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

// gulp scripts
gulp.task('concatScripts', ()=> {
    return gulp.src([
        'js/circle/autogrow.js',
        'js/circle/circle.js',
    ])
        .pipe(maps.init())
        .pipe(concat('global.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'))
});

// all.min.js
gulp.task('scripts', ['concatScripts'], ()=> {
    return gulp.src('js/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'))
});

// css concat
gulp.task('compileSass', ()=>{
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
});

gulp.task('styles', ['compileSass'], ()=>{
    return gulp.src('css/global.css')
        .pipe(cleanCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'))
});

// gulp watch sass
gulp.task('watchSass', ()=>{
    
    browserSync.init({
        server: './'
    })

    gulp.watch( ([
        'sass/**/*.scss',
        'sass/circle/**/*.sass'
    ]), ['compileSass']);
})

// img optimization
gulp.task('images', ()=> {
    return gulp.src('images/*')
        .pipe(image())
        .pipe(gulp.dest('dist/content'))

})



// clean
gulp.task('clean', ()=>{
    del(['dist', 'js/all*.js*', 'css/global.css*']);
});

// build
gulp.task('build', [
    'scripts',
    'styles',
    'images'
], ()=>{
    return gulp.src([
        'icons/*',
        'index.html'
    ], {base: './'})
        .pipe(gulp.dest('dist'))
});

//

gulp.task('serve', ['watchSass']);

gulp.task('default', ['clean', 'serve'], ()=>{
    gulp.start('build');
})