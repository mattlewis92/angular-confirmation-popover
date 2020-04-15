export interface ConfirmationPopoverOptionsInterface {
  /**
   * The popover title
   */
  popoverTitle?: string;

  /**
   * The popover message
   */
  popoverMessage?: string;

  /**
   * The popover confirmation button text
   */
  confirmText?: string;

  /**
   * The popover cancel button text
   */
  cancelText?: string;

  /**
   * The popover confirm button type e.g. `success`, `danger` etc
   */
  confirmButtonType?: string;

  /**
   * The popover cancel button type  e.g. `success`, `danger` etc
   */
  cancelButtonType?: string;

  /**
   * The popover placement. Can be `top`, `bottom`, `left`, `right`
   */
  placement?: string;

  /**
   * Which button to cancel. Can be either `confirm` or `cancel`
   */
  focusButton?: string;

  /**
   * Whether to hide the confirmation button
   */
  hideConfirmButton?: boolean;

  /**
   * Whether to hide the cancel button
   */
  hideCancelButton?: boolean;

  /**
   * A custom CSS class to be added to the popover
   */
  popoverClass?: string;

  /**
   * Whether to append the popover to the document body
   */
  appendToBody?: boolean;

  /**
   * Swap the order of the confirm and cancel buttons
   */
  reverseButtonOrder?: boolean;

  /**
   * Whether or not the popover should stay open when clicking outside it
   */
  closeOnOutsideClick?: boolean;
}

export class ConfirmationPopoverOptions
  implements ConfirmationPopoverOptionsInterface {
  popoverTitle: string;
  popoverMessage: string;
  confirmText: string = 'Confirm';
  cancelText: string = 'Cancel';
  confirmButtonType: string = 'success';
  cancelButtonType: string = 'outline-secondary';
  placement: string = 'top';
  focusButton: string;
  hideConfirmButton: boolean = false;
  hideCancelButton: boolean = false;
  popoverClass: string = '';
  appendToBody: boolean = false;
  reverseButtonOrder: boolean = false;
  closeOnOutsideClick: boolean = true;
}
