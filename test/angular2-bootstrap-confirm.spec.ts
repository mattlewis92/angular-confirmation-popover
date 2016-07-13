import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'rxjs';
import {
  Component,
  ViewChild,
  ComponentRef
} from '@angular/core';
import {
  inject,
  async,
  setBaseTestProviders,
  TestComponentBuilder,
  ComponentFixture,
  addProviders
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
import {expect, use} from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiDom from 'chai-dom';
import {ConfirmPopover} from './../src/confirmPopover.component';

use(sinonChai);
use(chaiDom);

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

class MockPosition implements Position {

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
      precompile: [ConfirmPopover],
      template: `
        <button
          class="btn btn-default"
          mwlConfirm
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
      confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
      cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
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

    beforeEach(() => {
      addProviders([
        {provide: Position, useClass: MockPosition},
        ConfirmOptions
      ]);
    });

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
        const showPopover: Function = sinon.spy(confirm, 'showPopover');
        expect(confirm.popover).not.to.be.ok;
        clickFixture();
        expect(showPopover).to.have.been.calledOnce;
        expect(confirm.popover).to.be.ok;
      });
    }));

    it('should hide the popover when the element is clicked if the popover is open', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
        clickFixture();
        expect(hidePopover).to.have.been.calledOnce;
      });
    }));

    it('should hide the popover when the parent component is destroyed', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
        fixture.destroy();
        expect(hidePopover).to.have.been.calledOnce;
      });
    }));

    it('should hide the popover when the confirm button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
        confirm.popover.changeDetectorRef.detectChanges();
        confirm.popover.location.nativeElement.querySelectorAll('button')[0].click();
        expect(hidePopover).to.have.been.calledOnce;
      });
    }));

    it('should hide the popover when the cancel button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
        confirm.popover.changeDetectorRef.detectChanges();
        confirm.popover.location.nativeElement.querySelectorAll('button')[1].click();
        expect(hidePopover).to.have.been.calledOnce;
      });
    }));

    it('should allow the popover title to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelector('.popover-title')).to.have.html('Are you sure?');
      });
    }));

    it('should allow the popover description to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelector('.popover-content > p'))
          .to.have.html('Are you really <b>sure</b> you want to do this?');
      });
    }));

    it('should allow the confirm button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0])
          .to.have.html('Yes <i class="glyphicon glyphicon-ok"></i>');
      });
    }));

    it('should allow the cancel button text to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1])
          .to.have.html('No <i class="glyphicon glyphicon-remove"></i>');
      });
    }));

    it('should allow the confirm button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-danger');
      });
    }));

    it('should allow the cancel button type to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.querySelectorAll('button')[1]).to.have.class('btn-default');
      });
    }));

    it('should allow the placement to be customised', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0]).to.have.class('popover-left');
      });
    }));

    it('should a custom class to be set on the popover', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0]).to.have.class('my-class');
      });
    }));

    it('should position the popover according to the coordinates given by the position service', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.children[0].style.top).to.equal('20px');
        expect(popover.location.nativeElement.children[0].style.left).to.equal('40px');
      });
    }));

    it('should re-position the popover when the window resizes', async(() => {
      createPopoverContainer().then((fixture: ComponentFixture<TestCmp>) => {
        sinon.spy(fixture.componentInstance.confirm, 'positionPopover');
        window.dispatchEvent(new Event('resize'));
        expect(fixture.componentInstance.confirm.positionPopover).to.have.been.calledOnce;
      });
    }));

    it('should not focus either button by default', async(() => {
      createPopover().then(popover => {
        expect(popover.location.nativeElement.contains(document.activeElement)).not.to.be.ok;
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
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.equal(document.activeElement);
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
        expect(popover.location.nativeElement.querySelectorAll('button')[1]).to.equal(document.activeElement);
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
        expect(popover.location.nativeElement.querySelectorAll('button')).to.have.length(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-default');
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
        expect(popover.location.nativeElement.querySelectorAll('button')).to.have.length(1);
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-danger');
      });
    }));

    it('should disable the popover from opening', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isDisabled = true;
        fixture.detectChanges();
        const confirm: Confirm = fixture.componentInstance.confirm;
        clickFixture();
        expect(confirm.popover).not.to.be.ok;
      });
    }));

    it('should open the popover when isOpen is set to true', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.componentInstance.isOpen = true;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm).to.be.ok;
      });
    }));

    it('should close the popover when isOpen is set to false', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture]) => {
        sinon.spy(fixture.componentInstance.confirm, 'hidePopover');
        fixture.componentInstance.isOpen = false;
        fixture.detectChanges();
        expect(fixture.componentInstance.confirm.hidePopover).to.have.been.calledOnce;
      });
    }));

    it('should call the confirm callback when the confirm button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect(fixture.componentInstance.confirmClicked).to.be.false;
        popover.location.nativeElement.querySelectorAll('button')[0].click();
        expect(fixture.componentInstance.confirmClicked).to.be.true;
      });
    }));

    it('should call the cancel callback when the cancel button is clicked', async(() => {
      createPopoverContainer().then((fixture) => {
        clickFixture();
        return Promise.all([fixture, fixture.componentInstance.confirm.popover]);
      }).then(([fixture, popover]) => {
        popover.changeDetectorRef.detectChanges();
        expect(fixture.componentInstance.cancelClicked).to.be.false;
        popover.location.nativeElement.querySelectorAll('button')[1].click();
        expect(fixture.componentInstance.cancelClicked).to.be.true;
      });
    }));

    it('should initialise isOpen to false', async(() => {
      createPopoverContainer().then((fixture) => {
        fixture.detectChanges();
        setTimeout(() => { // let isOpenChange be called with false
          expect(fixture.componentInstance.isOpen).to.be.false;
        });
      });
    }));

    it('should set isOpen to true when the popover is opened', async(() => {
      createPopoverContainer().then((fixture) => {
        setTimeout(() => { // let isOpenChange be called with false
          clickFixture();
          setTimeout(() => {
            expect(fixture.componentInstance.isOpen).to.be.true;
          });
        });
      });
    }));

    it('should set isOpen to false when the popover is closed', async(() => {
      createPopoverContainer().then((fixture) => {
        setTimeout(() => { // let isOpenChange be called with false
          clickFixture();
          setTimeout(() => { // ugly set timeouts are required because isOpen is async
            expect(fixture.componentInstance.isOpen).to.be.true;
            clickFixture();
            setTimeout(() => {
              expect(fixture.componentInstance.isOpen).to.be.false;
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
        expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0]).not.to.have.class('popover');
        expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).to.be.ok;
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
        expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0]).to.have.class('popover');
        expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).not.to.be.ok;
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
               <button [mwlFocus]="options.focusButton === 'confirm'">Confirm</button>
            </div>
          </div>
        </template>
        <button
          mwlConfirm
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
        expect(popoverElm.querySelector('.popover-title')).to.have.html('My Title');
        expect(popoverElm.querySelector('.popover-content > p')).to.have.html('My Message');
        expect(popoverElm).to.have.class('right');
        expect(popoverElm.querySelector('my-custom-element')).to.have.html('Custom template');
        expect(popoverElm.querySelectorAll('button')[0]).to.equal(document.activeElement);
      });

    }));

  });

  describe('ConfirmOptions', () => {

    @Component({
      directives: [Confirm],
      precompile: [ConfirmPopover],
      template: `
        <button
          class="btn btn-default"
          mwlConfirm>
          Show popover
        </button>
      `
    })
    class TestCmp {
      @ViewChild(Confirm) confirm: Confirm;
    }

    const options: ConfirmOptions = new ConfirmOptions();
    options.confirmText = 'Derp';

    beforeEach(() => {
      addProviders([{
        provide: Position, useClass: MockPosition
      }, {
        provide: ConfirmOptions,
        useValue: options
      }]);
    });

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
        expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.html('Derp');
      });
    });

  });

});
