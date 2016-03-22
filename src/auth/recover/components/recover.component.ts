import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {DrupalUserService} from '../../../shared/services/drupal-user.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'sd-recover',
  moduleId: module.id,
  templateUrl: './recover.component.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, NgClass]
})
export class RecoverComponent {
  submitted = false;
  success = false;
  model = { name: 'augustashh' };
  constructor(public router: Router, public drupalUserService: DrupalUserService, private sweetAlert2Service: AlertService) { }

  /*
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  onSubmit(): boolean {
    this.submitted = true;

    (<any>this.drupalUserService.recover)(this.model.name).subscribe(
      (response: any) => {
        switch (response.code) {
          case 200:
            this.sweetAlert2Service.success('Success', response.message.status[0]);
            this.success = true;
            break;
          case 401:
            this.showMessage(response.error.name);
            break;
          default:
            this.showMessage();
            break;
        }
      },
      (error: any) => {
        this.showMessage(error.text());
      }
    );
    return false;
  }

  showMessage(message?: string): boolean {
    this.submitted = false;
    message = message || 'There was a problem. Please try again.';
    this.sweetAlert2Service.error('Error', message);
    return true;
  }
}
