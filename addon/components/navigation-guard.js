import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavigationGuardComponent extends Component {
  @service navigationGuard;

  @tracked regKey;

  constructor() {
    super(...arguments);
    this.regKey = this.navigationGuard.register(this.args.message);
  }

  @action
  updateService() {
    this.navigationGuard.updateGuard(this.regKey, this.args.shouldGuard, this.args.message);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.navigationGuard.unregister(this.regKey);
  }
}
