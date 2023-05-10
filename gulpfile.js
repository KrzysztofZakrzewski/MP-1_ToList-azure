const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');
const kit = require('gulp-kit');

const paths = {
	html: './html/**/*kit',
	sassSrc: './src/sass/**/*.scss',
	jsSrc: './src/js/*.js',
	imgSrc: './src/images/*',
	allDist: './dist/*',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/images',
};

function sassCompiler(done) {
	const plugins = [autoprefixer(), cssnano()];
	src(paths.sassSrc)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(
			rename({
				suffix: '.mini',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function javaScriptCompiler(done) {
	src(paths.jsSrc)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.mini',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

function createFordersStructure(done) {
	src('*.*', { read: false })
		.pipe(dest('./html'))
		.pipe(dest('./src/sass/'))
		.pipe(dest('./src/js/'))
		.pipe(dest('./src/images/'))
		.pipe(dest('./dist/'));
	done();
}

function convertImage(done) {
	src(paths.imgSrc).pipe(imagemin()).pipe(dest(paths.imgDest));
	done();
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'));
	done();
}

function cleanDistFolders(done) {
	src(paths.allDist, { read: false }).pipe(clean());
	done();
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	done();
}

function wachForChanges(done) {
	watch('*.html').on('change', reload);
	watch(
		[paths.html, paths.sassSrc, paths.jsSrc],
		parallel(handleKits, javaScriptCompiler, sassCompiler)
	).on('change', reload);
	watch([paths.imgSrc], parallel(covertImage)).on('change', reload);
	done();
}

const allFunctionsForSassJsConvertImages = parallel(
	handleKits,
	sassCompiler,
	javaScriptCompiler,
	convertImage
);

exports.createFordersStructure = createFordersStructure;

exports.cleanDistFolders = cleanDistFolders;

exports.default = series(
	allFunctionsForSassJsConvertImages,
	startBrowserSync,
	wachForChanges
);
