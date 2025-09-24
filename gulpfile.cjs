'use strict';

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

function buildStyles() {
    return src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('./src/assets'))
}

function serve() {
    watch('./src/sass/**/*.scss', buildStyles);
}

exports.buildStyles = buildStyles;
exports.serve = serve;
exports.default = series(buildStyles, serve);