import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthDirective} from '../../shared/directives/authenticated.directive';

@Component({
  selector: 'sd-navbar',
  moduleId: module.id,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, AuthDirective]
})
export class NavbarComponent {}
