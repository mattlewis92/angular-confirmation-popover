import {Injectable} from '@angular/core';

/**
 * A placeholder token that you need to overwrite with the actual Position service
 *
 * ```
 *  // if not also using the @ng-bootstrap/ng-bootstrap module
 * import {Positioning} from 'angular2-bootstrap-confirm/position';
 *  // if already using the @ng-bootstrap/ng-bootstrap module
 * import {Positioning} from '@ng-bootstrap/ng-bootstrap/util/positioning';
 * import {Position} from 'angular2-bootstrap-confirm';
 *
 * providers: [
 *   provide(Position, {
 *     useClass: Positioning
 *   })
 * ]
 * ```
 */
@Injectable()
export abstract class Position {

  constructor() {
    throw new Error('You must provide a service that implements the Position when bootstrapping your app.');
  }

  abstract positionElements(hostEl: any, targetEl: any, positionStr: any, appendToBody: any): any

}