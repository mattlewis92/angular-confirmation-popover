import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
  Renderer
} from '@angular/core';
import {PositionService} from 'ng2-bootstrap/components/position';
import {PopoverConfirmOptions} from './confirmOptions.provider';

interface Coords {
  top: number;
  left: number;
}

@Component({
  providers: [PositionService],
  styles: [`
    .popover {
      display: block;
    }
  `],
  template: `
    <div
      [class]="'popover ' + options.placement + ' popover-' + options.placement"
      [style.top.px]="popoverPosition?.top"
      [style.left.px]="popoverPosition?.left">
      <div class="popover-arrow arrow"></div>
      <h3 class="popover-title" [innerHTML]="options.title"></h3>
      <div class="popover-content">
        <p [innerHTML]="options.message"></p>
        <div class="row">
          <div class="col-xs-6">
            <button
              #confirmButton
              [class]="'btn btn-block btn-' + options.confirmButtonType"
              (click)="options.onConfirm()"
              [innerHtml]="options.confirmText">
            </button>
          </div>
          <div class="col-xs-6">
            <button
              #cancelButton
              [class]="'btn btn-block btn-' + options.cancelButtonType"
              (click)="options.onCancel()"
              [innerHtml]="options.cancelText">
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmPopover implements AfterViewInit {

  @ViewChild('confirmButton') confirmButton: ElementRef;
  @ViewChild('cancelButton') cancelButton: ElementRef;
  private popoverPosition: Coords;

  constructor(
    private elm: ElementRef,
    private renderer: Renderer,
    private cdr: ChangeDetectorRef,
    private position: PositionService,
    private options: PopoverConfirmOptions
  ) {}

  ngAfterViewInit(): void {
    this._positionPopover();
    this.cdr.detectChanges();
    let focusButton: ElementRef;
    if (this.options.focusButton === 'confirm') {
      focusButton = this.confirmButton;
    } else if (this.options.focusButton === 'cancel') {
      focusButton = this.cancelButton;
    }
    if (focusButton) {
      this.renderer.invokeElementMethod(focusButton.nativeElement, 'focus', []);
    }
  }

  private _positionPopover(): void {
    this.popoverPosition = this.position.positionElements(
      this.options.hostElement.nativeElement,
      this.elm.nativeElement.children[0],
      this.options.placement,
      false
    );
  }

  @HostListener('window:resize')
  private _onResize(): void {
    this._positionPopover();
  }

}