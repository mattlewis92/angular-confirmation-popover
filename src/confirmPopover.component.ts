import {Component, Input} from 'angular2/core';
import {Confirm} from './confirm.directive';

@Component({
  selector: 'mwl-confirm-popover',
  template: `
    <div [class]="'popover ' + popoverAnchor.placement" [style.display]="'block'">
      <div class="arrow"></div>
      <h3 class="popover-title" [innerHTML]="popoverAnchor.title"></h3>
      <div class="popover-content">
        <p [innerHTML]="popoverAnchor.message"></p>
        <div class="row">
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block confirm-button btn-' + popoverAnchor.confirmButtonType"
              (click)="popoverAnchor.confirm.emit(null)"
              [innerHtml]="popoverAnchor.confirmText">
            </button>
          </div>
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block cancel-button btn-' + popoverAnchor.cancelButtonType"
              (click)="popoverAnchor.cancel.emit(null)"
              [innerHtml]="popoverAnchor.cancelText">
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmPopover {

  @Input() popoverAnchor: Confirm;

}