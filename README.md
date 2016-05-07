# Angular bootstrap confirm
[![Build Status](https://travis-ci.org/mattlewis92/angular2-bootstrap-confirm.svg?branch=master)](https://travis-ci.org/mattlewis92/angular2-bootstrap-confirm)
[![npm version](https://badge.fury.io/js/angular2-bootstrap-confirm.svg)](http://badge.fury.io/js/angular2-bootstrap-confirm)
[![devDependency Status](https://david-dm.org/mattlewis92/angular2-bootstrap-confirm/dev-status.svg)](https://david-dm.org/mattlewis92/angular2-bootstrap-confirm#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular2-bootstrap-confirm.svg)](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular2-bootstrap-confirm.svg)](https://github.com/mattlewis92/angular2-bootstrap-confirm/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular2-bootstrap-confirm/master/LICENSE)

## Demo
http://mattlewis92.github.io/angular2-bootstrap-confirm/

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
npm install --save angular2@2.0.0-beta.17 ng2-bootstrap@1 angular2-bootstrap-confirm
```

Then use it in your app on a component:

```typescript
import {Component, provide} from '@angular/core';
import {Confirm, ConfirmOptions, PositionService} from 'angular2-bootstrap-confirm';
import {PositionService as Ng2PositionService} from 'ng2-bootstrap/components/position';
// Or if you don't want to depend on the ng2-bootstrap module, use the bundled position service:
// import {PositionService as Ng2PositionService} from 'angular2-bootstrap-confirm/position/position';

@Component({
  selector: 'my-component',
  providers: [
    ConfirmOptions,
    provide(PositionService, {useClass: Ng2PositionService}) // this is required so you can use the bundled position service rather than rely on the `ng2-bootstrap` module
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

## Documentation

### mwl-confirm directive options

All options can be configured either on a per directive instance (see previous example of how to) or globally via a the `ConfirmOptions` provider

To configure globally you need to configure the provider in your app or directive like so:
```
providers: [
 provide(ConfirmOptions, {
   useFactory: (): ConfirmOptions => {
     return new ConfirmOptions({
       focusButton: 'confirm' // focus the confirm button by default. See below for an explanation of all options.
     });
   }
 })
]
```

An explanation of each option available is as follows:

#### title
The title of the popover. Note, if you use an expression, you may want to consider using "data-title" instead of "title" so that the browser doesn't show native tooltips with the angular expression listed.

#### message
The body text of the popover.

#### confirmText
The text of the confirm button. Default `Confirm`

#### cancelText
The text of the cancel button. Default `Cancel`

#### placement
The placement of the popover. It can be either `top`, `right`, `bottom` or `left`. Default `top`

#### confirm
An expression that is called when the confirm button is clicked.

#### cancel
An expression that is called when the cancel button is clicked.

#### confirmButtonType
The bootstrap button type of the confirm button. It can be any supported bootstrap color type e.g. `default`, `warning`, `danger` etc. Default `success`

#### cancelButtonType
The bootstrap button type of the cancel button. It can be any supported bootstrap color type e.g. `default`, `warning`, `danger` etc. Default `default`

#### isOpen
A 2-way bound variable to control if the popover is currently open or not.

#### focusButton
Set to either `confirm` or `cancel` to focus the confirm or cancel button. If omitted, by default it will not focus either button.

#### isDisabled
Whether to disable showing the popover. Default `false`.

#### hideConfirmButton
Whether to hide the confirm button. Default `false`.

#### hideCancelButton
Whether to hide the cancel button. Default `false`.

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests. 

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

## License

MIT
