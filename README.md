[![Node.js CI](https://github.com/boydkr/ember-navigation-guard/workflows/Node.js%20CI/badge.svg)](https://github.com/boydkr/ember-navigation-guard/actions?query=branch%3Amaster) [![Ember Observer Score](https://emberobserver.com/badges/ember-navigation-guard.svg)](https://emberobserver.com/addons/ember-navigation-guard)

ember-navigation-guard
==============================================================================

Prevent accidental user data loss by conditionally guarding route transitions and url navigation.

Here is a [demo app](https://boydkr.github.io/ember-navigation-guard/).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-navigation-guard
```


Usage
------------------------------------------------------------------------------

This addon consists of 1 component and 1 service.

<details>
<summary><code>NavigationGuard</code> component</summary>

The `NavigationGuard` component takes a boolean `@shouldGuard` and an optional string `@message`.

```handlebars
{{!-- app/components/my-component.hbs --}}
<NavigationGuard
  @shouldGuard={{true}}
  @message="This component is preventing navigation"
/>
```

By default, enabling `@shouldGuard` will set the `onbeforeunload` browser hook to prompt on URL changes or window/tab close.  This message is not configurable.
</details>

<details>
<summary><code>navigation-guard</code> service</summary>

To control route transitions within your Ember app, you will need to consume the service in your Router, or elsewhere in your app.

The `navigation-guard` service has a `preventNav` property that will be true when navigation should be prevented.

It also has a `getMessage()` method to retrieve the first message that triggered `preventNav`.  If you want the last message instead, you can use `getMessage({last: true})`.

```javascript
// app/router.js
import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';

export default class Router extends EmberRouter {
  @service navigationGuard;

  ...

  willTransition(_oldRoute, _newRoute, transition) {
    super.willTransition(...arguments);
    if (
      this.navigationGuard.preventNav &&
      !window.confirm(
        this.navigationGuard.getMessage()
      )
    ) {
      transition.abort();
    } else {
      // Bubble the `willTransition` action so that
      // parent routes can decide whether or not to abort.
      return true;
    }
  }
}
...
```
</details>


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
