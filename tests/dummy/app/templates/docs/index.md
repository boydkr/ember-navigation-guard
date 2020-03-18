The purpose of `ember-navigation-guard` is to prevent accidental data loss due to navigation.

# Component

Add the `NavigationGuard` component and set `shouldGuard` when you want to protect against navigation.

By default, it will set the browser's `onbeforeunload` function to prompt the user.

### Basic Usage
``` 
<NavigationGuard @shouldGuard={{true}} @message="Guarding against navigation"/>
```

# Service

The `navigation-guard` service allows you to check if there are any components currently guarding against navigation

```
@service navigationGuard;
...
let currentlyGuarding = this.navigationGuard.preventNav;
let firstGuardingMessage = this.navigationGuard.getMessage();
let lastGuardingMessage = this.navigationGuard.getMessage({last: true});
```


# Hooking into the Router

You can add the `willTransition` hook in your main `route.js` to check the `navigation-guard` service

```router.js
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