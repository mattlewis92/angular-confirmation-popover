import {Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, HostListener} from 'angular2/core';
import {PositionService} from 'ng2-bootstrap/components/position';
import {Confirm} from './confirm.directive';

interface Coords {
  top: number;
  left: number;
}

@Component({
  selector: 'mwl-confirm-popover',
  providers: [PositionService],
  template: `
    <div
      [class]="'popover ' + popoverAnchor.placement"
      [style.display]="'block'"
      [style.top]="top"
      [style.left]="left">
      <div class="arrow"></div>
      <h3 class="popover-title" [innerHTML]="popoverAnchor.title"></h3>
      <div class="popover-content">
        <p [innerHTML]="popoverAnchor.message"></p>
        <div class="row">
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block confirm-button btn-' + popoverAnchor.confirmButtonType"
              (click)="popoverAnchor.confirm.emit(null)"
              [innerHtml]="popoverAnchor.confirmText">
            </button>
          </div>
          <div class="col-xs-6">
            <button
              [class]="'btn btn-block cancel-button btn-' + popoverAnchor.cancelButtonType"
              (click)="popoverAnchor.cancel.emit(null)"
              [innerHtml]="popoverAnchor.cancelText">
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmPopover implements AfterViewInit {

  @Input() popoverAnchor: Confirm;
  @Input() popoverAnchorElement: ElementRef;
  top: string;
  left: string;

  constructor(private elm: ElementRef, private position: PositionService, private cdr: ChangeDetectorRef) {}

  _positionPopover(): void {
    const position: Coords = this.position.positionElements(
      this.popoverAnchorElement.nativeElement,
      this.elm.nativeElement.children[0],
      this.popoverAnchor.placement,
      false
    );
    this.top = position.top + 'px';
    this.left = position.left + 'px';
  }

  ngAfterViewInit(): void {
    this._positionPopover();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  _onResize(): void {
    this._positionPopover();
  }

}