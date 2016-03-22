import { ElementRef, DynamicComponentLoader, Directive } from 'angular2/core';
import { Router, RouterOutlet, ComponentInstruction } from 'angular2/router';
import { DrupalStateService } from '../../shared/services/drupal-state.service';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  private router: Router;

  // Routes that only someone who IS NOT logged into the site can access.
  private loggedOutRoutes: any = ['user/login', 'user/signup', 'user/password'];
  // Routes that only someone who IS logged in can access.
  private loggedInRoutes: any = ['user/logout'];

  constructor(
    _elementRef: ElementRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, nameAttr: string,
    private drupalStateService: DrupalStateService
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.router = _parentRouter;
  }

  activate(instruction: ComponentInstruction) {
    if (this._canActivate(instruction.urlPath)) {
      return super.activate(instruction);
    }
    return super.deactivate(instruction);
  }

  _canActivate(url: any) {
    if (url && this.loggedOutRoutes.indexOf(url) !== -1 && this.drupalStateService.isAuthenticated()) {
      this.router.navigate(['Home']);
      return false;
    }
    if (url && this.loggedInRoutes.indexOf(url) !== -1 && !this.drupalStateService.isAuthenticated()) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }
}
