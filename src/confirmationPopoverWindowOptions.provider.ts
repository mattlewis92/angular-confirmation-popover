import { ConfirmCancelEvent } from './confirmationPopover.directive';
import { Injectable, TemplateRef } from '@angular/core';
import { ConfirmationPopoverOptions } from './confirmationPopoverOptions.provider';

/**
 * @private
 */
@Injectable()
export class ConfirmationPopoverWindowOptions extends ConfirmationPopoverOptions {
  public onConfirm: (event: ConfirmCancelEvent) => void;
  public onCancel: (event: ConfirmCancelEvent) => void;
  public onAfterViewInit: () => void;
  public customTemplate: TemplateRef<any>;
}
