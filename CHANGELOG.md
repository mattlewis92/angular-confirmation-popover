# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.4"></a>
## [1.0.4](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v1.0.3...v1.0.4) (2016-10-21)


### Bug Fixes

* **aot:** export confirm directive ([c543bf1](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/c543bf1))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v1.0.2...v1.0.3) (2016-10-21)


### Bug Fixes

* **aot:** export focus directive ([3f43e68](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/3f43e68))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v1.0.1...v1.0.2) (2016-09-28)


### Bug Fixes

* **typings:** don't include references to core-js ([a82acb4](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/a82acb4)), closes [#20](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/20)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v1.0.0...v1.0.1) (2016-09-25)


### Bug Fixes

* use correct module imports ([261dec7](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/261dec7))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.11.3...v1.0.0) (2016-09-25)


### Features

* **position:** export position service from index of the position folder ([6c48a3e](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/6c48a3e))


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
## [0.11.3](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.11.2...v0.11.3) (2016-09-24)


### Bug Fixes

* **aot:** remove private from methods used in templates ([c5ad1d6](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/c5ad1d6))



<a name="0.11.2"></a>
## [0.11.2](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.11.1...v0.11.2) (2016-09-24)


### Bug Fixes

* **aot:** export popover component so aot works ([599021a](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/599021a))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.11.0...v0.11.1) (2016-09-24)


### Bug Fixes

* **aot:** fix typescript errors when using aot ([6827be0](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/6827be0))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.10.2...v0.11.0) (2016-09-24)


### Features

* **build:** support offline template compilation ([b7d518d](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/b7d518d))


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
## [0.10.2](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.10.1...v0.10.2) (2016-09-13)


### Bug Fixes

* **peerDependencies:** allow any version of angular higher than RC5 ([f6add7d](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/f6add7d))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.10.0...v0.10.1) (2016-09-01)


### Bug Fixes

* **angular2:** fix peer dependency to allow for RC6 ([a85cf87](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/a85cf87))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.9.1...v0.10.0) (2016-08-12)


### Features

* upgrade to angular RC5 ([040010d](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/040010d))


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
## [0.9.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.9.0...v0.9.1) (2016-08-04)


### Bug Fixes

* **position:** fix positionining typings ([80a51d3](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/80a51d3))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.8.1...v0.9.0) (2016-08-04)


### Features

* **position:** change the recommended positioning service ([d2a780b](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/d2a780b))


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
## [0.8.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.8.0...v0.8.1) (2016-07-02)
* rebuild with typescript stable instead of nightly


<a name="0.8.0"></a>
# [0.8.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.7.0...v0.8.0) (2016-07-02)


### Features

* use `ComponentFactoryResolver` for creating the popover ([99af89f](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/99af89f))
* **mwlConfirm:** renamed the selector of the mwlConfirm directive ([54a013c](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/54a013c))
* **mwlFocus:** rename focusOn to mwlFocus ([5e3cbe7](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/5e3cbe7))
* **mwlFocus:** rename the mwlFocus directive selector to be camelcased ([724ea47](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/724ea47))


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
# [0.7.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.6.0...v0.7.0) (2016-07-01)


### Features

* use new Compiler service for creating the popover ([2707211](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/2707211))


### BREAKING CHANGES

* angular RC4 or higher is now required to use this module



<a name="0.6.0"></a>
# [0.6.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.5.2...v0.6.0) (2016-06-25)


### Features

* **customTemplate:** allow a custom template to be used for the popover ([ce7fec6](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/ce7fec6)), closes [#6](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/6)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.5.1...v0.5.2) (2016-06-23)


### Bug Fixes

* **isOpen:** fix isOpen attribute that when set would break this module ([fe5516d](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/fe5516d)), closes [#14](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/14)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.5.0...v0.5.1) (2016-06-22)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.4.1...v0.5.0) (2016-06-17)


### Features

* **appendToBody:** add support for appendToBody ([6cfa171](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/6cfa171)), closes [#4](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/4)
* **popoverClass:** allow a custom CSS class to be set on the popover ([e5baed9](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/e5baed9))
* **provide:** remove deprecated provide usage ([36f315f](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/36f315f))


### BREAKING CHANGES

* provide: angular RC2 or greater is now required to use this module



<a name="0.4.1"></a>
## [0.4.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.4.0...v0.4.1) (2016-05-19)


### Bug Fixes

* **angular-cli:** add main module export for angular-cli ([b8b77ac](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/b8b77ac))



<a name="0.4.0"></a>
## [0.4.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.3.3...v0.4.0) (2016-05-10)

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
## [0.3.3](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.3.2...v0.3.3) (2016-05-09)


### Bug Fixes

* dont bundle angular common module with the dist files([9b03f61](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/9b03f61))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.3.1...v0.3.2) (2016-05-09)


### Bug Fixes

* fix typescript error that prevented the module from being imported([252e83e](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/252e83e))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/0.3.0...v0.3.1) (2016-05-09)
* test release of the new publishing script and to update the npm readme


<a name="0.3.0"></a>
# [0.3.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/0.2.0...v0.3.0) (2016-05-07)


### Features

* **position:** rename PositionService to Position ([5c05e4e](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/5c05e4e)), closes [#11](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/11)


### BREAKING CHANGES

* position: PositionService has now been renamed to Position. Use it like so:
```
import {Position} from 'angular2-bootstrap-confirm';
import {PositionService} from 'ng2-bootstrap/components/position';
provide(Position, {useClass: PositionService})
```



<a name="0.2.0"></a>
# [0.2.0](https://github.com/mattlewis92/angular2-bootstrap-confirm/compare/v0.1.0...v0.2.0) (2016-05-07)


### Features

* **angular2:** upgrade to angular2 RC1 ([d4d3c6b](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/d4d3c6b))
* **buttons:** allow hiding of the confirm / cancel buttons ([540b965](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/540b965)), closes [#10](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/10)
* **position:** provide a bundled copy of the position service so ng2-bootstrap isn't required as a peer dependency ([37b295f](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/37b295f))
* allow usage without a module bundler by providing a standalone position bundle ([9ebae67](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/9ebae67)), closes [#8](https://github.com/mattlewis92/angular2-bootstrap-confirm/issues/8)
* add bootstrap v4 classes ([3f4959f2](https://github.com/mattlewis92/angular2-bootstrap-confirm/commit/3f4959f2))

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
