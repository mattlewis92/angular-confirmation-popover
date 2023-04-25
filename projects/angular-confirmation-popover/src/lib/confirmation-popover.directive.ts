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
  Injector,
  Renderer2,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';
import { ConfirmationPopoverWindowComponent } from './confirmation-popover-window.component';
import { ConfirmationPopoverOptions } from './confirmation-popover-options.provider';
import { ConfirmationPopoverWindowOptions } from './confirmation-popover-window-options.provider';
import { positionElements } from 'positioning';

/**
 * @internal
 */
export interface ConfirmCancelEvent {
  clickEvent: MouseEvent;
}

/**
 All properties can be set on the directive as attributes like so (use `ConfirmationPopoverModule.forRoot()` to configure them globally):
 ```html
 <button
   class="btn btn-outline-secondary"
   mwlConfirmationPopover
   [popoverTitle]="popoverTitle"
   [popoverMessage]="popoverMessage"
   placement="left"
   (confirm)="confirmClicked = true"
   (cancel)="cancelClicked = true"
   [(isOpen)]="isOpen">
    Show confirm popover!
  </button>
  ```
 */
@Directive({
  selector: '[mwlConfirmationPopover]',
})
export class ConfirmationPopoverDirective
  implements OnDestroy, OnChanges, OnInit {
  /**
   * The title of the popover
   */
  @Input() popoverTitle: string;

  /**
   * The body text of the popover.
   */
  @Input() popoverMessage: string;

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
  @Input() hideConfirmButton: boolean;

  /**
   * Whether to hide the cancel button. Default `false`.
   */
  @Input() hideCancelButton: boolean;

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
   * A reference to a <ng-template> tag that if set will override the popovers template. Use like so:
   * ```html
   * <ng-template #customTemplate let-options="options">
   *   <div [class]="'popover ' + options.placement" style="display: block">
   *     My custom template
   *   </div>
   * </ng-template>
   * ```
   *
   * Then pass customTemplate to the mwlConfirmationPopover directive like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  /**
   * Will emit when the popover is opened or closed
   */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter(true);

  /**
   * An expression that is called when the confirm button is clicked.
   */
  @Output() confirm: EventEmitter<ConfirmCancelEvent> = new EventEmitter();

  /**
   * An expression that is called when the cancel button is clicked.
   */
  @Output() cancel: EventEmitter<ConfirmCancelEvent> = new EventEmitter();

  /**
   * A custom CSS class to be added to the popover
   */
  @Input() popoverClass: string;

  /**
   * Append the element to the document body rather than the trigger element
   */
  @Input() appendToBody: boolean;

  /**
   * Swap the order of the confirm and cancel buttons
   */
  @Input() reverseButtonOrder: boolean;

  /**
   * Determines whether or not the popover should stay open even when clicking outside of it
   */
  @Input() closeOnOutsideClick: boolean;

  /**
   * @internal
   */
  popover?: ComponentRef<ConfirmationPopoverWindowComponent>;

  private eventListeners: (() => void)[] = [];

  /**
   * @internal
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private elm: ElementRef,
    private defaultOptions: ConfirmationPopoverOptions,
    private renderer: Renderer2,
  ) { }

  /**
   * @internal
   */
  ngOnInit(): void {
    this.isOpenChange.emit(false);
  }

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen) {
      if (changes.isOpen.currentValue === true) {
        this.showPopover();
      } else {
        this.hidePopover();
      }
    }
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.hidePopover();
  }

  /**
   * @internal
   */
  onConfirm(event: ConfirmCancelEvent) {
    this.confirm.emit(event);
    this.hidePopover();
  }

  /**
   * @internal
   */
  onCancel(event: ConfirmCancelEvent) {
    this.cancel.emit(event);
    this.hidePopover();
  }

  /**
   * @internal
   */
  @HostListener('click')
  togglePopover(): void {
    if (!this.popover) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }

  private onDocumentClick(event: Event): void {
    const closeOnOutsideClick =
      typeof this.closeOnOutsideClick !== 'undefined'
        ? this.closeOnOutsideClick
        : this.defaultOptions.closeOnOutsideClick;
    if (
      this.popover &&
      !this.elm.nativeElement.contains(event.target) &&
      !this.popover.location.nativeElement.contains(event.target) &&
      closeOnOutsideClick
    ) {
      this.hidePopover();
    }
  }

  private showPopover(): void {
    if (!this.popover && !this.isDisabled) {
      // work around for https://github.com/mattlewis92/angular-confirmation-popover/issues/65
      // otherwise the document click event gets fired after the click event
      // that triggered the popover to open (no idea why this is so)
      setTimeout(() => {
        this.eventListeners = [
          this.renderer.listen('document', 'click', (event: Event) =>
            this.onDocumentClick(event)
          ),
          this.renderer.listen('document', 'touchend', (event: Event) =>
            this.onDocumentClick(event)
          ),
          this.renderer.listen('window', 'resize', () =>
            this.positionPopover()
          ),
        ];
      });

      const options = new ConfirmationPopoverWindowOptions();
      Object.assign(options, this.defaultOptions, {
        onConfirm: (event: ConfirmCancelEvent): void => {
          this.onConfirm(event);
        },
        onCancel: (event: ConfirmCancelEvent): void => {
          this.onCancel(event);
        },
        onAfterViewInit: (): void => {
          this.positionPopover();
        },
      });

      const optionalParams: (keyof ConfirmationPopoverDirective)[] = [
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
        'customTemplate',
        'reverseButtonOrder',
        'popoverTitle',
        'popoverMessage',
      ];
      optionalParams.forEach((param) => {
        if (typeof this[param] !== 'undefined') {
          (options as any)[param] = this[param];
        }
      });
      const childInjector = Injector.create({
        providers: [
          {
            provide: ConfirmationPopoverWindowOptions,
            useValue: options,
          },
        ],
      });
      this.popover = this.viewContainerRef.createComponent(
        ConfirmationPopoverWindowComponent,
        { injector: childInjector }
      );
      if (options.appendToBody) {
        document.body.appendChild(this.popover.location.nativeElement);
      }
      this.isOpenChange.emit(true);
    }
  }

  private positionPopover(): void {
    if (this.popover) {
      const popoverElement = this.popover.location.nativeElement.children[0];
      positionElements(
        this.elm.nativeElement,
        popoverElement,
        this.placement || this.defaultOptions.placement,
        this.appendToBody || this.defaultOptions.appendToBody
      );
    }
  }

  private hidePopover(): void {
    if (this.popover) {
      this.popover.destroy();
      delete this.popover;
      this.isOpenChange.emit(false);
      this.eventListeners.forEach((fn) => fn());
      this.eventListeners = [];
    }
  }
}
