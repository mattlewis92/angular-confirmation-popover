import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer
} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {PopoverConfirmOptions} from './confirmOptions.provider';

/**
 * @private
 */
@Component({
  styles: [`
    .popover {
      display: block;
    }
  `],
  directives: [NgIf, NgTemplateOutlet],
  template: `
    <template
      *ngIf="options.customTemplate"
      [ngTemplateOutlet]="options.customTemplate"
      [ngOutletContext]="{options: options}">
    </template>
    <div
      *ngIf="!options.customTemplate"
      [class]="'popover ' + options.placement + ' popover-' + options.placement + ' ' + options.popoverClass">
      <div class="popover-arrow arrow"></div>
      <h3 class="popover-title" [innerHTML]="options.title"></h3>
      <div class="popover-content">
        <p [innerHTML]="options.message"></p>
        <div class="row">
          <div
            class="col-xs-6"
            [class.col-xs-offset-3]="options.hideCancelButton"
            *ngIf="!options.hideConfirmButton">
            <button
              #confirmButton
              [class]="'btn btn-block btn-' + options.confirmButtonType"
              (click)="options.onConfirm()"
              [innerHtml]="options.confirmText">
            </button>
          </div>
          <div
            class="col-xs-6"
            [class.col-xs-offset-3]="options.hideConfirmButton"
            *ngIf="!options.hideCancelButton">
            <button
              #cancelButton
              [class]="'btn btn-block btn-' + options.cancelButtonType"
              (click)="options.onCancel()"
              [innerHtml]="options.cancelText">
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmPopover implements AfterViewInit {

  @ViewChild('confirmButton') confirmButton: ElementRef;
  @ViewChild('cancelButton') cancelButton: ElementRef;

  constructor(
    private renderer: Renderer,
    private options: PopoverConfirmOptions
  ) {}

  ngAfterViewInit(): void {
    let focusButton: ElementRef;
    if (this.options.focusButton === 'confirm') {
      focusButton = this.confirmButton;
    } else if (this.options.focusButton === 'cancel') {
      focusButton = this.cancelButton;
    }
    if (focusButton) {
      this.renderer.invokeElementMethod(focusButton.nativeElement, 'focus', []);
    }
  }

}
