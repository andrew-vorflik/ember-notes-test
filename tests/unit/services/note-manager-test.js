import { module, test } from 'qunit';
import { setupTest } from 'my-project/tests/helpers';

module('Unit | Service | note-manager', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:note-manager');
    assert.ok(service);
  });
});
