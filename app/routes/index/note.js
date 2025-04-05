import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NoteRoute extends Route {
  @service('router') router;
  @service storage;

  model(params) {
    return this.storage.getNoteById(Number(params.note_id));
  }
}
