import {Injectable} from 'angular2/core';
import {DrupalRequestService} from './drupal-request.service';
import {DrupalStateService} from './drupal-state.service';

@Injectable()
export class DrupalUserService {
  // private users = {};

  constructor(private drupalRequestService: DrupalRequestService, private drupalStateService: DrupalStateService) { }

  getCurrent() {
    return this.drupalStateService.getUser();
  }

  load(uid: number) {
    // if (this.users[uid] !== undefined) {
    //   return this.users[uid];
    // }
    let observable = this.drupalRequestService.getHal('user/' + uid);
    // observable.subscribe(
    //   (response: any) => {
    //     this.users[uid] = response;
    //   }
    // );
    return observable;
  }

  login(name: string, pass: string) {
    // let data = JSON.stringify({ name, pass });
    let observable = this.drupalRequestService.post('api/angled/login', { name, pass });
    observable.subscribe(
      (response: any) => {
        if(response.code === 200) {
          delete response.code;
          this.drupalStateService.setUser(response);
          this.drupalStateService.emitAuthStatus(true);
        }
      }
    );
    return observable;
  }

  logout() {
    let observable = this.drupalRequestService.get('api/angled/logout');
    observable.subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.drupalStateService.emitAuthStatus(false);
        }
      }
    );
    return observable;
  }

  recover(name: string) {
    return this.drupalRequestService.post('api/angled/recover', { name });
  }
}
