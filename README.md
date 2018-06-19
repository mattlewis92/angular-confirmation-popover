# Angular confirmation popover
[![Build Status](https://travis-ci.org/mattlewis92/angular-confirmation-popover.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-confirmation-popover)
[![codecov](https://codecov.io/gh/mattlewis92/angular-confirmation-popover/branch/master/graph/badge.svg)](https://codecov.io/gh/mattlewis92/angular-confirmation-popover)
[![npm version](https://badge.fury.io/js/angular-confirmation-popover.svg)](http://badge.fury.io/js/angular-confirmation-popover)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-confirmation-popover/dev-status.svg)](https://david-dm.org/mattlewis92/angular-confirmation-popover?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-confirmation-popover.svg)](https://github.com/mattlewis92/angular-confirmation-popover/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-confirmation-popover.svg)](https://github.com/mattlewis92/angular-confirmation-popover/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-confirmation-popover/master/LICENSE)

## Demo
https://mattlewis92.github.io/angular-confirmation-popover/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A simple angular 5.0+ directive to display a bootstrap styled confirmation popover when an element is clicked.

[AngularJS 1.x version](https://github.com/mattlewis92/angular-bootstrap-confirm)

## Installation

Install through npm:
```
npm install --save angular-confirmation-popover
```

Then use it in your app on a component:

```typescript
 // include bootstrap - both v3 and v4 are supported
 // if not using bootstrap you could implement the popover styles yourself
import 'bootstrap/dist/css/bootstrap.css';
import { NgModule, Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

// first add it to your apps module
@NgModule({
  declarations: [MyComponent],
  imports: [
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  bootstrap: [MyComponent]
})
class MyModule {}

// now use it within your component
@Component({
  selector: 'my-component',
  template: `
    <button
      class="btn btn-default"
      mwlConfirmationPopover
      [popoverTitle]="popoverTitle"
      [popoverMessage]="popoverMessage"
      placement="left"
      (confirm)="confirmClicked = true"
      (cancel)="cancelClicked = true">
      Click me!
    </button>
  `
})
class MyComponent {
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
}

```

You may also find it useful to view the [demo source](https://github.com/mattlewis92/angular-confirmation-popover/blob/master/demo/demo.component.ts).

## Documentation
All documentation is auto-generated from the source via compodoc and can be viewed here:
https://mattlewis92.github.io/angular-confirmation-popover/docs/

The main `mwlConfirmationPopover` directive options can be viewed [here](https://mattlewis92.github.io/angular-confirmation-popover/docs/directives/ConfirmationPopover.html).

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
