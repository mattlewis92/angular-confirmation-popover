import {Injectable} from '@angular/core';

@Injectable()
export abstract class PositionService {

  constructor() {
    throw new Error('You must provide a service that implements the PositionService when bootstrapping your app.');
  }

  abstract positionElements(hostEl: any, targetEl: any, positionStr: any, appendToBody: any): any

}