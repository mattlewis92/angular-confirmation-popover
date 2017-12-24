import { ConfirmCancelEvent } from './confirmation-popover.directive';
import { Injectable, TemplateRef } from '@angular/core';
import { ConfirmationPopoverOptions } from './confirmation-popover-options.provider';

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
