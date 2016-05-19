import {Confirm} from './src/confirm.directive';
import {ConfirmOptions} from './src/confirmOptions.provider';
import {Position} from './src/position.provider';

export * from './src/confirm.directive';
export {ConfirmOptions} from './src/confirmOptions.provider';
export * from './src/position.provider';

// for angular-cli
export default {
  providers: [ConfirmOptions, Position],
  directives: [Confirm]
};
