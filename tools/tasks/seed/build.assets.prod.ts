import * as gulp from 'gulp';
import {join} from 'path';
import {APP_DEST, ASSETS_SRC} from '../../config';

// TODO There should be more elegant to prevent empty directories from copying
let es: any = require('event-stream');
var onlyDirs = function(es: any) {
  return es.map(function(file: any, cb: any) {
    if (file.stat.isFile()) {
      return cb(null, file);
    } else {
      return cb();
    }
  });
};

export = () => {
  return gulp.src([
    join(ASSETS_SRC, '**'),
    '!' + join(ASSETS_SRC, '**', '*.js'),
    '!' + join(ASSETS_SRC, 'scss', '**', '*.scss')
  ])
    .pipe(onlyDirs(es))
    .pipe(gulp.dest(APP_DEST));
}
