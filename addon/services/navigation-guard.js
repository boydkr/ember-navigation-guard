import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TrackedMap } from 'tracked-maps-and-sets';
import { some, find, findLast } from 'lodash/collection';

class GuardReg {
  @tracked guarding = false;
  @tracked message = '';

  constructor(guard, msg = '') {
    this.guarding = guard;
    this.message = msg;
  }
}

export default class NavigationGuardService extends Service {
  _registrations = new TrackedMap();
  nextKey = 0;

  @service('browser/window') window;

  constructor() {
    super(...arguments);
    this.window.onbeforeunload = (e) => {
      if (!this.preventNav) return undefined;
      e = e || this.window.event;

      //old browsers
      if (e) {
        e.returnValue = 'Sure?';
      }

      return 'Sure?';
    };
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this._registrations.clear();
    this.window.onbeforeunload = null;
  }

  register(msg = '') {
    let key = this.nextKey++;
    this._registrations.set(key, new GuardReg(false, msg));
    return key;
  }

  unregister(key) {
    this._registrations.delete(key);
  }

  updateGuard(key, value) {
    if (!this._registrations.has(key)) {
      return;
    }

    const guard = this._registrations.get(key);

    if (value !== guard.guarding) {
      guard.guarding = value;
      //this._registrations.set(key, new GuardReg(value, guard.message));
    }
  }

  get preventNav() {
    return some(Array.from(this._registrations.values()), 'guarding');
  }

  getMessage(options = {}) {
    let last = options.last;
    let guard;
    if (last) {
      guard = this.lastMessage;
    } else {
      guard = this.firstMessage;
    }

    return guard && guard.message;
  }

  get firstMessage() {
    return find(Array.from(this._registrations.values()), 'guarding');
  }

  get lastMessage() {
    return findLast(Array.from(this._registrations.values()), 'guarding');
  }
}
