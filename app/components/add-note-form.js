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

    this.formSubmitted = true;

    const newNote = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      createdAt: new Date(),
      comments: [],
    };

    if (!this.title.trim()) {
      this.hasTitleError = true;
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
