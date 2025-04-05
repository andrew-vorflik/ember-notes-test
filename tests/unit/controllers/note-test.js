import { module, test } from 'qunit';
import { setupTest } from 'my-project/tests/helpers';

module('Unit | Controller | note', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:note');
    assert.ok(controller);
  });
});
