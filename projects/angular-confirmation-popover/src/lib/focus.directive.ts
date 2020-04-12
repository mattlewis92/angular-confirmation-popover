import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

/**
 * A helper directive to focus buttons. You will only need this if using a custom template
 */
@Directive({
  selector: '[mwlFocus]'
})
export class FocusDirective implements OnChanges {
  @Input() mwlFocus: boolean;

  constructor(private elm: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mwlFocus && this.mwlFocus === true) {
      this.elm.nativeElement.focus();
    }
  }
}
