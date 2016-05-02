import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewContainerRef,
  DynamicComponentLoader,
  ComponentRef,
  OnDestroy,
  ElementRef,
  OnChanges,
  OnInit
} from 'angular2/core';
import {ConfirmPopover} from './confirmPopover.component';

type Placement = 'top' | 'left' | 'bottom' | 'right';

@Directive({
  selector: '[mwl-confirm]'
})
export class Confirm implements OnDestroy, OnChanges, OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Input() placement: Placement;
  @Input() confirmButtonType: string;
  @Input() cancelButtonType: string;
  @Input() isDisabled: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter();
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  popover: Promise<ComponentRef> = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private loader: DynamicComponentLoader,
    private elm: ElementRef
  ) {}

  ngOnInit(): void {
    this.isOpenChange.emit(false);
  }

  ngOnChanges(changes: any): void {
    if (changes.isOpen) {
      if (changes.isOpen.currentValue === true) {
        this._showPopover();
      } else {
        this._hidePopover();
      }
    }
  }

  ngOnDestroy(): void {
    this._hidePopover();
  }

  onConfirm(): void {
    this.confirm.emit(null);
    this._hidePopover();
  }

  onCancel(): void {
    this.cancel.emit(null);
    this._hidePopover();
  }

  private _showPopover(): void {
    if (!this.popover && !this.isDisabled) {
      this.popover = this.loader.loadNextToLocation(ConfirmPopover, this.viewContainerRef).then((popover: ComponentRef) => {
        popover.instance.popoverAnchor = this;
        popover.instance.popoverAnchorElement = this.elm;
        this.isOpenChange.emit(true);
        return popover;
      });
    }
  }

  private _hidePopover(): void {
    if (this.popover) {
      this.popover.then((popoverComponent: ComponentRef) => {
        popoverComponent.destroy();
        this.popover = null;
        this.isOpenChange.emit(false);
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchend', ['$event.target'])
  private _onDocumentClick(target: HTMLElement): void {

    // TODO - replace with: `this.renderer.invokeElementMethod(this.elm.nativeElement, 'contains', [target])`
    // Pending on https://github.com/angular/angular/issues/8386

    if (this.popover && !this.elm.nativeElement.contains(target)) {
      this.popover.then((popover: ComponentRef) => {
        if (!popover.location.nativeElement.contains(target)) {
          this._hidePopover();
        }
      });
    }
  }

  @HostListener('click')
  private _togglePopover(): void {
    if (!this.popover) {
      this._showPopover();
    } else {
      this._hidePopover();
    }
  }

}