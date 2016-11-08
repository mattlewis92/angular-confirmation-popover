import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ConfirmationPopoverModule} from './../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm'
    })
  ],
  bootstrap: [Demo]
})
export class DemoModule {}