import {Directive, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
  selector: '[mwl-confirm]'
})
export class Confirm {

  @Input() title: string;
  @Input() message: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Input() placement: string;
  @Input() confirmButtonType: string;
  @Input() cancelButtonType: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

}