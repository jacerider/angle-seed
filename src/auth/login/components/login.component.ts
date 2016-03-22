import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DrupalUserService} from '../../../shared/services/drupal-user.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'sd-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class LoginComponent {
  submitted = false;
  model = { name: 'augustash', pass: ']YUE^9JARF9Z37g'};
  constructor(private router: Router, private drupalUserService: DrupalUserService, private sweetAlert2Service: AlertService) { }

  /*
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  onSubmit(): boolean {
    this.submitted = true;

    (<any>this.drupalUserService.login)(this.model.name, this.model.pass).subscribe(
      (response: any) => {
        switch (response.code) {
          case 200:
            if(response.uid) {
              this.router.parent.navigateByUrl('/user/' + response.uid);
            } else {
              this.router.parent.navigateByUrl('/');
            }
            break;
          case 401:
            this.setMessage(response.error.name);
            break;
          default:
            this.setMessage();
            break;
        }
      },
      (error: any) => {
        this.setMessage(error.text());
      }
    );
    return false;
  }

  setMessage(message?: string): boolean {
    this.submitted = false;
    message = message || 'There was a problem. Please try again.';
    this.sweetAlert2Service.error('Error', message);
    return true;
  }
}
