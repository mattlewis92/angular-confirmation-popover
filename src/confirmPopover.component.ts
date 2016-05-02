import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'mwl-confirm-popover',
  template: `
    <div [class]="'popover ' + placement" [style.display]="'block'">
      <div class="arrow"></div>
      <h3 class="popover-title" [innerHTML]="title"></h3>
      <div class="popover-content">
        <p [innerHTML]="message"></p>
        <div class="row">
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block confirm-button btn-' + confirmButtonType"
              (click)="confirm.emit(null)"
              [innerHtml]="confirmText">
            </button>
          </div>
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block cancel-button btn-' + cancelButtonType"
              (click)="cancel.emit(null)"
              [innerHtml]="cancelText">
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmPopover {

  @Input() title: string;
  @Input() message: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Input() placement: string;
  @Input() confirmButtonType: string;
  @Input() cancelButtonType: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

}