import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import {join} from 'path';
import {APP_SRC, ASSETS_SRC, APP_DEST, APP_PATH} from '../../config';
const plugins = <any>gulpLoadPlugins();

function processAssets() {
  return gulp.src([
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts'),
    '!' + join(APP_SRC, '**', '*.html'),
    // Angle Start
    '!' + join(APP_SRC, '**', '*.scss'),
    '!' + join(ASSETS_SRC, 'scss'),
    '!' + join(ASSETS_SRC, 'scss', '**')
    // Angle End
  ])
    .pipe(gulp.dest(APP_DEST));
}

function processTemplates() {
  return gulp.src([
    join(APP_SRC, '**', '*.html')
  ])
    .pipe(plugins.replace('[BASE]', join(APP_PATH, APP_DEST)))
    .pipe(gulp.dest(APP_DEST));
}

export = () => merge(processAssets(), processTemplates());
