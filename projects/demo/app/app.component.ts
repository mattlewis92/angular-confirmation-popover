import { Component, TrackByFunction } from '@angular/core';

@Component({
  selector: 'mwl-demo',
  templateUrl: './app.component.html',
})
export class AppComponent {
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Are you sure?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;
}
