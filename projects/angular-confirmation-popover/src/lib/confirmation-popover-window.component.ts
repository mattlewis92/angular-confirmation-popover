import { Component, AfterViewInit } from '@angular/core';
import { ConfirmationPopoverWindowOptions } from './confirmation-popover-window-options.provider';

/**
 * @internal
 */
@Component({
  selector: 'mwl-confirmation-popover-window',
  styleUrls: ['./confirmation-popover-window.component.scss'],
  templateUrl: './confirmation-popover-window.component.html',
})
export class ConfirmationPopoverWindowComponent implements AfterViewInit {
  constructor(public options: ConfirmationPopoverWindowOptions) {}

  ngAfterViewInit(): void {
    this.options.onAfterViewInit();
  }
}
