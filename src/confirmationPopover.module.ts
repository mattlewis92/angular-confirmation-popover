import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Positioning} from 'positioning';
import {ConfirmationPopover} from './confirmationPopover.directive';
import {ConfirmationPopoverWindow} from './confirmationPopoverWindow.component';
import {Focus} from './focus.directive';
import {ConfirmationPopoverOptions, ConfirmationPopoverOptionsInterface} from './confirmationPopoverOptions.provider';

export const USER_OPTIONS: InjectionToken<string> = new InjectionToken('confirmation popover user options');

export function optionsFactory(userOptions: ConfirmationPopoverOptions): ConfirmationPopoverOptions {
  const options: ConfirmationPopoverOptions = new ConfirmationPopoverOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  declarations: [ConfirmationPopover, ConfirmationPopoverWindow, Focus],
  imports: [CommonModule],
  exports: [ConfirmationPopover, Focus],
  entryComponents: [ConfirmationPopoverWindow]
})
export class ConfirmationPopoverModule {

  static forRoot(options: ConfirmationPopoverOptionsInterface = {}): ModuleWithProviders {

    return {
      ngModule: ConfirmationPopoverModule,
      providers: [{
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: ConfirmationPopoverOptions,
        useFactory: optionsFactory,
        deps: [USER_OPTIONS]
      }, Positioning]
    };

  }

}