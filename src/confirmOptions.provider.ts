import {Injectable, ElementRef} from '@angular/core';

@Injectable()
export class ConfirmOptions {
  public title: string;
  public message: string;
  public confirmText: string = 'Confirm';
  public cancelText: string = 'Cancel';
  public confirmButtonType: string = 'success';
  public cancelButtonType: string = 'default';
  public placement: string = 'top';
  public focusButton: string;
  public hideConfirmButton: boolean = false;
  public hideCancelButton: boolean = false;

  public constructor(options: Object = {}) {
    Object.assign(this, options);
  }
}

@Injectable()
export class PopoverConfirmOptions extends ConfirmOptions {

  public onConfirm: Function;
  public onCancel: Function;
  public hostElement: ElementRef;

}