// app/components/add-note-form.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AddNoteFormComponent extends Component {
  @service storage;

  @tracked title = '';
  @tracked formSubmitted = false;
  @tracked hasTitleError = false;
  @tracked content = '';

  @action
  saveNote(event) {
    event.preventDefault();

    console.log('this.hasTitleError', this.hasTitleError);

    this.formSubmitted = true;

    const newNote = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      comments: [],
    };

    if (!this.title.trim()) {
      console.log('trim');

      this.hasTitleError = true; // Устанавливаем ошибку, если заголовок пуст
      return;
    }
    this.storage.addNote(newNote);

    this.title = '';
    this.content = '';

    this.formSubmitted = false;
    this.hasTitleError = false;

    this.args.addNote(newNote);
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
