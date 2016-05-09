# Angular bootstrap confirm
[![Build Status](https://travis-ci.org/mattlewis92/angular2-bootstrap-confirm.svg?branch=master)](https://travis-ci.org/mattlewis92/angular2-bootstrap-confirm)
[![npm version](https://badge.fury.io/js/angular2-bootstrap-confirm.svg)](http://badge.fury.io/js/angular2-bootstrap-confirm)
[![devDependency Status](https://david-dm.org/mattlewis92/angular2-bootstrap-confirm/dev-status.svg)](https://david-dm.org/mattlewis92/angular2-bootstrap-confirm#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular2-bootstrap-confirm.svg)](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular2-bootstrap-confirm.svg)](https://github.com/mattlewis92/angular2-bootstrap-confirm/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular2-bootstrap-confirm/master/LICENSE)

## Demo
https://mattlewis92.github.io/angular2-bootstrap-confirm/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A simple angular2 directive to display a bootstrap styled confirmation popover when an element is clicked.

Pull requests are welcome.

[AngularJS 1.x version](https://github.com/mattlewis92/angular-bootstrap-confirm)

## Installation

Install through npm:
```
npm install --save @angular/core@2.0.0-rc.1 angular2-bootstrap-confirm
```

Then use it in your app on a component:

```typescript
import {Component, provide} from '@angular/core';
import {Confirm, ConfirmOptions, Position} from 'angular2-bootstrap-confirm';
import {PositionService} from 'angular2-bootstrap-confirm/position/position';
// Or if you're already using the ng2-bootstrap module
// import {PositionService} from 'ng2-bootstrap/components/position';

@Component({
  selector: 'my-component',
  providers: [ // you can pass both of these when bootstrapping the app to configure globally throughout your app
    provide(ConfirmOptions, { // can't currently just pass in ConfirmOptions directly due to this bug: https://github.com/angular/angular/issues/8519 
      useFactory: (): ConfirmOptions => {
        return new ConfirmOptions();
      }
    }),
    provide(Position, { // this is required so you can use the bundled position service rather than rely on the `ng2-bootstrap` module
      useClass: PositionService
    })
  ],
  directives: [
    Confirm
  ],
  template: `
    <button
      class="btn btn-default"
      mwl-confirm
      [title]="title"
      [message]="message"
      placement="left"
      (confirm)="confirmClicked = true"
      (cancel)="cancelClicked = true"
      [(isOpen)]="isOpen">
      Click me!
    </button>
  `
})
class MyComponent {
  public title: string = 'Popover title';
  public message: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public isOpen: boolean = false;
}
```

You may also find it useful to view the [demo source](https://github.com/mattlewis92/angular2-bootstrap-confirm/blob/master/demo/entry.ts).

### Usage without a module bundler
```
<script src="node_modules/angular2-bootstrap-confirm/position/position.js"></script>
<script src="node_modules/angular2-bootstrap-confirm/angular2-bootstrap-confirm.js"></script>
<script>
    // position service available as ng2BootstrapPosition.PositionService
    // confirm options, directive and position token available as ng2BootstrapConfirm.ConfirmOptions, ng2BootstrapConfirm.Confirm, ng2BootstrapConfirm.Position
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://mattlewis92.github.io/angular2-bootstrap-confirm/docs/

The main confirm directive options can be viewed [here](https://mattlewis92.github.io/angular2-bootstrap-confirm/docs/classes/confirm.html).

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests. 

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
```bash
npm run release
```

## License

MIT
