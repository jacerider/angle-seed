import {Component} from 'angular2/core';
import {DrupalUserService} from '../../shared/services/drupal-user.service';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
  selector: 'sd-user',
  moduleId: module.id,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class UserComponent {
  userId: any;
  user: Object;
  loaded: boolean = false;
  error: string = '';

  constructor(public params: RouteParams, public drupalUserService: DrupalUserService) {
    this.userId = params.get('userId');
    if(this.userId === null) {
      this.userId = drupalUserService.getCurrent().uid;
    }
    if (this.userId > 0) {
      drupalUserService.load(this.userId).subscribe(
        (response: any) => {
          this.loaded = true;
          this.user = response;
        },
        (error: any) => {
          if (error.text) {
            error = JSON.parse(error.text());
            this.error = error.message;
          } else {
            this.error = 'An unknown error has occurred.';
          }
        }
      );
    }
  }
}
