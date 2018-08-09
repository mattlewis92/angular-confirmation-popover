# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.2.0"></a>
# [4.2.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v4.1.1...v4.2.0) (2018-08-09)


### Features

* add closeOnOutsideClick input ([1789efa](https://github.com/mattlewis92/angular-confirmation-popover/commit/1789efa))



<a name="4.1.1"></a>
## [4.1.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v4.1.0...v4.1.1) (2018-06-16)


### Bug Fixes

* allow popover title and message to be configured globally ([1253590](https://github.com/mattlewis92/angular-confirmation-popover/commit/1253590)), closes [#77](https://github.com/mattlewis92/angular-confirmation-popover/issues/77)



<a name="4.1.0"></a>
# [4.1.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v4.0.0...v4.1.0) (2018-02-10)


### Features

* add a tag name to the popover window component ([85902d6](https://github.com/mattlewis92/angular-confirmation-popover/commit/85902d6)), closes [#70](https://github.com/mattlewis92/angular-confirmation-popover/issues/70)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.4.2...v4.0.0) (2017-12-24)


### Features

* remove deprecated `title` and `message` options ([872bc8f](https://github.com/mattlewis92/angular-confirmation-popover/commit/872bc8f)), closes [#62](https://github.com/mattlewis92/angular-confirmation-popover/issues/62)
* upgrade to angular 5 ([e463e8c](https://github.com/mattlewis92/angular-confirmation-popover/commit/e463e8c))
* use ng-packagr for bundling the library ([8bc9a0c](https://github.com/mattlewis92/angular-confirmation-popover/commit/8bc9a0c))
* **reverseButtonOrder:** allow the button order to be reversed ([a6ca883](https://github.com/mattlewis92/angular-confirmation-popover/commit/a6ca883))


### BREAKING CHANGES

* **reverseButtonOrder:** By default the cancel button is on the left and the confirm button is on the right.
To get the old behaviour set `reverseButtonOrder` to true. Also flexbox is now required to use this
package, so IE10 or higher is now required to use this package.
* The umd bundle path has changed from
`angular-confirmation-popover/dist/umd/angular-confirmation-popover.js` to
`angular-confirmation-popover/bundles/angular-confirmation-popover.umd.js`
* angular 5 or higher is now required to use this package
* The `title` option has been renamed to `popoverTitle`, and `message` has been renamed to
`popoverMessage`



<a name="3.4.2"></a>
## [3.4.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.4.1...v3.4.2) (2017-12-24)


### Bug Fixes

* **isOpen:** allow an external button click to open the popover ([85be07d](https://github.com/mattlewis92/angular-confirmation-popover/commit/85be07d))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.4.0...v3.4.1) (2017-11-21)


### Bug Fixes

* **popoverMessage:** make it work ([2119556](https://github.com/mattlewis92/angular-confirmation-popover/commit/2119556))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.3.0...v3.4.0) (2017-11-21)


### Bug Fixes

* **aot:** fix aot compiling with angular4 ([b81a45d](https://github.com/mattlewis92/angular-confirmation-popover/commit/b81a45d)), closes [#63](https://github.com/mattlewis92/angular-confirmation-popover/issues/63)


### Features

* **popoverMessage:** add message input alias for consistency ([d134e10](https://github.com/mattlewis92/angular-confirmation-popover/commit/d134e10)), closes [#64](https://github.com/mattlewis92/angular-confirmation-popover/issues/64)



<a name="3.3.0"></a>
# [3.3.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.2.0...v3.3.0) (2017-11-20)


### Bug Fixes

* add support for angular 5 ([02c0048](https://github.com/mattlewis92/angular-confirmation-popover/commit/02c0048)), closes [#60](https://github.com/mattlewis92/angular-confirmation-popover/issues/60)
* make buttons behave as buttons ([e1ffaa3](https://github.com/mattlewis92/angular-confirmation-popover/commit/e1ffaa3)), closes [#58](https://github.com/mattlewis92/angular-confirmation-popover/issues/58)


### Features

* **popoverTitle:** add replacement for title input ([00b0b2c](https://github.com/mattlewis92/angular-confirmation-popover/commit/00b0b2c)), closes [#56](https://github.com/mattlewis92/angular-confirmation-popover/issues/56)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.1.1...v3.2.0) (2017-08-28)


### Features

* support bootstrap 4 beta ([1e5ef68](https://github.com/mattlewis92/angular-confirmation-popover/commit/1e5ef68)), closes [#51](https://github.com/mattlewis92/angular-confirmation-popover/issues/51)


### Performance Improvements

* lazily initialise event handlers ([08eebab](https://github.com/mattlewis92/angular-confirmation-popover/commit/08eebab)), closes [#52](https://github.com/mattlewis92/angular-confirmation-popover/issues/52)



<a name="3.1.1"></a>
## [3.1.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.1.0...v3.1.1) (2017-06-21)


### Bug Fixes

* allow appendToBody to be set globally ([e89eb10](https://github.com/mattlewis92/angular-confirmation-popover/commit/e89eb10)), closes [#45](https://github.com/mattlewis92/angular-confirmation-popover/issues/45) [#46](https://github.com/mattlewis92/angular-confirmation-popover/issues/46)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v3.0.0...v3.1.0) (2017-03-25)


### Features

* expose mouseClick event on confirm / cancel ([e7aac49](https://github.com/mattlewis92/angular-confirmation-popover/commit/e7aac49)), closes [#39](https://github.com/mattlewis92/angular-confirmation-popover/issues/39)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.1.3...v3.0.0) (2017-03-24)


### Bug Fixes

* remove `<template>` deprecation warning ([11f2820](https://github.com/mattlewis92/angular-confirmation-popover/commit/11f2820))


### BREAKING CHANGES

* angular 4.0 or higher is now required to use this module. The
[upgrade](http://angularjs.blogspot.co.uk/2017/03/angular-400-now-available.html) should be seamless
for most users



<a name="2.1.3"></a>
## [2.1.3](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.1.2...v2.1.3) (2017-03-23)


### Bug Fixes

* loosen peer dependency to allow angular 4 ([7e84d3c](https://github.com/mattlewis92/angular-confirmation-popover/commit/7e84d3c))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.1.1...v2.1.2) (2017-01-11)


### Bug Fixes

* **positioning:** fix accidental breaking change for rollup users ([db541cc](https://github.com/mattlewis92/angular-confirmation-popover/commit/db541cc))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.1.0...v2.1.1) (2017-01-07)


### Bug Fixes

* downgrade typescript to fix error when consuming the library ([f8ca343](https://github.com/mattlewis92/angular-confirmation-popover/commit/f8ca343))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.0.3...v2.1.0) (2017-01-07)


### Features

* support latest bootstrap 4 alpha ([daf1a1c](https://github.com/mattlewis92/angular-confirmation-popover/commit/daf1a1c)), closes [#34](https://github.com/mattlewis92/angular-confirmation-popover/issues/34)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.0.2...v2.0.3) (2016-11-08)


### Bug Fixes

* **aot:** fix aot compilation ([5d5818a](https://github.com/mattlewis92/angular-confirmation-popover/commit/5d5818a))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.0.1...v2.0.2) (2016-11-08)


### Bug Fixes

* fix default confirm text ([b7bbced](https://github.com/mattlewis92/angular-confirmation-popover/commit/b7bbced))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v2.0.0...v2.0.1) (2016-11-08)


### Bug Fixes

* rename all internal directives, components and providers ([356f545](https://github.com/mattlewis92/angular-confirmation-popover/commit/356f545))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v1.0.4...v2.0.0) (2016-11-08)


### Bug Fixes

* **aot:** remove aot hacks ([8f6e092](https://github.com/mattlewis92/angular-confirmation-popover/commit/8f6e092)), closes [#27](https://github.com/mattlewis92/angular-confirmation-popover/issues/27)


### Features

* **defaults:** defaults are now configured by passing them via ConfirmModule.forRoot() ([802c1ef](https://github.com/mattlewis92/angular-confirmation-popover/commit/802c1ef))
* **positioning:** the position service is now bundled by default ([c486999](https://github.com/mattlewis92/angular-confirmation-popover/commit/c486999)), closes [#23](https://github.com/mattlewis92/angular-confirmation-popover/issues/23)
* rename ConfirmModule to ConfirmationPopoverModule ([1da24d0](https://github.com/mattlewis92/angular-confirmation-popover/commit/1da24d0))
* rename mwlConfirm to mwlConfirmationPopover ([ef5fcf4](https://github.com/mattlewis92/angular-confirmation-popover/commit/ef5fcf4))
* rename the npm package ([d1cbaa5](https://github.com/mattlewis92/angular-confirmation-popover/commit/d1cbaa5)), closes [#22](https://github.com/mattlewis92/angular-confirmation-popover/issues/22)


### BREAKING CHANGES

* the package name has been renamed from angular2-bootstrap-confirm to angular-confirmation-popover
* the directive selector has changed from mwlConfirm to mwlConfirmationPopover
* The ConfirmModule has been renamed to ConfirmationPopoverModule
* defaults: Before:
```
const defaults = new ConfirmOptions();
defaults.confirmButtonType = 'danger';

providers: [
  {provide: ConfirmOptions, useValue: defaults}
]
```

After:
```
imports: [
  ConfirmModule.forRoot({
    confirmButtonType: 'danger'
  })
]
```
* positioning: There is now no longer any exported `Position` token. To migrate just remove any references to it
* aot: angular 2.1.2 or higher is now required for AOT to work



<a name="1.0.4"></a>
## [1.0.4](https://github.com/mattlewis92/angular-confirmation-popover/compare/v1.0.3...v1.0.4) (2016-10-21)


### Bug Fixes

* **aot:** export confirm directive ([c543bf1](https://github.com/mattlewis92/angular-confirmation-popover/commit/c543bf1))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/mattlewis92/angular-confirmation-popover/compare/v1.0.2...v1.0.3) (2016-10-21)


### Bug Fixes

* **aot:** export focus directive ([3f43e68](https://github.com/mattlewis92/angular-confirmation-popover/commit/3f43e68))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v1.0.1...v1.0.2) (2016-09-28)


### Bug Fixes

* **typings:** don't include references to core-js ([a82acb4](https://github.com/mattlewis92/angular-confirmation-popover/commit/a82acb4)), closes [#20](https://github.com/mattlewis92/angular-confirmation-popover/issues/20)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v1.0.0...v1.0.1) (2016-09-25)


### Bug Fixes

* use correct module imports ([261dec7](https://github.com/mattlewis92/angular-confirmation-popover/commit/261dec7))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.11.3...v1.0.0) (2016-09-25)


### Features

* **position:** export position service from index of the position folder ([6c48a3e](https://github.com/mattlewis92/angular-confirmation-popover/commit/6c48a3e))


### BREAKING CHANGES

* position: Before:
```
import {Positioning} from 'angular2-bootstrap-confirm/position/position';
```

After:
```
import {Positioning} from 'angular2-bootstrap-confirm/position';
```



<a name="0.11.3"></a>
## [0.11.3](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.11.2...v0.11.3) (2016-09-24)


### Bug Fixes

* **aot:** remove private from methods used in templates ([c5ad1d6](https://github.com/mattlewis92/angular-confirmation-popover/commit/c5ad1d6))



<a name="0.11.2"></a>
## [0.11.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.11.1...v0.11.2) (2016-09-24)


### Bug Fixes

* **aot:** export popover component so aot works ([599021a](https://github.com/mattlewis92/angular-confirmation-popover/commit/599021a))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.11.0...v0.11.1) (2016-09-24)


### Bug Fixes

* **aot:** fix typescript errors when using aot ([6827be0](https://github.com/mattlewis92/angular-confirmation-popover/commit/6827be0))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.10.2...v0.11.0) (2016-09-24)


### Features

* **build:** support offline template compilation ([b7d518d](https://github.com/mattlewis92/angular-confirmation-popover/commit/b7d518d))


### BREAKING CHANGES

* build: For System.js users the path to the UMD files has changed:

Before:
```
node_modules/angular2-bootstrap-confirm/angular2-bootstrap-confirm.js
```

After:
```
node_modules/angular2-bootstrap-confirm/dist/umd/angular2-bootstrap-confirm.js
```



<a name="0.10.2"></a>
## [0.10.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.10.1...v0.10.2) (2016-09-13)


### Bug Fixes

* **peerDependencies:** allow any version of angular higher than RC5 ([f6add7d](https://github.com/mattlewis92/angular-confirmation-popover/commit/f6add7d))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.10.0...v0.10.1) (2016-09-01)


### Bug Fixes

* **angular2:** fix peer dependency to allow for RC6 ([a85cf87](https://github.com/mattlewis92/angular-confirmation-popover/commit/a85cf87))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.9.1...v0.10.0) (2016-08-12)


### Features

* upgrade to angular RC5 ([040010d](https://github.com/mattlewis92/angular-confirmation-popover/commit/040010d))


### BREAKING CHANGES

* A peer dependency of angular RC5 is now required.

The `ConfirmPopover` component and `Confirm` directive are now no longer exported. Instead you must use the new `ConfirmModule` module in your apps module like so:

```
import {NgModule} from '@angular/core';
import {ConfirmModule} from 'angular2-bootstrap-confirm';

@NgModule({
  declarations: [MyComponent],
  imports: [ConfirmModule],
  bootstrap: [MyComponent]
})
class MyModule {}
```



<a name="0.9.1"></a>
## [0.9.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.9.0...v0.9.1) (2016-08-04)


### Bug Fixes

* **position:** fix positionining typings ([80a51d3](https://github.com/mattlewis92/angular-confirmation-popover/commit/80a51d3))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.8.1...v0.9.0) (2016-08-04)


### Features

* **position:** change the recommended positioning service ([d2a780b](https://github.com/mattlewis92/angular-confirmation-popover/commit/d2a780b))


### BREAKING CHANGES

* position: The exported service name from the `angular2-bootstrap-confirm/position/position` file has changed from `PositionService` to `Positioning`. To migrate:

Before
```
import {PositionService} from 'angular2-bootstrap-confirm/position/position';
```

After:
```
import {Positioning} from 'angular2-bootstrap-confirm/position/position';
```



<a name="0.8.1"></a>
## [0.8.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.8.0...v0.8.1) (2016-07-02)
* rebuild with typescript stable instead of nightly


<a name="0.8.0"></a>
# [0.8.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.7.0...v0.8.0) (2016-07-02)


### Features

* use `ComponentFactoryResolver` for creating the popover ([99af89f](https://github.com/mattlewis92/angular-confirmation-popover/commit/99af89f))
* **mwlConfirm:** renamed the selector of the mwlConfirm directive ([54a013c](https://github.com/mattlewis92/angular-confirmation-popover/commit/54a013c))
* **mwlFocus:** rename focusOn to mwlFocus ([5e3cbe7](https://github.com/mattlewis92/angular-confirmation-popover/commit/5e3cbe7))
* **mwlFocus:** rename the mwlFocus directive selector to be camelcased ([724ea47](https://github.com/mattlewis92/angular-confirmation-popover/commit/724ea47))


### BREAKING CHANGES

* mwlConfirm: the CSS selector of the directive has changed from `mwl-confirm` to `mwlConfirm`
* You must now add a `precompile: [ConfirmPopover]`, to any components metadata that uses the confirm
directive like so:

```
import {Component} from '@angular/core';
import {Confirm, ConfirmOptions, ConfirmPopover, Position} from 'angular2-bootstrap-confirm';
@Component({
  selector: 'my-component',
  directives: [
    Confirm
  ],
  precompile: [
    ConfirmPopover
  ],
  ...
})
class MyComponent {
}
```

* mwlFocus: focusOn has been removed in favour of binding directly to the mwlFocus selector. Only relevant if using a custom template.

Before:
```
mwlFocus [focusOn]="condition"
```

After
```
[mwlFocus]="condition"
```
* mwlFocus: the mwlFocus selector has changed from `mwl-focus` to `mwlFocus`. Only relevant if using a custom template.



<a name="0.7.0"></a>
# [0.7.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.6.0...v0.7.0) (2016-07-01)


### Features

* use new Compiler service for creating the popover ([2707211](https://github.com/mattlewis92/angular-confirmation-popover/commit/2707211))


### BREAKING CHANGES

* angular RC4 or higher is now required to use this module



<a name="0.6.0"></a>
# [0.6.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.5.2...v0.6.0) (2016-06-25)


### Features

* **customTemplate:** allow a custom template to be used for the popover ([ce7fec6](https://github.com/mattlewis92/angular-confirmation-popover/commit/ce7fec6)), closes [#6](https://github.com/mattlewis92/angular-confirmation-popover/issues/6)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.5.1...v0.5.2) (2016-06-23)


### Bug Fixes

* **isOpen:** fix isOpen attribute that when set would break this module ([fe5516d](https://github.com/mattlewis92/angular-confirmation-popover/commit/fe5516d)), closes [#14](https://github.com/mattlewis92/angular-confirmation-popover/issues/14)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.5.0...v0.5.1) (2016-06-22)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.4.1...v0.5.0) (2016-06-17)


### Features

* **appendToBody:** add support for appendToBody ([6cfa171](https://github.com/mattlewis92/angular-confirmation-popover/commit/6cfa171)), closes [#4](https://github.com/mattlewis92/angular-confirmation-popover/issues/4)
* **popoverClass:** allow a custom CSS class to be set on the popover ([e5baed9](https://github.com/mattlewis92/angular-confirmation-popover/commit/e5baed9))
* **provide:** remove deprecated provide usage ([36f315f](https://github.com/mattlewis92/angular-confirmation-popover/commit/36f315f))


### BREAKING CHANGES

* provide: angular RC2 or greater is now required to use this module



<a name="0.4.1"></a>
## [0.4.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.4.0...v0.4.1) (2016-05-19)


### Bug Fixes

* **angular-cli:** add main module export for angular-cli ([b8b77ac](https://github.com/mattlewis92/angular-confirmation-popover/commit/b8b77ac))



<a name="0.4.0"></a>
## [0.4.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.3.3...v0.4.0) (2016-05-10)

### Features

**ConfirmOptions:** allow confirm options to be instantiated by angulars DI
    
### BREAKING CHANGES

* the constructor of ConfirmOptions now no longer takes an object of values.

This allows you to just pass `ConfirmOptions` directly to the providers of your app or component and angular will instantiate it for you. e.g.

```
providers: [ConfirmOptions], // previously angular would throw and you'd have to instantiate it yourself with useFactory
```

To migrate:

Before:
```
const options = new ConfirmOptions({
  focusButton: 'confirm'
});
```

After:
```
const options = new ConfirmOptions();
Object.assign(options, {
  focusButton: 'confirm'
});
```


<a name="0.3.3"></a>
## [0.3.3](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.3.2...v0.3.3) (2016-05-09)


### Bug Fixes

* dont bundle angular common module with the dist files([9b03f61](https://github.com/mattlewis92/angular-confirmation-popover/commit/9b03f61))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.3.1...v0.3.2) (2016-05-09)


### Bug Fixes

* fix typescript error that prevented the module from being imported([252e83e](https://github.com/mattlewis92/angular-confirmation-popover/commit/252e83e))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/mattlewis92/angular-confirmation-popover/compare/0.3.0...v0.3.1) (2016-05-09)
* test release of the new publishing script and to update the npm readme


<a name="0.3.0"></a>
# [0.3.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/0.2.0...v0.3.0) (2016-05-07)


### Features

* **position:** rename PositionService to Position ([5c05e4e](https://github.com/mattlewis92/angular-confirmation-popover/commit/5c05e4e)), closes [#11](https://github.com/mattlewis92/angular-confirmation-popover/issues/11)


### BREAKING CHANGES

* position: PositionService has now been renamed to Position. Use it like so:
```
import {Position} from 'angular2-bootstrap-confirm';
import {PositionService} from 'ng2-bootstrap/components/position';
provide(Position, {useClass: PositionService})
```



<a name="0.2.0"></a>
# [0.2.0](https://github.com/mattlewis92/angular-confirmation-popover/compare/v0.1.0...v0.2.0) (2016-05-07)


### Features

* **angular2:** upgrade to angular2 RC1 ([d4d3c6b](https://github.com/mattlewis92/angular-confirmation-popover/commit/d4d3c6b))
* **buttons:** allow hiding of the confirm / cancel buttons ([540b965](https://github.com/mattlewis92/angular-confirmation-popover/commit/540b965)), closes [#10](https://github.com/mattlewis92/angular-confirmation-popover/issues/10)
* **position:** provide a bundled copy of the position service so ng2-bootstrap isn't required as a peer dependency ([37b295f](https://github.com/mattlewis92/angular-confirmation-popover/commit/37b295f))
* allow usage without a module bundler by providing a standalone position bundle ([9ebae67](https://github.com/mattlewis92/angular-confirmation-popover/commit/9ebae67)), closes [#8](https://github.com/mattlewis92/angular-confirmation-popover/issues/8)
* add bootstrap v4 classes ([3f4959f2](https://github.com/mattlewis92/angular-confirmation-popover/commit/3f4959f2))

### BREAKING CHANGES

* position: you now need to provide the position service for the directive to use like so:
```
import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Confirm, ConfirmOptions, PositionService} from 'angular2-bootstrap-confirm';
import {PositionService as Ng2PositionService} from 'ng2-bootstrap/components/position';
// Or if you don't want to depend on the ng2-bootstrap module, use the bundled position service:
// import {PositionService as Ng2PositionService} from 'angular2-bootstrap-confirm/position/position';
bootstrap(MyApp, [
   provide(PositionService, {useClass: Ng2PositionService})
]);
```
* angular2: a peer dependency of angular2 RC1 is now required



# 0.1.0
_Initial release_
