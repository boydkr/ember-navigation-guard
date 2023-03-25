import config from 'dummy/config/environment';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class Router extends AddonDocsRouter {
  @service navigationGuard;
  @service router;

  location = config.locationType;
  rootURL = config.rootURL;
  constructor() {
    super(...arguments);

    this.router.on('routeWillChange', async (transition) => {
      if (
        this.navigationGuard.preventNav &&
        !window.confirm(this.navigationGuard.getMessage())
      ) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    });
  }
}

Router.map(function () {
  docsRoute(this, function () {
    this.route('index');
  });
});
