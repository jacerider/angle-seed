import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import * as slash from 'slash';
import {templateLocals} from '../../utils';
import {
  APP_SRC,
  APP_DEST,
  APP_PATH,
  APP_BASE,
  CSS_DEST,
  JS_DEST,
  CSS_PROD_BUNDLE,
  JS_PROD_APP_BUNDLE,
  JS_PROD_SHIMS_BUNDLE
} from '../../config';
const plugins = <any>gulpLoadPlugins();

export = () => {
  return gulp.src(join(APP_SRC, 'index.html'))
    .pipe(injectJs())
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
}

function inject(...files: Array<string>) {
  return plugins.inject(gulp.src(files, { read: false }), {
    files,
    transform: transformPath()
  });
}

function injectJs() {
  return inject(join(JS_DEST, JS_PROD_SHIMS_BUNDLE), join(JS_DEST, JS_PROD_APP_BUNDLE));
}

function injectCss() {
  return inject(join(CSS_DEST, CSS_PROD_BUNDLE));
}

function transformPath() {
  return function(filepath: string) {
    // Angle Start
    arguments[0] = join(APP_PATH, APP_BASE, filepath) + `?${Date.now()}`;
    // Angle End
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
