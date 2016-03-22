import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DrupalUserService} from '../../../shared/services/drupal-user.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'sd-logout',
  moduleId: module.id,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  message = '';

  constructor(public router: Router, public drupalUserService: DrupalUserService, private sweetAlert2Service: AlertService) {
    this.message = '';

    (<any>this.drupalUserService.logout)().subscribe(
      (response: any) => {
        switch (response.code) {
          case 200:
            this.sweetAlert2Service.success('Success', 'You have been successfully logged out.');
            this.router.parent.navigateByUrl('/');
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

  }

  showMessage(message?: string): boolean {
    message = message || 'There was a problem. Please try again.';
    this.sweetAlert2Service.error('Error', message);
    return true;
  }
}
