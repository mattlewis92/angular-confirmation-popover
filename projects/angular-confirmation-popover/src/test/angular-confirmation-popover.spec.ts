/* eslint-disable @typescript-eslint/no-unused-expressions, max-classes-per-file */

import { Component, ViewChild, ComponentRef } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  flush,
  waitForAsync,
} from '@angular/core/testing';
import { ConfirmationPopoverModule } from '../public-api';
import { ConfirmationPopoverDirective } from '../lib/confirmation-popover.directive';
import { ConfirmationPopoverWindowComponent } from '../lib/confirmation-popover-window.component';
import { expect } from 'chai';
import * as sinon from 'sinon';

describe('bootstrap confirm', () => {
  describe('ConfirmationPopover directive', () => {
    @Component({
      template: `
        <button
          class="btn btn-outline-secondary"
          mwlConfirmationPopover
          [popoverTitle]="popoverTitle"
          [popoverMessage]="popoverMessage"
          [confirmText]="confirmText"
          [cancelText]="cancelText"
          [placement]="placement"
          (confirm)="confirmClicked($event)"
          (cancel)="cancelClicked($event)"
          confirmButtonType="danger"
          cancelButtonType="outline-secondary"
          [popoverClass]="popoverClass"
          [focusButton]="focusButton"
          [hideConfirmButton]="hideConfirmButton"
          [hideCancelButton]="hideCancelButton"
          [isDisabled]="isDisabled"
          [(isOpen)]="isOpen"
          [appendToBody]="appendToBody"
          [reverseButtonOrder]="reverseButtonOrder"
        >
          Show popover
        </button>
      `,
    })
    class TestComponent {
      @ViewChild(ConfirmationPopoverDirective, { static: true })
      confirm: ConfirmationPopoverDirective;
      placement: string = 'left';
      popoverTitle: string = 'Are you sure?';
      popoverMessage: string =
        'Are you really <b>sure</b> you want to do this?';
      confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
      cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
      focusButton: string;
      hideConfirmButton: boolean = false;
      hideCancelButton: boolean = false;
      isDisabled: boolean = false;
      isOpen: boolean;
      popoverClass: string = 'my-class';
      appendToBody: boolean = false;
      confirmClicked: sinon.SinonSpy = sinon.spy();
      cancelClicked: sinon.SinonSpy = sinon.spy();
      reverseButtonOrder = false;
    }

    let createPopover: () => ComponentRef<ConfirmationPopoverWindowComponent>;

    function clickFixture(fixture: ComponentFixture<TestComponent>) {
      fixture.nativeElement.querySelector('button').click();
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConfirmationPopoverModule.forRoot()],
        declarations: [TestComponent],
      });

      createPopover = (): ComponentRef<ConfirmationPopoverWindowComponent> => {
        const fixture: ComponentFixture<TestComponent> =
          TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        clickFixture(fixture);
        const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
          fixture.componentInstance.confirm.popover!;
        popover.changeDetectorRef.detectChanges();
        return popover;
      };
    });

    it('should show a popover when the element is clicked', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      const showPopover = sinon.spy(confirm, 'showPopover');
      expect(confirm.popover).not.to.be.ok;
      clickFixture(fixture);
      expect(showPopover).to.have.been.calledOnce;
      expect(confirm.popover).to.be.ok;
    });

    it('should hide the popover when the element is clicked if the popover is open', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      clickFixture(fixture);
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the parent component is destroyed', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      fixture.destroy();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the confirm button is clicked', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      confirm.popover.location.nativeElement
        .querySelectorAll('button')[0]
        .click();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the cancel button is clicked', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      confirm.popover.location.nativeElement
        .querySelectorAll('button')[1]
        .click();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when an element not inside the popover is clicked', fakeAsync(() => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      flush();
      const btn: HTMLElement = document.createElement('button');
      document.body.appendChild(btn);
      btn.click();
      flush();
      expect(hidePopover).to.have.been.calledOnce;
      btn.parentNode!.removeChild(btn);
    }));

    it('should allow the popover title to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelector('.popover-title')
      ).to.have.html('Are you sure?');
    });

    it('should allow the popover description to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelector('.popover-content > p')
      ).to.have.html('Are you really <b>sure</b> you want to do this?');
    });

    it('should allow the confirm button text to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[1]
      ).to.have.html('Yes <i class="glyphicon glyphicon-ok"></i>');
    });

    it('should allow the cancel button text to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[0]
      ).to.have.html('No <i class="glyphicon glyphicon-remove"></i>');
    });

    it('should allow the confirm button type to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[1]
      ).to.have.class('btn-danger');
    });

    it('should allow the cancel button type to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[0]
      ).to.have.class('btn-outline-secondary');
    });

    it('should allow the placement to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(popover.location.nativeElement.children[0]).to.have.class(
        'popover-left'
      );
    });

    it('should a custom class to be set on the popover', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(popover.location.nativeElement.children[0]).to.have.class(
        'my-class'
      );
    });

    it('should re-position the popover when the window resizes', fakeAsync(() => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.componentInstance.focusButton = 'confirm';
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      flush();
      const positionPopover: sinon.SinonSpy = sinon.spy(
        fixture.componentInstance.confirm as any,
        'positionPopover'
      );
      window.dispatchEvent(new Event('resize'));
      expect(positionPopover).to.have.been.calledOnce;
    }));

    it('should not focus either button by default', () => {
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        createPopover();
      expect(popover.location.nativeElement.contains(document.activeElement))
        .not.to.be.ok;
    });

    it('should focus the confirm button', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.componentInstance.focusButton = 'confirm';
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[1]
      ).to.equal(document.activeElement);
    });

    it('should focus the cancel button', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentInstance.focusButton = 'cancel';
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[0]
      ).to.equal(document.activeElement);
    });

    it('should hide the confirm button', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentInstance.hideConfirmButton = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelectorAll('button')
      ).to.have.length(1);
      expect(
        popover.location.nativeElement.querySelectorAll('button')[0]
      ).to.have.class('btn-outline-secondary');
    });

    it('should hide the cancel button', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentInstance.hideCancelButton = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelectorAll('button')
      ).to.have.length(1);
      expect(
        popover.location.nativeElement.querySelectorAll('button')[0]
      ).to.have.class('btn-danger');
    });

    it('should disable the popover from opening', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();
      const confirm: ConfirmationPopoverDirective =
        fixture.componentInstance.confirm;
      clickFixture(fixture);
      expect(confirm.popover).not.to.be.ok;
    });

    it('should open the popover when isOpen is set to true', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentInstance.isOpen = true;
      fixture.detectChanges();
      expect(fixture.componentInstance.confirm).to.be.ok;
    });

    it('should close the popover when isOpen is set to false', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      clickFixture(fixture);
      const hidePopover: sinon.SinonSpy = sinon.spy(
        fixture.componentInstance.confirm as any,
        'hidePopover'
      );
      fixture.componentInstance.isOpen = false;
      fixture.detectChanges();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should call the confirm callback when the confirm button is clicked', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(fixture.componentInstance.confirmClicked).not.to.have.been.called;
      popover.location.nativeElement.querySelectorAll('button')[1].click();
      expect(fixture.componentInstance.confirmClicked).to.have.been.calledOnce;
      expect(
        fixture.componentInstance.confirmClicked.getCall(0).args[0]
          .clickEvent instanceof MouseEvent
      ).to.be.true;
    });

    it('should call the cancel callback when the cancel button is clicked', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(fixture.componentInstance.cancelClicked).not.to.have.been.called;
      popover.location.nativeElement.querySelectorAll('button')[0].click();
      expect(fixture.componentInstance.cancelClicked).to.have.been.calledOnce;
      expect(
        fixture.componentInstance.cancelClicked.getCall(0).args[0]
          .clickEvent instanceof MouseEvent
      ).to.be.true;
    });

    it('should initialise isOpen to false', waitForAsync(() => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // let isOpenChange be called with false
        expect(fixture.componentInstance.isOpen).to.be.false;
      });
    }));

    it('should set isOpen to true when the popover is opened', waitForAsync(() => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture
        .whenStable()
        .then(() => {
          // let isOpenChange be called with false
          clickFixture(fixture);
          return fixture.whenStable();
        })
        .then(() => {
          expect(fixture.componentInstance.isOpen).to.be.true;
        });
    }));

    it('should set isOpen to false when the popover is closed', waitForAsync(() => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture
        .whenStable()
        .then(() => {
          // let isOpenChange be called with false
          clickFixture(fixture);
          return fixture.whenStable();
        })
        .then(() => {
          clickFixture(fixture);
          return fixture.whenStable();
        })
        .then(() => {
          expect(fixture.componentInstance.isOpen).to.be.false;
        });
    }));

    it('should not append the popover to the document body', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentRef.instance.appendToBody = false;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        document.body.children[document.body.children.length - 1].children[0]
      ).not.to.have.class('popover');
      expect(
        fixture.componentRef.location.nativeElement.querySelector('.popover')
      ).to.be.ok;
    });

    it('should append the popover to the document body', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentRef.instance.appendToBody = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        document.body.children[document.body.children.length - 1].children[0]
      ).to.have.class('popover');
      expect(
        fixture.componentRef.location.nativeElement.querySelector('.popover')
      ).not.to.be.ok;
    });

    it('should allow a custom template to be set', () => {
      const html: string = `
        <ng-template #customTemplate let-options="options">
          <div [class]="'popover ' + options.placement" style="display: block">
            <div class="arrow"></div>
            <h3 class="popover-title">{{ options.popoverTitle }}</h3>
            <div class="popover-content">
               <p [innerHTML]="options.popoverMessage"></p>
               <div id="customTemplate">Custom template</div>
               <button [mwlFocus]="options.focusButton === 'confirm'">Confirm</button>
            </div>
          </div>
        </ng-template>
        <button
          mwlConfirmationPopover
          popoverTitle="My Title"
          popoverMessage="My Message"
          placement="right"
          focusButton="confirm"
          [customTemplate]="customTemplate">
          Show popover
        </button>
      `;
      TestBed.overrideComponent(TestComponent, { set: { template: html } });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      const popoverElm: HTMLElement =
        popover.location.nativeElement.children[0];
      expect(popoverElm.querySelector('.popover-title')).to.have.html(
        'My Title'
      );
      expect(popoverElm.querySelector('.popover-content > p')).to.have.html(
        'My Message'
      );
      expect(popoverElm).to.have.class('right');
      expect(popoverElm.querySelector('#customTemplate')).to.have.html(
        'Custom template'
      );
      expect(popoverElm.querySelectorAll('button')[0]).to.equal(
        document.activeElement
      );
    });

    it('should reverse the button order', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.componentRef.instance.reverseButtonOrder = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelector('.confirm-btns')
      ).to.have.class('confirm-btns-reversed');
    });

    it('should add a selector to the popover window component', () => {
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      expect(popover.location.nativeElement.tagName.toLowerCase()).to.equal(
        'mwl-confirmation-popover-window'
      );
    });

    it('should allow configuring clicking outside of popover to close it', fakeAsync(() => {
      const fixture: ComponentFixture<TestComponent> = TestBed.overrideTemplate(
        TestComponent,
        `
        <button type="button"
          class="btn btn-outline-secondary"
          mwlConfirmationPopover
          [closeOnOutsideClick]="false"
        >Show Popover</button>
      `
      ).createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;
      clickFixture(fixture);

      // We will be tracking the hidePopover
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      flush();

      // Simulating clicking outside of the popup
      const btn: HTMLElement = document.createElement('button');
      document.body.appendChild(btn);
      btn.click();
      flush();

      // Popover should still be open
      expect(hidePopover).to.not.have.been.called;
      btn.parentNode!.removeChild(btn);
    }));

    it('should allow configuring clicking outside of popover globally', fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            closeOnOutsideClick: false,
          }),
        ],
      });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const confirm: any = fixture.componentInstance.confirm;

      fixture.nativeElement.querySelector('button').click();

      // We will be tracking the hidePopover
      const hidePopover = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      flush();

      // Simulating clicking outside of the popup
      const btn: HTMLElement = document.createElement('button');
      document.body.appendChild(btn);
      btn.click();
      flush();

      // Popover should still be open
      expect(hidePopover).to.not.have.been.called;
    }));
  });

  describe('ConfirmOptions', () => {
    @Component({
      template: `
        <button class="btn btn-outline-secondary" mwlConfirmationPopover>
          Show popover
        </button>
      `,
    })
    class TestComponent {
      @ViewChild(ConfirmationPopoverDirective, { static: true })
      confirm: ConfirmationPopoverDirective;
    }

    it('should allow default options to be configured globally', () => {
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            confirmText: 'Derp',
          }),
        ],
        declarations: [TestComponent],
      });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelectorAll('button')[1]
      ).to.have.html('Derp');
    });

    it('should allow the appendToBody option to be configured globally', () => {
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            appendToBody: true,
          }),
        ],
        declarations: [TestComponent],
      });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        document.body.children[document.body.children.length - 1].children[0]
      ).to.have.class('popover');
      expect(
        fixture.componentRef.location.nativeElement.querySelector('.popover')
      ).not.to.be.ok;
    });

    it('should allow the appendToBody option to be overridden locally when set to true globally', () => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <button
              class="btn btn-outline-secondary"
              mwlConfirmationPopover
              [appendToBody]="false">
              Show popover
            </button>
          `,
        },
      });
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            appendToBody: true,
          }),
        ],
        declarations: [TestComponent],
      });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        document.body.children[document.body.children.length - 1].children[0]
      ).not.to.have.class('popover');
      expect(
        fixture.componentRef.location.nativeElement.querySelector('.popover')
      ).to.be.ok;
    });

    it('should allow the defauult title and message to be configured globally', () => {
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            popoverTitle: 'Default title',
            popoverMessage: 'Default message',
          }),
        ],
        declarations: [TestComponent],
      });
      const fixture: ComponentFixture<TestComponent> =
        TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindowComponent> =
        fixture.componentInstance.confirm.popover!;
      popover.changeDetectorRef.detectChanges();
      expect(
        popover.location.nativeElement.querySelector('.popover-title')
      ).to.have.html('Default title');
      expect(
        popover.location.nativeElement.querySelector('.popover-content p')
      ).to.have.html('Default message');
    });
  });
});
