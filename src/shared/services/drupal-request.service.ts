import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/share';
import {DrupalStateService} from './drupal-state.service';
import {contentHeaders} from '../../shared/headers';

@Injectable()
export class DrupalRequestService {

  constructor(private http: Http, private drupalStateService: DrupalStateService) {
    this.http = http;
    this.drupalStateService = drupalStateService;
  }

  public get(url: string) {
    url = this.drupalStateService.getPath() + url;
    return this.http.get(url, { headers: contentHeaders }).share().map(res => res.json());
  }

  public getHal(url: string) {
    url = this.drupalStateService.getPath() + url + '?_format=hal_json';
    return this.http.get(url, { headers: contentHeaders }).share().map(res => res.json());
  }

  public post(url: string, body: any) {
    url = this.drupalStateService.getPath() + url;
    body = JSON.stringify(body);
    return this.http.post(url, body, { headers: contentHeaders }).share().map(res => res.json());
  }

}
