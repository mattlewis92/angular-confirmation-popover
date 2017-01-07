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
  ComponentFactoryResolver,
  Injector,
  Inject,
  Renderer,
  TemplateRef,
  ComponentFactory
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {ConfirmationPopoverWindow} from './confirmationPopoverWindow.component';
import {ConfirmationPopoverOptions, ConfirmationPopoverWindowOptions} from './confirmationPopoverOptions.provider';
import {Positioning} from 'positioning';

/**
 * @private
 */
interface Coords {
  top: number;
  left: number;
}

/**
 * All properties can be set on the directive as attributes like so (use `ConfirmationPopoverModule.forRoot()` to configure them globally):
 * ```
 * <button
 *  class="btn btn-default"
 *  mwlConfirmationPopover
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
  selector: '[mwlConfirmationPopover]'
})
export class ConfirmationPopover implements OnDestroy, OnChanges, OnInit {

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
   * A reference to a <template> tag that if set will override the popovers template. Use like so:
   * <template #customTemplate let-options="options">
   *   <div [class]="'popover ' + options.placement" style="display: block">
   *     My custom template
   *   </div>
   * </template>
   *
   * Then pass customTemplate to the mwlConfirmationPopover directive like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  /**
   * Will emit when the popover is opened or closed
   */
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter(true);

  /**
   * An expression that is called when the confirm button is clicked.
   */
  @Output() confirm: EventEmitter<any> = new EventEmitter();

  /**
   * An expression that is called when the cancel button is clicked.
   */
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  /**
   * A custom CSS class to be added to the popover
   */
  @Input() popoverClass: string;

  /**
   * Append the element to the document body rather than the trigger element
   */
  @Input() appendToBody: boolean = false;

  /**
   * @private
   */
  popover: ComponentRef<ConfirmationPopoverWindow> = null;

  /**
   * @private
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private elm: ElementRef,
    private defaultOptions: ConfirmationPopoverOptions,
    private cfr: ComponentFactoryResolver,
    private position: Positioning,
    private renderer: Renderer,
    @Inject(DOCUMENT) private document //tslint:disable-line
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

  /**
   * @private
   */
  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchend', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {

    if (this.popover && !this.elm.nativeElement.contains(target) && !this.popover.location.nativeElement.contains(target)) {
      this.hidePopover();
    }
  }

  /**
   * @private
   */
  @HostListener('click')
  togglePopover(): void {
    if (!this.popover) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }

  /**
   * @private
   */
  @HostListener('window:resize')
  onResize(): void {
    this.positionPopover();
  }

  private showPopover(): void {
    if (!this.popover && !this.isDisabled) {

      const options: ConfirmationPopoverWindowOptions = new ConfirmationPopoverWindowOptions();
      Object.assign(options, this.defaultOptions, {
        title: this.title,
        message: this.message,
        onConfirm: (): void => {
          this.onConfirm();
        },
        onCancel: (): void => {
          this.onCancel();
        },
        onAfterViewInit: () : void => {
          this.positionPopover();
        }
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
        'popoverClass',
        'appendToBody',
        'customTemplate'
      ];
      optionalParams.forEach(param => {
        if (this[param]) {
          options[param] = this[param];
        }
      });

      const componentFactory: ComponentFactory<ConfirmationPopoverWindow> = this.cfr.resolveComponentFactory(ConfirmationPopoverWindow);
      const binding: ResolvedReflectiveProvider[] = ReflectiveInjector.resolve([{
        provide: ConfirmationPopoverWindowOptions,
        useValue: options
      }]);
      const contextInjector: Injector = this.viewContainerRef.parentInjector;
      const childInjector: Injector = ReflectiveInjector.fromResolvedProviders(binding, contextInjector);
      this.popover = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, childInjector);
      if (this.appendToBody) {
        this.renderer.invokeElementMethod(this.document.body, 'appendChild', [this.popover.location.nativeElement]);
      }
      this.isOpenChange.emit(true);

    }
  }

  private positionPopover(): void {
    if (this.popover) {
      const popoverElement: HTMLElement = this.popover.location.nativeElement.children[0];
      const popoverPosition: Coords = this.position.positionElements(
        this.elm.nativeElement,
        popoverElement,
        this.placement || this.defaultOptions.placement,
        this.appendToBody || this.defaultOptions.appendToBody
      );
      this.renderer.setElementStyle(popoverElement, 'top', `${popoverPosition.top}px`);
      this.renderer.setElementStyle(popoverElement, 'left', `${popoverPosition.left}px`);
    }
  }

  private hidePopover(): void {
    if (this.popover) {
      this.popover.destroy();
      this.popover = null;
      this.isOpenChange.emit(false);
    }
  }

}
