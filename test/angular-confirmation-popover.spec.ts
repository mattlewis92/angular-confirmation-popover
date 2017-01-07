import 'core-js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';
import 'rxjs';
import {
  Component,
  ViewChild,
  ComponentRef
} from '@angular/core';
import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {Positioning} from 'positioning';
import {ConfirmationPopoverModule} from '../src';
import {ConfirmationPopover} from '../src/confirmationPopover.directive';
import {ConfirmationPopoverWindow} from '../src/confirmationPopoverWindow.component';
import {expect, use} from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiDom from 'chai-dom';

use(sinonChai);
use(chaiDom);

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('bootstrap confirm', () => {

  describe('ConfirmationPopover directive', () => {

    @Component({
      template: `
        <button
          class="btn btn-default"
          mwlConfirmationPopover
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
      @ViewChild(ConfirmationPopover) confirm: ConfirmationPopover;
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

    let createPopover: Function;

    const clickFixture: Function = (fixture: ComponentFixture<TestCmp>) => {
      fixture.nativeElement.querySelector('button').click();
    };

    class PositionMock {
      positionElements: sinon.SinonStub = sinon.stub().returns({top: 10, left: 20});
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConfirmationPopoverModule.forRoot()],
        declarations: [TestCmp],
        providers: [{provide: Positioning, useClass: PositionMock}]
      });

      createPopover = (): ComponentRef<ConfirmationPopoverWindow> => {
        const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        clickFixture(fixture);
        const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
        popover.changeDetectorRef.detectChanges();
        return popover;
      };

    });

    it('should show a popover when the element is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      const showPopover: Function = sinon.spy(confirm, 'showPopover');
      expect(confirm.popover).not.to.be.ok;
      clickFixture(fixture);
      expect(showPopover).to.have.been.calledOnce;
      expect(confirm.popover).to.be.ok;
    });

    it('should hide the popover when the element is clicked if the popover is open', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
      clickFixture(fixture);
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the parent component is destroyed', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
      fixture.destroy();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the confirm button is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      confirm.popover.location.nativeElement.querySelectorAll('button')[0].click();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when the cancel button is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      confirm.popover.location.nativeElement.querySelectorAll('button')[1].click();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should hide the popover when an element not inside the popover is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      clickFixture(fixture);
      const hidePopover: Function = sinon.spy(confirm, 'hidePopover');
      confirm.popover.changeDetectorRef.detectChanges();
      const btn: HTMLElement = document.createElement('button');
      document.body.appendChild(btn);
      btn.click();
      expect(hidePopover).to.have.been.calledOnce;
      btn.parentNode.removeChild(btn);
    });

    it('should allow the popover title to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelector('.popover-title')).to.have.html('Are you sure?');
    });

    it('should allow the popover description to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelector('.popover-content > p'))
        .to.have.html('Are you really <b>sure</b> you want to do this?');
    });

    it('should allow the confirm button text to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelectorAll('button')[0])
        .to.have.html('Yes <i class="glyphicon glyphicon-ok"></i>');
    });

    it('should allow the cancel button text to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelectorAll('button')[1])
        .to.have.html('No <i class="glyphicon glyphicon-remove"></i>');
    });

    it('should allow the confirm button type to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-danger');
    });

    it('should allow the cancel button type to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.querySelectorAll('button')[1]).to.have.class('btn-default');
    });

    it('should allow the placement to be customised', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.children[0]).to.have.class('popover-left');
    });

    it('should a custom class to be set on the popover', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.children[0]).to.have.class('my-class');
    });

    it('should position the popover according to the coordinates given by the position service', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.children[0].style.top).to.equal('10px');
      expect(popover.location.nativeElement.children[0].style.left).to.equal('20px');
    });

    it('should re-position the popover when the window resizes', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      const positionPopover: sinon.SinonSpy = sinon.spy(fixture.componentInstance.confirm, 'positionPopover');
      window.dispatchEvent(new Event('resize'));
      expect(positionPopover).to.have.been.calledOnce;
    });

    it('should not focus either button by default', () => {
      const popover: ComponentRef<ConfirmationPopoverWindow> = createPopover();
      expect(popover.location.nativeElement.contains(document.activeElement)).not.to.be.ok;
    });

    it('should focus the confirm button', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.componentInstance.focusButton = 'confirm';
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.equal(document.activeElement);
    });

    it('should focus the confirm button', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentInstance.focusButton = 'cancel';
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(popover.location.nativeElement.querySelectorAll('button')[1]).to.equal(document.activeElement);
    });

    it('should hide the confirm button', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentInstance.hideConfirmButton = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(popover.location.nativeElement.querySelectorAll('button')).to.have.length(1);
      expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-default');
      expect(popover.location.nativeElement.querySelectorAll('button')[0].parentElement).to.have.class('col-xs-offset-3');
      expect(popover.location.nativeElement.querySelectorAll('button')[0].parentElement).to.have.class('col-offset-3');
    });

    it('should hide the cancel button', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentInstance.hideCancelButton = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(popover.location.nativeElement.querySelectorAll('button')).to.have.length(1);
      expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.class('btn-danger');
      expect(popover.location.nativeElement.querySelectorAll('button')[0].parentElement).to.have.class('col-xs-offset-3');
      expect(popover.location.nativeElement.querySelectorAll('button')[0].parentElement).to.have.class('col-offset-3');
    });

    it('should disable the popover from opening', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();
      const confirm: ConfirmationPopover = fixture.componentInstance.confirm;
      clickFixture(fixture);
      expect(confirm.popover).not.to.be.ok;
    });

    it('should open the popover when isOpen is set to true', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentInstance.isOpen = true;
      fixture.detectChanges();
      expect(fixture.componentInstance.confirm).to.be.ok;
    });

    it('should close the popover when isOpen is set to false', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      clickFixture(fixture);
      const hidePopover: sinon.SinonSpy = sinon.spy(fixture.componentInstance.confirm, 'hidePopover');
      fixture.componentInstance.isOpen = false;
      fixture.detectChanges();
      expect(hidePopover).to.have.been.calledOnce;
    });

    it('should call the confirm callback when the confirm button is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(fixture.componentInstance.confirmClicked).to.be.false;
      popover.location.nativeElement.querySelectorAll('button')[0].click();
      expect(fixture.componentInstance.confirmClicked).to.be.true;
    });

    it('should call the cancel callback when the cancel button is clicked', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(fixture.componentInstance.cancelClicked).to.be.false;
      popover.location.nativeElement.querySelectorAll('button')[1].click();
      expect(fixture.componentInstance.cancelClicked).to.be.true;
    });

    it('should initialise isOpen to false', async(() => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.whenStable().then(() => { // let isOpenChange be called with false
        expect(fixture.componentInstance.isOpen).to.be.false;
      });
    }));

    it('should set isOpen to true when the popover is opened', async(() => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.whenStable().then(() => { // let isOpenChange be called with false
        clickFixture(fixture);
        return fixture.whenStable();
      }).then(() => {
        expect(fixture.componentInstance.isOpen).to.be.true;
      });
    }));

    it('should set isOpen to false when the popover is closed', async(() => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.whenStable().then(() => { // let isOpenChange be called with false
        clickFixture(fixture);
        return fixture.whenStable();
      }).then(() => {
        clickFixture(fixture);
        return fixture.whenStable();
      }).then(() => {
        expect(fixture.componentInstance.isOpen).to.be.false;
      });
    }));

    it('should not append the popover to the document body', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentRef.instance.appendToBody = false;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0]).not.to.have.class('popover');
      expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).to.be.ok;
    });

    it('should append the popover to the document body', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.componentRef.instance.appendToBody = true;
      fixture.detectChanges();
      clickFixture(fixture);
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect((<HTMLElement>document.body.children[document.body.children.length - 1]).children[0]).to.have.class('popover');
      expect(fixture.componentRef.location.nativeElement.querySelector('.popover')).not.to.be.ok;
    });

    it('should allow a custom template to be set', () => {

      const html: string = `
        <template #customTemplate let-options="options">
          <div [class]="'popover ' + options.placement" style="display: block">
            <div class="arrow"></div>
            <h3 class="popover-title">{{ options.title }}</h3>
            <div class="popover-content">
               <p [innerHTML]="options.message"></p>
               <div id="customTemplate">Custom template</div>
               <button [mwlFocus]="options.focusButton === 'confirm'">Confirm</button>
            </div>
          </div>
        </template>
        <button
          mwlConfirmationPopover
          title="My Title"
          message="My Message"
          placement="right"
          focusButton="confirm"
          [customTemplate]="customTemplate">
          Show popover
        </button>
      `;
      TestBed.overrideComponent(TestCmp, {set: {template: html}});
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      const popoverElm: HTMLElement = popover.location.nativeElement.children[0];
      expect(popoverElm.querySelector('.popover-title')).to.have.html('My Title');
      expect(popoverElm.querySelector('.popover-content > p')).to.have.html('My Message');
      expect(popoverElm).to.have.class('right');
      expect(popoverElm.querySelector('#customTemplate')).to.have.html('Custom template');
      expect(popoverElm.querySelectorAll('button')[0]).to.equal(document.activeElement);

    });

  });

  describe('ConfirmOptions', () => {

    @Component({
      template: `
        <button
          class="btn btn-default"
          mwlConfirmationPopover>
          Show popover
        </button>
      `
    })
    class TestCmp {
      @ViewChild(ConfirmationPopover) confirm: ConfirmationPopover;
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          ConfirmationPopoverModule.forRoot({
            confirmText: 'Derp'
          })
        ],
        declarations: [
          TestCmp
        ]
      });
    });

    it('should allow default options to be configured globally', () => {
      const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      const popover: ComponentRef<ConfirmationPopoverWindow> = fixture.componentInstance.confirm.popover;
      popover.changeDetectorRef.detectChanges();
      expect(popover.location.nativeElement.querySelectorAll('button')[0]).to.have.html('Derp');
    });

  });

});
