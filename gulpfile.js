var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	fileInclude = require('gulp-file-include'),
	sourcemaps = require('gulp-sourcemaps'),
    csslint = require('gulp-csslint'),
    lessReporter = require('gulp-csslint-less-reporter'),
    jshint = require('gulp-jshint'),
	del = require('del'),
	crypto = require('crypto'),
	outputFolder = 'public',
	currentTS = '',
	isProductionBuild = !!argv.prod;
	
function hash(str, postfix) {
	postfix = postfix || '';
	return crypto.createHash('md5').update(str + postfix).digest('hex');
}

var paths = {

    scriptsGlobal: [
        './node_modules/routerjs/src/router.js',
        './node_modules/js-cookie/src/js.cookie.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/jquery_lazyload/jquery.lazyload.js',
        './node_modules/jquery-textfill/source/jquery.textfill.js',
        './src/scripts/jquery/plugins/jquery.countdown360.js'
    ],
    
    scriptsApp : [
        './config.js',
        './src/scripts/myflix/index.js',
        './src/scripts/myflix/utils.js',
        './src/scripts/myflix/router.js',
        './src/scripts/myflix/movies/index.js',
        './src/scripts/myflix/movies/topbar.js',
        './src/scripts/myflix/movies/items.js',
        './src/scripts/myflix/movies/search.js',
        './src/scripts/myflix/movies/genres.js',
        './src/scripts/myflix/movies/item.js'
    ],
    
    styles : [
        './node_modules/normalize.css/normalize.css',
        './node_modules/font-awesome/css/font-awesome.css',
        './src/styles/jwplayer-flat-skin/flat.css',
        './src/styles/myflix/fonts.css',
        './src/styles/myflix/utils.less',
        './src/styles/myflix/basic.less',
        './src/styles/myflix/topbar.less',
        './src/styles/myflix/left-sidebar.less',
        './src/styles/myflix/middle-content.less',
        './src/styles/myflix/single-content.less'
    ],
    
    html : [
        './src/html/index.html'
    ],
  
    htmlPartials : [
        './src/html/partials/*.html'
    ],
    
    jwPlayer : [
        './src/scripts/jwplayer/bin-release/*.swf',
        './src/scripts/jwplayer/bin-release/jwplayer.js',
        './src/scripts/jwplayer/bin-release/polyfills.base64.js',
        './src/scripts/jwplayer/bin-release/polyfills.promise.js',
        './src/scripts/jwplayer/bin-release/provider.youtube.js'
    ],
    
    icons : [
        './src/icons/*'   
    ],
    
    fonts : [
        './node_modules/font-awesome/fonts/*',
        './src/styles/jwplayer-flat-skin/fonts/*',
        './src/fonts/*' 
    ]
    
};

gulp.task('clean-all', function() {
    return del.sync([
        './' + outputFolder + '/files',
        './' + outputFolder + '/index.html'
    ]);	
});

gulp.task('set-currentTS', function() {
    return currentTS = '' + new Date().valueOf();
});

gulp.task('lint-scripts', function() { 
    return gulp.src(paths.scriptsApp)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('gen-scripts', function() { 
    return gulp.src(paths.scriptsGlobal.concat(paths.scriptsApp))
       .pipe(gulpif(!isProductionBuild, sourcemaps.init()))
       .pipe(concat(hash(currentTS, 'js') + '.js'))
       .pipe(gulpif(isProductionBuild, uglify()))
       .on('error', function(err) {
          console.error("\n==================\n" + 'UglifyJS Error: ', err.message + "\n==================\n");
          this.emit('end');
       })
       .pipe(gulpif(!isProductionBuild, sourcemaps.write('.')))
       .pipe(replace('var myFlix={};', 'var myFlix={};myFlix.releaseDate=\'' + new Date() + '\';'))
       .pipe(gulp.dest('./' + outputFolder + '/files/scripts'));
});

gulp.task('lint-styles', function() {
    return gulp.src(['./src/styles/myflix/*'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(csslint())
        .pipe(lessReporter());
});

gulp.task('gen-styles', function() {
    return gulp.src(paths.styles)
        .pipe(concat(hash(currentTS, 'css') + '.css'))
        .pipe(less())
        .pipe(gulpif(isProductionBuild, minifyCSS({keepSpecialComments:0})))
        .pipe(gulp.dest('./' + outputFolder + '/files/styles'));
});

gulp.task('copy-jw-player', function() {
    return gulp.src(paths.jwPlayer)
        .pipe(gulp.dest('./' + outputFolder + '/files/scripts'));
});

gulp.task('copy-icons', function() {
    return gulp.src(paths.icons)
        .pipe(rename('icons/' + hash(currentTS, 'ico') + '.ico'))
        .pipe(gulp.dest('./' + outputFolder + '/files'));
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./' + outputFolder + '/files/fonts'));
});

gulp.task('gen-index-html', function() {
    return gulp.src(paths.html)
        .pipe(fileInclude())
        .pipe(gulpif(isProductionBuild, minifyHTML({empty:true, spare:true, quotes:true})))
        .pipe(replace(/<head>/, '<head><link rel="stylesheet" type="text/css" href="./files/styles/' + hash(currentTS, 'css') + '.css" /><script type="text/javascript" src="./files/scripts/jwplayer.js"></script><script type="text/javascript" src="./files/scripts/' + hash(currentTS, 'js') + '.js"></script><link rel="shortcut icon" href="./files/icons/' + hash(currentTS, 'ico') + '.ico" />'))
        .pipe(gulp.dest('./' + outputFolder));
});


gulp.task('all', ['clean-all', 'set-currentTS', 'lint-scripts',  'gen-scripts', 'lint-styles', 'gen-styles', 'copy-icons', 'copy-jw-player', 'copy-fonts', 'gen-index-html'], function() {
	return true;
});

gulp.task('watch', function() {
	gulp.watch((paths.scriptsGlobal).concat(paths.scriptsApp, paths.html, paths.htmlPartials, paths.styles, paths.fonts, paths.jwPlayer ,paths.icons), ['all']);
});

gulp.task('default', ['all']);
