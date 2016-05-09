import {Injectable, ElementRef} from '@angular/core';

/**
 * Use this for configuring the confirmation popover defaults
 *
 * Use it like so:
 * ```
 * providers: [
 *   provide(ConfirmOptions, {
 *     useFactory: (): ConfirmOptions => {
 *       return new ConfirmOptions({
 *         // focus the confirm button by default. See below for an explanation of all options.
 *         focusButton: 'confirm'
 *       });
 *     }
 *   })
 * ]
 * ```
 */
@Injectable()
export class ConfirmOptions {

  /**
   * The popover title
   */
  public title: string;

  /**
   * The popover message
   */
  public message: string;

  /**
   * The popover confirmation button text
   */
  public confirmText: string = 'Confirm';

  /**
   * The popover cancel button text
   */
  public cancelText: string = 'Cancel';

  /**
   * The popover confirm button type e.g. `success`, `danger` etc
   */
  public confirmButtonType: string = 'success';

  /**
   * The popover cancel button type  e.g. `success`, `danger` etc
   */
  public cancelButtonType: string = 'default';

  /**
   * The popover placement. Can be `top`, `bottom`, `left`, `right`
   */
  public placement: string = 'top';

  /**
   * Which button to cancel. Can be either `confirm` or `cancel`
   */
  public focusButton: string;

  /**
   * Whether to hide the confirmation button
   */
  public hideConfirmButton: boolean = false;

  /**
   * Whether to hide the cancel button
   */
  public hideCancelButton: boolean = false;

  /**
   * @param options the options object to set on the instance of the confirm options
   */
  public constructor(options: Object = {}) {
    Object.assign(this, options);
  }
}

/**
 * @private
 */
@Injectable()
export class PopoverConfirmOptions extends ConfirmOptions {

  public onConfirm: Function;
  public onCancel: Function;
  public hostElement: ElementRef;

}