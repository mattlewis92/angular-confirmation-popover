import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'rxjs';
import {
  Component,
  ViewChild,
  ComponentRef
} from '@angular/core';
import {
  describe,
  it,
  expect,
  beforeEachProviders,
  beforeEach,
  inject,
  async,
  setBaseTestProviders,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';
import {
  Confirm,
  ConfirmOptions,
  Position,
  Focus
} from './../angular2-bootstrap-confirm';
import {ConfirmPopover} from './../src/confirmPopover.component';

const spyOn: Function = window['spyOn'];

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

class MockPositionService implements Position {

  positionElements(hostEl: any, targetEl: any, positionStr: any, appendToBody: any): any {
    return {
      top: 20,
      left: 40
    };
  }

}

describe('bootstrap confirm', () => {

  describe('Confirm directive', () => {

    @Component({
      directives: [Confirm, Focus],
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
          cancelButtonType="default"
          [popoverClass]="popoverClass"
          [focusButton]="focusButton"
          [hideConfirmButton]="hideConfirmButton"
          [hideCancelButton]="hideCancelButton"
          [isDisabled]="isDisabled"
          [(isOpen)]="isOpen"
          [appendToBody]="appendToBody">
          Show popover
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
      focusButton: string;
      hideConfirmButton: boolean = false;
      hideCancelButton: boolean = false;
      isDisabled: boolean = false;
      isOpen: boolean;
      popoverClass: string = 'my-class';
      appendToBody: boolean = false;
    }

    beforeEachProviders(() => [
      {provide: Position, useClass: MockPositionService},
      ConfirmOptions
    ]);

    let builder: TestComponentBuilder,
      createPopoverContainer: Function,
      clickFixture: Function,
      createPopover: Function;
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
      createPopoverContainer = (): Promise<ComponentFixture<TestCmp>> => {
        return builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
          fixture.detectChanges();
          clickFixture = (): void => {
            fixture.nativeElement.querySelector('button').click();
          };
          return fixture;
        });
      };

      createPopover = (): Promise<ComponentRef<ConfirmPopover>> => {
        return createPopoverContainer().then((fixture) => {
          clickFixture();
          return fixture.componentInstance.confirm.popover;
        }).then((popover: ComponentRef<ConfirmPopover>) => {
          popover.changeDetectorRef.detectChanges();
          return popover;
        });
      };

    }));

    it('should show a popover when the element is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        const showPopover: Function = spyOn(confirm, 'showPopover');
        expect(confirm.popover).toBeFalsy();
        clickFixture();
        expect(showPopover).toHaveBeenCalled();
        expect(confirm.popover).toBeDefined();
      });
    }));

    it('should hide the popover when the element is clicked if the popover is open', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = spyOn(confirm, 'hidePopover');
        clickFixture();
        expect(hidePopover).toHaveBeenCalled();
      });
    }));

    it('should hide the popover when the parent component is destroyed', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        const hidePopover: Function = spyOn(confirm, 'hidePopover');
        fixture.destroy();
        expect(hidePopover).toHaveBeenCalled();
      });
    }));

    it('should hide the popover when the confirm button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = spyOn(confirm, 'hidePopover');
        confirm.popover.then(popover => {
          popover.changeDetectorRef.detectChanges();
          popover.location.nativeElement.querySelectorAll('button')[0].click();
          expect(hidePopover).toHaveBeenCalled();
        });
      });
    }));

    it('should hide the popover when the cancel button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = spyOn(confirm, 'hidePopover');
        confirm.popover.then(popover => {
          popover.changeDetectorRef.detectChanges();
          popover.location.nativeElement.querySelectorAll('button')[1].click();
          expect(hidePopover).toHaveBeenCalled();
        });
      });
    }));

    it('should allow the popover title to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelector('.popover-title').innerHTML).toBe('Are you sure?');
      });
    }));

    it('should allow the popover description to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelector('.popover-content > p').innerHTML)
          .toEqual('Are you really <b>sure</b> you want to do this?');
      });
    }));

    it('should allow the confirm button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0].innerHTML)
          .toEqual('Yes <i class="glyphicon glyphicon-ok"></i>');
      });
    }));

    it('should allow the cancel button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1].innerHTML)
          .toEqual('No <i class="glyphicon glyphicon-remove"></i>');
      });
    }));

    it('should allow the confirm button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0].classList.contains('btn-danger')).toBe(true);
      });
    }));

    it('should allow the cancel button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1].classList.contains('btn-default')).toBe(true);
      });
    }));

    it('should allow the placement to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0].classList.contains('popover-left')).toBe(true);
      });
    }));

    it('should a custom class to be set on the popover', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0].classList.contains('my-class')).toBe(true);
      });
    }));

    it('should position the popover according to the coordinates given by the position service', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0].style.top).toEqual('20px');
        expect(popover.location.nativeElement.children[0].style.left).toEqual('40px');
      });
    }));

    it('should re-position the popover when the window resizes', async(() => {
      createPopoverContainer().then((fixture: ComponentFixture<TestCmp>) => {
        spyOn(fixture.componentInstance.confirm, 'positionPopover');
        window.dispatchEvent(new Event('resize'));
        expect(fixture.componentInstance.confirm.positionPopover).toHaveBeenCalled();
      });
    }));

    it('should not focus either button by default', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.contains(document.activeElement)).toBeFalsy();
      });
    }));

    it('should focus the confirm button', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.focusButton = 'confirm';
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).toEqual(document.activeElement);
      });
    }));

    it('should focus the confirm button', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.focusButton = 'cancel';
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button')[1]).toEqual(document.activeElement);
      });
    }));

    it('should hide the confirm button', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.hideConfirmButton = true;
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button').length).toEqual(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0].classList.contains('btn-default')).toBe(true);
      });
    }));

    it('should hide the cancel button', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.hideCancelButton = true;
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button').length).toEqual(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0].classList.contains('btn-danger')).toBe(true);
      });
    }));

    it('should disable the popover from opening', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isDisabled = true;
        fixture.detectChanges();
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        expect(confirm.popover).toBeFalsy();
      });
    }));

    it('should open the popover when isOpen is set to true', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm).toBeTruthy();
      });
    }));

    it('should close the popover when isOpen is set to false', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture]) => {
        spyOn(fixture.componentInstance.confirm, 'hidePopover');
        fixture.componentInstance.isOpen = false;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm.hidePopover).toHaveBeenCalled();
      });
    }));

    it('should call the confirm callback when the confirm button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect(fixture.componentInstance.confirmClicked).toEqual(false);
        popover.location.nativeElement.querySelectorAll('button')[0].click();
        expect(fixture.componentInstance.confirmClicked).toEqual(true);
      });
    }));

    it('should call the cancel callback when the cancel button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect(fixture.componentInstance.cancelClicked).toEqual(false);
        popover.location.nativeElement.querySelectorAll('button')[1].click();
        expect(fixture.componentInstance.cancelClicked).toEqual(true);
      });
    }));

    it('should initialise isOpen to false', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.detectChanges();
        setTimeout(() => { // let isOpenChange be called with false
          expect(fixture.componentInstance.isOpen).toEqual(false);
        });
      });
    }));

    it('should set isOpen to true when the popover is opened', async(() => {
      createPopoverContainer().then((fixture) => {
        setTimeout(() => { // let isOpenChange be called with false
          clickFixture();
          setTimeout(() => {
            expect(fixture.componentInstance.isOpen).toEqual(true);
          });
        });
      });
    }));

    it('should set isOpen to false when the popover is closed', async(() => {
      createPopoverContainer().then((fixture) => {
        setTimeout(() => { // let isOpenChange be called with false
          clickFixture();
          setTimeout(() => { // ugly set timeouts are required because isOpen is async
            expect(fixture.componentInstance.isOpen).toEqual(true);
            clickFixture();
            setTimeout(() => {
              expect(fixture.componentInstance.isOpen).toEqual(false);
            });
          });
        });
      });
    }));

    it('should not append the popover to the document body', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentRef.instance.appendToBody = false;
        fixture.detectChanges();
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0].classList.contains('popover'))
          .toBe(false);
        expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).toBeTruthy();
      });
    }));

    it('should append the popover to the document body', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentRef.instance.appendToBody = true;
        fixture.detectChanges();
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0].classList.contains('popover'))
          .toBe(true);
        expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).toBeFalsy();
      });
    }));

    it('should allow a custom template to be set', async(() => {

      builder.overrideTemplate(TestCmp, `
        <template #customTemplate let-options="options">
          <div [class]="'popover ' + options.placement" style="display: block">
            <div class="arrow"></div>
            <h3 class="popover-title">{{ options.title }}</h3>
            <div class="popover-content">
               <p [innerHTML]="options.message"></p>
               <my-custom-element>Custom template</my-custom-element>
               <button mwl-focus [focusOn]="options.focusButton === 'confirm'">Confirm</button>
            </div>
          </div>
        </template>
        <button
          mwl-confirm
          title="My Title"
          message="My Message"
          placement="right"
          focusButton="confirm"
          [customTemplate]="customTemplate">
          Show popover
        </button>
      `).createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').click();
        return fixture.componentInstance.confirm.popover;
      }).then((popover: ComponentRef<ConfirmPopover>) => {
        popover.changeDetectorRef.detectChanges();
        const popoverElm: HTMLElement = popover.location.nativeElement.children[0];
        expect(popoverElm.querySelector('.popover-title').innerHTML).toEqual('My Title');
        expect(popoverElm.querySelector('.popover-content > p').innerHTML).toEqual('My Message');
        expect(popoverElm.classList.contains('right')).toBe(true);
        expect(popoverElm.querySelector('my-custom-element').innerHTML).toEqual('Custom template');
        expect(popoverElm.querySelectorAll('button')[0]).toEqual(document.activeElement);
      });

    }));

  });

  describe('ConfirmOptions', () => {

    @Component({
      directives: [Confirm],
      template: `
        <button
          class="btn btn-default"
          mwl-confirm>
          Show popover
        </button>
      `
    })
    class TestCmp {
      @ViewChild(Confirm) confirm: Confirm;
    }

    const options: ConfirmOptions = new ConfirmOptions();
    options.confirmText = 'Derp';

    beforeEachProviders(() => [{
      provide: Position, useClass: MockPositionService
    }, {
      provide: ConfirmOptions,
      useValue: options
    }]);

    let builder: TestComponentBuilder;
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    it('should allow default options to be configured globally', () => {

      builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').click();
        return fixture.componentInstance.confirm.popover;
      }).then((popover) => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button')[0].innerHTML).toEqual('Derp');
      });
    });

  });

});
