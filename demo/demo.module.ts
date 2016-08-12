import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ConfirmModule} from './../angular2-bootstrap-confirm';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, FormsModule, ConfirmModule],
  bootstrap: [Demo]
})
export class DemoModule {}