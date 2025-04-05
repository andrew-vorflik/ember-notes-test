// app/components/add-note-form.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AddNoteFormComponent extends Component {
  @service storage;

  @tracked title = '';
  content = '';

  get isSaveDisabled() {
    return this.title.trim() === ''; // Кнопка будет дизейблена, если title пустой
  }

  @action
  saveNote() {
    const newNote = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      comments: [],
    };

    if (this.title.trim() !== '') {
      this.storage.addNote(newNote);

      this.title = '';
      this.content = '';
    }
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateContent(event) {
    this.content = event.target.value;
  }
}
