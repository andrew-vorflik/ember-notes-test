import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service storage;
  @tracked showDeleteNoteModal = false;
  @tracked noteToDelete = null;

  @action
  showModal(note = null) {
    console.log('here');

    this.showDeleteNoteModal = true;
    this.noteToDelete = note;
  }

  @action
  closeModal() {
    this.showDeleteNoteModal = false;
    this.noteToDelete = null;
  }

  @action
  async deleteNote(noteId = null) {
    console.log('noteId', noteId);

    let deletedNoteId = this.noteToDelete.id || noteId;
    console.log('deletedNote', deletedNoteId);
    console.log(`Удаление заметки с ID: ${deletedNoteId}`);
    // Удаляем заметку через сервис
    await this.storage.deleteNote(deletedNoteId);
    this.model = await this.storage.getNotes(); // Обновляем модель напрямую

    if (this.noteToDelete !== null) {
      this.closeModal();
    }
  }

  @action
  addNote(newNote) {
    this.model = [newNote, ...this.model];
  }

  @action
  stopPropagation(event) {
    console.log('stopPropagation');

    event.stopPropagation();
  }
}
