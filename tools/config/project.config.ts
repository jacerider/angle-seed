import {join} from 'path';
import {SeedConfig} from './seed.config';
import {ENVIRONMENTS} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  SCSS_INCLUDE_PATHS = [
    require('bourbon').includePaths,
    `${this.NODE_MODULES_PATH}node_modules/foundation-sites/scss`
  ];

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: 'sweetalert2/dist/sweetalert2.min.js', inject: 'libs' },
      { src: 'sweetalert2/dist/sweetalert2.css', inject: true, vendor: true }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.APP_ASSETS = [
      { src: `${this.ASSETS_SRC}/css/main.css`, inject: true, vendor: true, env: ENVIRONMENTS.DEVELOPMENT },
    ];
  }
}
