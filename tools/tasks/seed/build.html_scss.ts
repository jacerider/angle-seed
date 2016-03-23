import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import {join, normalize} from 'path';
import {
  APP_DEST,
  APP_PATH,
  APP_SRC,
  TMP_DIR,
  ENV,
  CSS_PROD_BUNDLE,
  SCSS_INCLUDE_PATHS,
  SCSS_DEPENDENCIES,
  SCSS_COMPATIBILITY,
  SCSS_LINT
} from '../../config';
const plugins = <any>gulpLoadPlugins();

const isProd = ENV === 'prod';

function prepareTemplates() {
  return gulp.src(join(APP_SRC, '**', '*.html'))
    // Angle Start
    .pipe(plugins.replace('[BASE]', join(APP_PATH, APP_DEST)))
    // Angle End
    .pipe(gulp.dest(TMP_DIR));
}

function processComponentScss() {
  let scss_components = [
    join(APP_SRC, '**', '*.scss'),
    '!' + join(APP_SRC, 'assets', '**', '*.scss')
  ];
  // We inject our local utilities so they can be included by internal
  // componenets.
  let scssIncludePathsWithLocal = SCSS_INCLUDE_PATHS.concat([join(normalize(join(__dirname, '../../../')), 'src/assets/scss/utils')]);
  return gulp.src(scss_components)
    .pipe(isProd ? plugins.cached('process-component-scss') : plugins.util.noop())
    .pipe(plugins.sass({
      noCache: true,
      outputStyle: 'compressed',
      includePaths: scssIncludePathsWithLocal
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: SCSS_COMPATIBILITY
    }))
    .pipe(plugins.replace('[BASE]', join(APP_PATH, APP_DEST)))
    .pipe(gulp.dest(isProd ? TMP_DIR : APP_DEST))
    .on('finish', function() {
      gulp.src(SCSS_LINT).pipe(plugins.scssLint());
    });
}

function processExternalScss() {
  return gulp.src(SCSS_DEPENDENCIES)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(isProd ? plugins.cached('process-external-scss') : plugins.util.noop())
    .pipe(plugins.sass({
      noCache: true,
      outputStyle: 'compressed',
      sourceMap: !isProd,
      includePaths: SCSS_INCLUDE_PATHS
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: SCSS_COMPATIBILITY
    }))
    .pipe(isProd ? plugins.util.noop() : plugins.sourcemaps.write('.'))
    .pipe(isProd ? plugins.concat(CSS_PROD_BUNDLE) : plugins.util.noop())
    .pipe(gulp.dest(isProd ? `${TMP_DIR}/css` : join(APP_DEST, 'assets')))
    .on('finish', function() {
      gulp.src(SCSS_LINT).pipe(plugins.scssLint());
    });
}

export = () => merge(processComponentScss(), prepareTemplates(), processExternalScss());
