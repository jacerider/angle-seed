import * as runSequence from 'run-sequence';
import {notifyLiveReload} from '../../utils';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {APP_SRC, SCSS_DEPENDENCIES} from '../../config';
const plugins = <any>gulpLoadPlugins();

export function watch(taskname: string) {
  return function () {
    plugins.watch([
      join(APP_SRC, '**'),
      '!' + join(APP_SRC, '**', '*.scss'),
    ], (e:any) =>
      runSequence(taskname, () => notifyLiveReload(e))
    );

    // Angle Start
    // Watch SCSS changes seperately
    plugins.watch(SCSS_DEPENDENCIES.concat([join(APP_SRC, 'assets', 'scss', '**', '*.scss')]), (e: any) =>
      runSequence('build.html_scss')
    );
    // Angle End
  };
}
