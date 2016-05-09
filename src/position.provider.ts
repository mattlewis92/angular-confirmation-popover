import {Injectable} from '@angular/core';

/**
 * A placeholder token that you need to overwrite with the actual Position service
 *
 * ```
 *  // if not also using the ng2-bootstrap module
 * import {PositionService} from 'angular2-bootstrap-confirm/position/position';
 *  // if already using the ng2-bootstrap module
 * import {PositionService} from 'ng2-bootstrap/components/position';
 * import {Position} from 'angular2-bootstrap-confirm';
 *
 * providers: [
 *   provide(Position, {
 *     useClass: PositionService
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