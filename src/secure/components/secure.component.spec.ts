import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {SecureComponent} from './secure.component';

export function main() {
  describe('Secure component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then((rootTC) => {
            let secureDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(secureDOMEl, 'h2')[0].textContent).toEqual('Secure');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [SecureComponent],
  template: '<sd-secure></sd-secure>'
})
class TestComponent {}
