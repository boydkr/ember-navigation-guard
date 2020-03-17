import Service from '@ember/service';
import emberWindow from 'ember-window-mock';
import { tracked } from '@glimmer/tracking';
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
  @tracked _registrations = {};
  nextKey = 0;

  init() {
    super.init(...arguments);
    emberWindow.onbeforeunload = (e) => {
      if (!this.preventNav) return null;
      e = e || window.event;

      //old browsers
      if (e) {
        e.returnValue = 'Sure?';
      }

      return 'Sure?';
    };
  }

  willDestroy() {
    super.willDestroy(...arguments);
    emberWindow.onbeforeunload = null;
  }

  register(msg = '') {
    let key = this.nextKey++;
    this._registrations[key] = new GuardReg(false, msg);
    this._registrations = this._registrations;
    return key;
  }

  unregister(key) {
    delete this._registrations[key];
    this._registrations = this._registrations;
  }

  updateGuard(key, value, message) {
    const guard = this._registrations[key];

    if (!guard) return;

    if (value !== guard.guarding) {
      guard.guarding = value;
    }

    if (message !== undefined) {
      guard.message = message;
    }

    this._registrations = this._registrations;
  }

  get preventNav() {
    return some(Object.values(this._registrations), 'guarding');
  }

  getMessage(first = true) {
    let guard;
    if (first) {
      guard = this.firstMessage;
    } else {
      guard = this.lastMessage;
    }

    return guard && guard.message;
  }

  get firstMessage() {
    return find(Object.values(this._registrations), 'guarding');
  }

  get lastMessage() {
    return findLast(Object.values(this._registrations), 'guarding');
  }
}
