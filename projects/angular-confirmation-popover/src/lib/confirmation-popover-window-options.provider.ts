import { ConfirmCancelEvent } from './confirmation-popover.directive';
import { Injectable, TemplateRef } from '@angular/core';
import { ConfirmationPopoverOptions } from './confirmation-popover-options.provider';

/**
 * @internal
 */
@Injectable()
export class ConfirmationPopoverWindowOptions extends ConfirmationPopoverOptions {
  onConfirm: (event: ConfirmCancelEvent) => void;
  onCancel: (event: ConfirmCancelEvent) => void;
  onAfterViewInit: () => void;
  customTemplate: TemplateRef<any>;
}
