import {Injectable, TemplateRef} from '@angular/core';

/**
 * Use this for configuring the confirmation popover defaults
 *
 * Use it like so:
 * ```
 * const options: ConfirmOptions = new ConfirmOptions();
 * // focus the confirm button by default. See below for an explanation of all options.
 * options.focusButton = 'confirm';
 *
 * providers: [{provide: ConfirmOptions, useValue: options}]
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
   * A custom CSS class to be added to the popover
   */
  public popoverClass: string = '';

  /**
   * Whether to append the popover to the document body
   */
  public appendToBody: boolean = false;

}

/**
 * @private
 */
@Injectable()
export class PopoverConfirmOptions extends ConfirmOptions {

  public onConfirm: Function;
  public onCancel: Function;
  public customTemplate: TemplateRef<any>;

}
