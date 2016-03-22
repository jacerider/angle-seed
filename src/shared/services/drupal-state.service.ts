import {Injectable, EventEmitter} from 'angular2/core';

declare var window: any;

interface DrupalStateUser {
  uid: string;
  name: string;
  mail: string;
  roles: Array<any>;
}

@Injectable()
export class DrupalStateService {
  // @TODO: switch to RxJS Subject instead of EventEmitter
  private locationWatcher = new EventEmitter();
  private drupalSettings: any = {};
  private angleSettings: any = {};
  private authenticated: boolean = false;
  private user: DrupalStateUser;

  constructor() {
    this.drupalSettings = window.drupalSettings;
    this.angleSettings = this.drupalSettings.angled;
    this.user = this.angleSettings.user;
    this.authenticated = this.user.uid > 0;
  }

  public getPath() {
    return this.drupalSettings.path.baseUrl;
  }

  public getUser() {
    return this.user;
  }

  public setUser(user: DrupalStateUser) {
    this.user = user;
    // this.angleSettings.user: DrupalStateUser = user:
  }

  public emitAuthStatus(success: boolean) {
    this.authenticated = success;
    this.locationWatcher.emit({ success: success, authenticated: this.authenticated });
  }

  public subscribe(onNext:(value:any) => void, onThrow?:(exception:any) => void, onReturn?:() => void) {
    return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
  }

  public isAuthenticated() {
    return this.authenticated;
  }
}
