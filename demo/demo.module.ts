import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm'
    })
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
