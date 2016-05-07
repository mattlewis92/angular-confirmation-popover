import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';
import {Component, provide} from '@angular/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Confirm, ConfirmOptions, Position} from './../angular2-bootstrap-confirm';
import {PositionService} from 'ng2-bootstrap/components/position';

@Component({
  selector: 'demo-app',
  providers: [
    provide(ConfirmOptions, {
      useFactory: (): ConfirmOptions => {
        return new ConfirmOptions({
          focusButton: 'confirm'
        });
      }
    })
  ],
  directives: [
    ...FORM_DIRECTIVES,
    ...CORE_DIRECTIVES,
    Confirm
  ],
  template: `
    <div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" [(ngModel)]="title">
      </div>
      <div class="form-group">
        <label>Message (Yes you can even include html!)</label>
        <input type="text" class="form-control" [(ngModel)]="message">
      </div>
      <div class="form-group">
        <label>Confirm text</label>
        <input type="text" class="form-control" [(ngModel)]="confirmText">
      </div>
      <div class="form-group">
        <label>Confirm text</label>
        <input type="text" class="form-control" [(ngModel)]="cancelText">
      </div>
      <div class="text-center">
        <span *ngFor="let placement of placements trackBy placement">
          <button
            class="btn btn-default"
            mwl-confirm
            [title]="title"
            [message]="message"
            [confirmText]="confirmText"
            [cancelText]="cancelText"
            [placement]="placement"
            (confirm)="confirmClicked = true"
            (cancel)="cancelClicked = true"
            confirmButtonType="danger"
            cancelButtonType="default"
            (click)="confirmClicked = false; cancelClicked = false">
            Show on {{ placement }}
          </button>
        </span>
      </div>

      <br>

      <div class="alert alert-info" [hidden]="!confirmClicked">You clicked confirm!</div>
      <div class="alert alert-info" [hidden]="!cancelClicked">You cancelled!</div>

    </div>
  `
})
class DemoApp {
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  title: string = 'Are you sure?';
  message: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class=\'glyphicon glyphicon-ok\'></i>';
  cancelText: string = 'No <i class=\'glyphicon glyphicon-remove\'></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
}

bootstrap(DemoApp, [
  provide(Position, {useClass: PositionService})
]);