import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Confirm} from './confirm.directive';
import {ConfirmPopover} from './confirmPopover.component';
import {Focus} from './focus.directive';

@NgModule({
  declarations: [Confirm, ConfirmPopover, Focus],
  imports: [CommonModule],
  exports: [Confirm, Focus],
  entryComponents: [ConfirmPopover]
})
export class ConfirmModule {}