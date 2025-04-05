import { module, test } from 'qunit';
import { setupTest } from 'my-project/tests/helpers';

module('Unit | Route | note', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:note');
    assert.ok(route);
  });
});
