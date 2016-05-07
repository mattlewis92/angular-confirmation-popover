import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'rxjs';
import {
  provide,
  Component,
  ViewChild
} from '@angular/core';
import {
  describe,
  it,
  expect,
  beforeEachProviders,
  beforeEach,
  inject,
  async,
  setBaseTestProviders
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';
import {
  Confirm,
  ConfirmOptions,
  PositionService
} from './../angular2-bootstrap-confirm';

const spyOn: Function = window['spyOn'];

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

class MockPositionService implements PositionService {

  positionElements(hostEl: any, targetEl: any, positionStr: any, appendToBody: any): any {
    return {
      top: 20,
      left: 40
    };
  }

}

@Component({
  directives: [Confirm],
  template: `
    <button
      class="btn btn-default"
      mwl-confirm
      [title]="title"
      [message]="message"
      [confirmText]="confirmText"
      [cancelText]="cancelText"
      [placement]="placement"
      (confirm)="confirmClicked = true"
      (cancel)="cancelClicked = true"
      confirmButtonType="danger"
      cancelButtonType="default">
      Show on {{ placement }}
    </button>
  `
})
class TestCmp {
  @ViewChild(Confirm) confirm: Confirm;
  placement: string = 'left';
  title: string = 'Are you sure?';
  message: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class=\'glyphicon glyphicon-ok\'></i>';
  cancelText: string = 'No <i class=\'glyphicon glyphicon-remove\'></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
}

describe('bootstrap confirm', () => {

  beforeEachProviders(() => [
    provide(PositionService, {useClass: MockPositionService}),
    provide(ConfirmOptions, {
      useFactory: (): ConfirmOptions => {
        return new ConfirmOptions({
          focusButton: 'confirm'
        });
      }
    })
  ]);

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should show a popover when the element is clicked', async(() => {
    builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
      fixture.detectChanges();
      const confirm: Confirm = fixture.componentInstance.confirm;
      const showPopover: Function = spyOn(confirm, 'showPopover');
      expect(confirm.popover).toBeFalsy();
      fixture.nativeElement.querySelector('button').click();
      expect(showPopover).toHaveBeenCalled();
      expect(confirm.popover).toBeDefined();
    });
  }));

});