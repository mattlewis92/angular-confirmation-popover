import {NgModule, ModuleWithProviders, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Confirm} from './confirm.directive';
import {ConfirmPopover} from './confirmPopover.component';
import {Focus} from './focus.directive';
import {ConfirmOptions, ConfirmOptionsInterface} from './confirmOptions.provider';

const USER_OPTIONS: OpaqueToken = new OpaqueToken('confirmation popover user options');

export function optionsFactory(userOptions: ConfirmOptions): ConfirmOptions {
  const options: ConfirmOptions = new ConfirmOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  declarations: [Confirm, ConfirmPopover, Focus],
  imports: [CommonModule],
  exports: [Confirm, Focus],
  entryComponents: [ConfirmPopover]
})
export class ConfirmModule {

  static forRoot(options?: ConfirmOptionsInterface): ModuleWithProviders {

    return {
      ngModule: ConfirmModule,
      providers: [{
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: ConfirmOptions,
        useFactory: optionsFactory,
        deps: [USER_OPTIONS]
      }]
    };

  }

}