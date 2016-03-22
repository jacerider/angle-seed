import {Component} from 'angular2/core';

@Component({
  selector: 'sd-footer',
  moduleId: module.id,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  date = new Date();
  year = this.date.getFullYear();
}
