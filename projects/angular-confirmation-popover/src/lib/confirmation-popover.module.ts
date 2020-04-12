import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverDirective } from './confirmation-popover.directive';
import { ConfirmationPopoverWindowComponent } from './confirmation-popover-window.component';
import { FocusDirective } from './focus.directive';
import {
  ConfirmationPopoverOptions,
  ConfirmationPopoverOptionsInterface,
} from './confirmation-popover-options.provider';

export const USER_OPTIONS: InjectionToken<string> = new InjectionToken(
  'confirmation popover user options'
);

export function optionsFactory(
  userOptions: ConfirmationPopoverOptions
): ConfirmationPopoverOptions {
  const options: ConfirmationPopoverOptions = new ConfirmationPopoverOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  declarations: [
    ConfirmationPopoverDirective,
    ConfirmationPopoverWindowComponent,
    FocusDirective,
  ],
  imports: [CommonModule],
  exports: [ConfirmationPopoverDirective, FocusDirective],
  entryComponents: [ConfirmationPopoverWindowComponent],
})
export class ConfirmationPopoverModule {
  static forRoot(
    options: ConfirmationPopoverOptionsInterface = {}
  ): ModuleWithProviders {
    return {
      ngModule: ConfirmationPopoverModule,
      providers: [
        {
          provide: USER_OPTIONS,
          useValue: options,
        },
        {
          provide: ConfirmationPopoverOptions,
          useFactory: optionsFactory,
          deps: [USER_OPTIONS],
        },
      ],
    };
  }
}
