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
  Position
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
          cancelButtonType="default"
          [focusButton]="focusButton"
          [hideConfirmButton]="hideConfirmButton"
          [hideCancelButton]="hideCancelButton"
          [isDisabled]="isDisabled"
          [(isOpen)]="isOpen">
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
    }

    beforeEachProviders(() => [
      provide(Position, {useClass: MockPositionService}),
      ConfirmOptions
    ]);

    let builder: TestComponentBuilder,
      createPopoverContainer,
      clickFixture,
      createPopover;
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
        expect(popover.location.nativeElement.querySelector('.popover-title')).toHaveText('Are you sure?');
      });
    }));

    it('should allow the popover description to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelector('.popover-content > p').innerHTML).toEqual('Are you really <b>sure</b> you want to do this?');
      });
    }));

    it('should allow the confirm button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0].innerHTML).toEqual('Yes <i class="glyphicon glyphicon-ok"></i>');
      });
    }));

    it('should allow the cancel button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1].innerHTML).toEqual('No <i class="glyphicon glyphicon-remove"></i>');
      });
    }));

    it('should allow the confirm button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).toHaveCssClass('btn-danger');
      });
    }));

    it('should allow the cancel button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1]).toHaveCssClass('btn-default');
      });
    }));

    it('should allow the placement to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0]).toHaveCssClass('popover-left');
      });
    }));

    it('should position the popover according to the coordinates given by the position service', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0].style.top).toEqual('20px');
        expect(popover.location.nativeElement.children[0].style.left).toEqual('40px');
      });
    }));

    it('should re-position the popover when the window resizes', async(() => {
      createPopover().then(popover => {
        spyOn(popover.instance, 'positionPopover');
        window.dispatchEvent(new Event('resize'));
        expect(popover.instance.positionPopover).toHaveBeenCalled();
      });
    }));

    it('should not focus either button by default', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.contains(document.activeElement)).toBeFalsy();
      });
    }));

    it('should focus the confirm button', async(() => {
      return createPopoverContainer().then((fixture) => {
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
      return createPopoverContainer().then((fixture) => {
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
      return createPopoverContainer().then((fixture) => {
        fixture.componentInstance.hideConfirmButton = true;
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button').length).toEqual(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).toHaveCssClass('btn-default');
      });
    }));

    it('should hide the cancel button', async(() => {
      return createPopoverContainer().then((fixture) => {
        fixture.componentInstance.hideCancelButton = true;
        fixture.detectChanges();
        clickFixture();
        return fixture.componentInstance.confirm.popover;
      }).then(popover => {
        popover.changeDetectorRef.detectChanges();
        expect(popover.location.nativeElement.querySelectorAll('button').length).toEqual(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).toHaveCssClass('btn-danger');
      });
    }));

    it('should disable the popover from opening', async(() => {
      return createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isDisabled = true;
        fixture.detectChanges();
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        expect(confirm.popover).toBeFalsy();
      })
    }));

    it('should open the popover when isOpen is set to true', async(() => {
      return createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm).toBeTruthy();
      })
    }));

    it('should close the popover when isOpen is set to false', async(() => {
      return createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture]) => {
        spyOn(fixture.componentInstance.confirm, 'hidePopover');
        fixture.componentInstance.isOpen = false;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm.hidePopover).toHaveBeenCalled();
      })
    }));

    // outputs don't appear to fire in unit tests for some reason

    /*xit('should initialise isOpen to false', () => {});

    xit('should set isOpen to true when the popover is opened', async(() => {}));

    xit('should set isOpen to false when the popover is closed', async(() => {}));

    xit('should call the confirm callback when the confirm button is clicked', async(() => {
      return createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        popover.location.nativeElement.querySelectorAll('button')[0].click();
        popover.changeDetectorRef.detectChanges();
        fixture.detectChanges();
        expect(fixture.componentInstance.confirmClicked).toEqual(true);
      });
    }));

    xit('should call the cancel callback when the cancel button is clicked', async(() => {}));

    xit('should call the cancel callback when the cancel button is clicked', async(() => {}));*/

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

    beforeEachProviders(() => [
      provide(Position, {useClass: MockPositionService}),
      provide(ConfirmOptions, {
        useFactory: () => {
          const options = new ConfirmOptions();
          options.confirmText = 'Derp';
          return options;
        }
      })
    ]);

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

  describe('Position', () => {

    it('should throw when constructed', () => {
      expect(() => new Position()).toThrow();
    });

  });

});