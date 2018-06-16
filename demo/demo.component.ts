import { Component } from '@angular/core';

@Component({
  selector: 'mwl-demo',
  template: `
    <div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" [(ngModel)]="popoverTitle">
      </div>
      <div class="form-group">
        <label>Message (Yes you can even include html!)</label>
        <input type="text" class="form-control" [(ngModel)]="popoverMessage">
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
        <span *ngFor="let placement of placements">
          <button
            class="btn btn-default"
            mwlConfirmationPopover
            [popoverTitle]="popoverTitle"
            [popoverMessage]="popoverMessage"
            [confirmText]="confirmText"
            [cancelText]="cancelText"
            [placement]="placement"
            (confirm)="confirmClicked = true"
            (cancel)="cancelClicked = true"
            confirmButtonType="danger"
            cancelButtonType="default"
            (click)="confirmClicked = false; cancelClicked = false"
            [appendToBody]="true">
            Show on {{ placement }}
          </button>
          &ngsp;
        </span>
      </div>

      <br>

      <div class="alert alert-info" [hidden]="!confirmClicked">You clicked confirm!</div>
      <div class="alert alert-info" [hidden]="!cancelClicked">You cancelled!</div>

    </div>
  `
})
export class DemoComponent {
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Are you sure?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
}
