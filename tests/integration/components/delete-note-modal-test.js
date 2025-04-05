import { module, test } from 'qunit';
import { setupRenderingTest } from 'my-project/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | delete-note-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DeleteNoteModal />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <DeleteNoteModal>
        template block text
      </DeleteNoteModal>
    `);

    assert.dom().hasText('template block text');
  });
});
