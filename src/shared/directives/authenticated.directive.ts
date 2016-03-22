import {Directive, OnDestroy, ElementRef, Input} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {DrupalStateService} from '../services/drupal-state.service';

@Directive({
  selector: '[auth]'
})
export class AuthDirective implements OnDestroy {
  private sub: any = null;
  private authOp = 'show';
  @Input() set auth(authOp: string) {
    this.authOp = authOp || this.authOp;
  }

  constructor(private drupalStateService: DrupalStateService, private router: Router, private location: Location, private el: ElementRef) {}

  ngOnInit() {

    this.action(this.drupalStateService.isAuthenticated());

    this.sub = this.drupalStateService.subscribe((val) => {
      this.action(val.authenticated);
    });
  }

  ngOnDestroy() {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }

  action(authenticated: boolean) {
    var op: any;
    if (authenticated) {
      op = this.authOp;
    } else {
      op = this.authOp === 'show' ? 'hide' : 'show';
    }
    if(op === 'show') {
      this.el.nativeElement.style.display = '';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
