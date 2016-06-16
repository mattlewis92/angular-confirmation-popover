import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  ElementRef,
  OnChanges,
  OnInit,
  ReflectiveInjector,
  ResolvedReflectiveProvider,
  ComponentResolver,
  Injector
} from '@angular/core';
import {ConfirmPopover} from './confirmPopover.component';
import {ConfirmOptions, PopoverConfirmOptions} from './confirmOptions.provider';

/**
 * All properties can be set on the directive as attributes like so (use the `ConfirmOptions` provider to configure them globally):
 * ```
 * <button
 *  class="btn btn-default"
 *  mwl-confirm
 *  [title]="title"
 *  [message]="message"
 *  placement="left"
 *  (confirm)="confirmClicked = true"
 *  (cancel)="cancelClicked = true"
 *  [(isOpen)]="isOpen">
 *   Show confirm popover!
 * </button>
 * ```
 */
@Directive({
  selector: '[mwl-confirm]'
})
export class Confirm implements OnDestroy, OnChanges, OnInit {

  /**
   * The title of the popover.
   * Note, if you use an expression, you may want to consider using "data-title" instead of "title" so
   * that the browser doesn't show native tooltips with the angular expression listed.
   */
  @Input() title: string;

  /**
   * The body text of the popover.
   */
  @Input() message: string;

  /**
   * The text of the confirm button. Default `Confirm`
   */
  @Input() confirmText: string;

  /**
   * The text of the cancel button. Default `Cancel`
   */
  @Input() cancelText: string;

  /**
   * The placement of the popover. It can be either `top`, `right`, `bottom` or `left`. Default `top`
   */
  @Input() placement: string;

  /**
   * The bootstrap button type of the confirm button. It can be any supported bootstrap color type
   * e.g. `default`, `warning`, `danger` etc. Default `success`
   */
  @Input() confirmButtonType: string;

  /**
   * The bootstrap button type of the cancel button. It can be any supported bootstrap color type
   * e.g. `default`, `warning`, `danger` etc. Default `default`
   */
  @Input() cancelButtonType: string;

  /**
   * Set to either `confirm` or `cancel` to focus the confirm or cancel button.
   * If omitted, by default it will not focus either button.
   */
  @Input() focusButton: string;

  /**
   * Whether to hide the confirm button. Default `false`.
   */
  @Input() hideConfirmButton: boolean = false;

  /**
   * Whether to hide the cancel button. Default `false`.
   */
  @Input() hideCancelButton: boolean = false;

  /**
   * Whether to disable showing the popover. Default `false`.
   */
  @Input() isDisabled: boolean = false;

  /**
   * Will open or show the popover when changed.
   * Can be sugared with `isOpenChange` to emulate 2-way binding like so `[(isOpen)]="isOpen"`
   */
  @Input() isOpen: boolean = false;

  /**
   * Will emit when the popover is opened or closed
   */
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter(true);

  /**
   * An expression that is called when the confirm button is clicked.
   */
  @Output() confirm: EventEmitter<any> = new EventEmitter(true);

  /**
   * An expression that is called when the cancel button is clicked.
   */
  @Output() cancel: EventEmitter<any> = new EventEmitter(true);

  /**
   * A custom CSS class to be added to the popover
   */
  @Input() popoverClass: string;

  /**
   * @private
   */
  popover: Promise<ComponentRef<ConfirmPopover>> = null;

  /**
   * @private
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private elm: ElementRef,
    private defaultOptions: ConfirmOptions,
    private componentResolver: ComponentResolver
  ) {}

  /**
   * @private
   */
  ngOnInit(): void {
    this.isOpenChange.emit(false);
  }

  /**
   * @private
   */
  ngOnChanges(changes: any): void {
    if (changes.isOpen) {
      if (changes.isOpen.currentValue === true) {
        this.showPopover();
      } else {
        this.hidePopover();
      }
    }
  }

  /**
   * @private
   */
  ngOnDestroy(): void {
    this.hidePopover();
  }

  /**
   * @private
   */
  onConfirm(): void {
    this.confirm.emit(null);
    this.hidePopover();
  }

  /**
   * @private
   */
  onCancel(): void {
    this.cancel.emit(null);
    this.hidePopover();
  }

  private showPopover(): void {
    if (!this.popover && !this.isDisabled) {

      const options: PopoverConfirmOptions = new PopoverConfirmOptions();
      Object.assign(options, this.defaultOptions, {
        title: this.title,
        message: this.message,
        onConfirm: (): void => {
          this.onConfirm();
        },
        onCancel: (): void => {
          this.onCancel();
        },
        hostElement: this.elm
      });

      const optionalParams: string[] = [
        'confirmText',
        'cancelText',
        'placement',
        'confirmButtonType',
        'cancelButtonType',
        'focusButton',
        'hideConfirmButton',
        'hideCancelButton',
        'popoverClass'
      ];
      optionalParams.forEach(param => {
        if (this[param]) {
          options[param] = this[param];
        }
      });

      this.popover = this.componentResolver.resolveComponent(ConfirmPopover).then(componentFactory => {
        const binding: ResolvedReflectiveProvider[] = ReflectiveInjector.resolve([{
          provide: PopoverConfirmOptions,
          useValue: options
        }]);
        const contextInjector: Injector = this.viewContainerRef.parentInjector;
        const childInjector: Injector = ReflectiveInjector.fromResolvedProviders(binding, contextInjector);
        const popover: ComponentRef<ConfirmPopover> =
          this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, childInjector);
        this.isOpenChange.emit(true);
        return popover;
      });

    }
  }

  private hidePopover(): void {
    if (this.popover) {
      this.popover.then((popoverComponent: ComponentRef<ConfirmPopover>) => {
        popoverComponent.destroy();
        this.popover = null;
        this.isOpenChange.emit(false);
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchend', ['$event.target'])
  private onDocumentClick(target: HTMLElement): void {

    if (this.popover && !this.elm.nativeElement.contains(target)) {
      this.popover.then((popover: ComponentRef<ConfirmPopover>) => {
        if (!popover.location.nativeElement.contains(target)) {
          this.hidePopover();
        }
      });
    }
  }

  @HostListener('click')
  private togglePopover(): void {
    if (!this.popover) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }

}
