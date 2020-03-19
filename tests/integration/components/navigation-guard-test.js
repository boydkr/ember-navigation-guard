import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navigation-guard', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:navigation-guard');

    await render(hbs`<NavigationGuard @shouldGuard={{false}}/>`);

    assert.equal(service.preventNav, false);
  });

  test('it guards', async function(assert) {
    let service = this.owner.lookup('service:navigation-guard');

    await render(hbs`<NavigationGuard @shouldGuard={{true}} @message='guarding'/>`);

    assert.equal(service.preventNav, true);
    assert.equal(service.getMessage(), 'guarding');
  });

  test('turn guarding on', async function(assert) {
    let service = this.owner.lookup('service:navigation-guard');

    this.set('guard', false);

    await render(hbs`<NavigationGuard @shouldGuard={{this.guard}} @message='guarding'/>`);
    assert.equal(service.preventNav, false);

    this.set('guard', true);
    assert.equal(service.preventNav, true);
  });

  test('turn guarding off', async function(assert) {
    let service = this.owner.lookup('service:navigation-guard');

    this.set('guard', true);

    await render(hbs`<NavigationGuard @shouldGuard={{this.guard}} @message='guarding'/>`);
    assert.equal(service.preventNav, true);

    this.set('guard', false);
    assert.equal(service.preventNav, false);
  });
});
