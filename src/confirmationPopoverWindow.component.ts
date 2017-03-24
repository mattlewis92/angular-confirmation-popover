import {
  Component,
  AfterViewInit,
} from '@angular/core';
import {ConfirmationPopoverWindowOptions} from './confirmationPopoverOptions.provider';

/**
 * @private
 */
@Component({
  styles: [`
    .popover {
      display: block;
    }
  `],
  template: `
    <ng-template #defaultTemplate let-options="options">
      <div [class]="'popover ' + options.placement + ' popover-' + options.placement + ' ' + options.popoverClass">
        <div class="popover-arrow arrow"></div>
        <h3 class="popover-title" [innerHTML]="options.title"></h3>
        <div class="popover-content">
          <p [innerHTML]="options.message"></p>
          <div class="row">
            <div
              class="col-xs-6 col-6"
              [ngClass]="{'col-xs-offset-3 col-offset-3': options.hideCancelButton}"
              *ngIf="!options.hideConfirmButton">
              <button
                [mwlFocus]="options.focusButton === 'confirm'"
                [class]="'btn btn-block btn-' + options.confirmButtonType"
                (click)="options.onConfirm()"
                [innerHtml]="options.confirmText">
              </button>
            </div>
            <div
              class="col-xs-6 col-6"
              [ngClass]="{'col-xs-offset-3 col-offset-3': options.hideConfirmButton}"
              *ngIf="!options.hideCancelButton">
              <button
                [mwlFocus]="options.focusButton === 'cancel'"
                [class]="'btn btn-block btn-' + options.cancelButtonType"
                (click)="options.onCancel()"
                [innerHtml]="options.cancelText">
              </button>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="options.customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{options: options}">
    </ng-template>
  `
})
export class ConfirmationPopoverWindow implements AfterViewInit {

  constructor(public options: ConfirmationPopoverWindowOptions) {}

  ngAfterViewInit(): void {
    this.options.onAfterViewInit();
  }

}
