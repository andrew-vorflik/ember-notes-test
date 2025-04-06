import { module, test } from 'qunit';
import { setupRenderingTest } from 'my-project/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | theme-toggle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ThemeToggle />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ThemeToggle>
        template block text
      </ThemeToggle>
    `);

    assert.dom().hasText('template block text');
  });
});
