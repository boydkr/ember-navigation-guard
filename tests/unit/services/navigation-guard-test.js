import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | navigation-guard', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:navigation-guard');
    assert.ok(service);
  });
  
  test('default not guarding', function(assert) {
    let service = this.owner.lookup('service:navigation-guard');
    assert.equal(service.preventNav, false);
  });

  test('simple guarding', function(assert) {
    let service = this.owner.lookup('service:navigation-guard');
    let key = service.register('I am guarding')
    service.updateGuard(key, true);
    assert.equal(service.preventNav, true);
  });

  test('simple guard message', function(assert) {
    let service = this.owner.lookup('service:navigation-guard');
    let key = service.register('I am guarding')
    service.updateGuard(key, true);
    assert.equal(service.getMessage(), 'I am guarding');
  });

  test('multiple messages', function(assert) {
    let service = this.owner.lookup('service:navigation-guard');
    let key = service.register('guarding1')
    let key2 = service.register('guarding2')
    service.updateGuard(key, true);
    service.updateGuard(key2, true);
    assert.equal(service.getMessage(), 'guarding1', 'gets first message');
    assert.equal(service.getMessage(false), 'guarding2', 'gets last message');
    service.updateGuard(key, false);
    assert.equal(service.getMessage(), 'guarding2', 'gets first remaining message');
    service.updateGuard(key2, false);
    assert.equal(service.preventNav, false, 'preventNav disabled');
  });
});
