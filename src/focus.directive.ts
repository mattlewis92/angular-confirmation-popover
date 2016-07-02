import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer
} from '@angular/core';

/**
 * A helper directive to focus buttons. You will only need this if using a custom template
 */
@Directive({
  selector: '[mwlFocus]'
})
export class Focus implements OnChanges {

  @Input() mwlFocus: boolean;

  constructor(private renderer: Renderer, private elm: ElementRef) {}

  ngOnChanges(changes: any): void {
    if (changes.mwlFocus && this.mwlFocus === true) {
      this.renderer.invokeElementMethod(this.elm.nativeElement, 'focus', []);
    }
  }

}
