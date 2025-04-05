import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service storage;

  @action
  async deleteNote(noteId) {
    console.log(`Удаление заметки с ID: ${noteId}`);
    // Удаляем заметку через сервис
    await this.storage.deleteNote(noteId);
    this.model = await this.storage.getNotes(); // Обновляем модель напрямую
  }
}
