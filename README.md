# Angular confirmation popover

[![Sponsorship](https://img.shields.io/badge/funding-github-%23EA4AAA)](https://github.com/users/mattlewis92/sponsorship)
[![CI](https://github.com/mattlewis92/angular-confirmation-popover/actions/workflows/ci.yml/badge.svg)](https://github.com/mattlewis92/angular-confirmation-popover/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/mattlewis92/angular-confirmation-popover/branch/main/graph/badge.svg)](https://codecov.io/gh/mattlewis92/angular-confirmation-popover)
[![npm version](https://badge.fury.io/js/angular-confirmation-popover.svg)](http://badge.fury.io/js/angular-confirmation-popover)
[![Twitter Follow](https://img.shields.io/twitter/follow/mattlewis92_.svg)](https://twitter.com/mattlewis92_)

## Demo

https://mattlewis92.github.io/angular-confirmation-popover/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A simple angular 15.0+ directive to display a bootstrap styled confirmation popover when an element is clicked.

[AngularJS 1.x version](https://github.com/mattlewis92/angular-bootstrap-confirm)

## Installation

1. Install through npm:

```
npm install angular-confirmation-popover
```

2. Install bootstrap (both v3 and v4 are supported). If not using bootstrap you could implement the popover styles yourself.

3. Add the NgModule:

```typescript
import { NgModule, Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [MyComponent],
  imports: [
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ],
  bootstrap: [MyComponent],
})
class MyModule {}
```

4. Now use it within your component

```typescript
@Component({
  selector: 'my-component',
  template: ` <button class="btn btn-outline-secondary" mwlConfirmationPopover [popoverTitle]="popoverTitle" [popoverMessage]="popoverMessage" placement="left" (confirm)="confirmClicked = true" (cancel)="cancelClicked = true">Click me!</button> `,
})
class MyComponent {
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;
}
```

You may also find it useful to view the [demo source](https://github.com/mattlewis92/angular-confirmation-popover/blob/main/projects/demo/app).

## Documentation

All documentation is auto-generated from the source via compodoc and can be viewed here:
https://mattlewis92.github.io/angular-confirmation-popover/docs/

The main `mwlConfirmationPopover` directive options can be viewed [here](https://mattlewis92.github.io/angular-confirmation-popover/docs/directives/ConfirmationPopoverDirective.html).

## Development

### Prepare your environment

- Install [Node.js](http://nodejs.org/)
- Install pnpm: `corepack enable`
- Install local dev dependencies: `pnpm install` while current directory is this repo

### Development server

Run `pnpm start` to start a development server on port 8000 with auto reload + tests.

### Testing

Run `pnpm test` to run tests once or `pnpm test:watch` to continually run tests.

### Release

```bash
pnpm release
```

## License

MIT
