import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {RouteConfig} from 'angular2/router';
import {LoggedInRouterOutlet} from '../../shared/outlets/logged-in-router.outlet';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {FooterComponent} from './footer.component';
import {HomeComponent} from '../../home/components/home.component';
import {SecureComponent} from '../../secure/components/secure.component';
import {UserComponent} from '../../user/components/user.component';
import {LoginComponent} from '../../auth/login/components/login.component';
import {LogoutComponent} from '../../auth/logout/components/logout.component';
import {RecoverComponent} from '../../auth/recover/components/recover.component';

import {DrupalStateService} from '../../shared/services/drupal-state.service';
import {DrupalUserService} from '../../shared/services/drupal-user.service';
import {DrupalRequestService} from '../../shared/services/drupal-request.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'sd-app',
  viewProviders: [HTTP_PROVIDERS, DrupalStateService, DrupalUserService, DrupalRequestService, AlertService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [LoggedInRouterOutlet, NavbarComponent, ToolbarComponent, FooterComponent]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/secure', name: 'Secure', component: SecureComponent },
  { path: '/user', name: 'UserCurrent', component: UserComponent },
  { path: '/user/:userId', name: 'User', component: UserComponent },
  { path: '/user/login', name: 'Login', component: LoginComponent },
  { path: '/user/logout', name: 'Logout', component: LogoutComponent },
  { path: '/user/password', name: 'Recover', component: RecoverComponent },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent { }
