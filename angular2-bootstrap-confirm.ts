import {Confirm} from './src/confirm.directive';
import {ConfirmOptions} from './src/confirmOptions.provider';
import {Position} from './src/position.provider';
import {Focus} from './src/focus.directive';
import {ConfirmPopover} from './src/confirmPopover.component';

export * from './src/confirm.directive';
export {ConfirmOptions} from './src/confirmOptions.provider';
export * from './src/position.provider';
export * from './src/focus.directive';
export * from './src/confirmPopover.component';

// for angular-cli
export default {
  providers: [ConfirmOptions, Position],
  directives: [Confirm, Focus, ConfirmPopover]
};
