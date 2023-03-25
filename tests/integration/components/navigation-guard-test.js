import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navigation-guard', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let service = this.owner.lookup('service:navigation-guard');

    await render(hbs`<NavigationGuard @shouldGuard={{false}}/>`);

    assert.false(service.preventNav);
  });

  test('it guards', async function (assert) {
    let service = this.owner.lookup('service:navigation-guard');

    await render(
      hbs`<NavigationGuard @shouldGuard={{true}} @message='guarding'/>`
    );

    assert.true(service.preventNav);
    assert.strictEqual(service.getMessage(), 'guarding');
  });

  test('turn guarding on', async function (assert) {
    let service = this.owner.lookup('service:navigation-guard');

    this.set('guard', false);

    await render(
      hbs`<NavigationGuard @shouldGuard={{this.guard}} @message='guarding'/>`
    );
    assert.false(service.preventNav);

    this.set('guard', true);
    assert.true(service.preventNav);
  });

  test('turn guarding off', async function (assert) {
    let service = this.owner.lookup('service:navigation-guard');

    this.set('guard', true);

    await render(
      hbs`<NavigationGuard @shouldGuard={{this.guard}} @message='guarding'/>`
    );
    assert.true(service.preventNav);

    this.set('guard', false);
    assert.false(service.preventNav);
  });
});
