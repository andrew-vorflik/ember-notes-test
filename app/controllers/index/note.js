import { service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class IndexNoteController extends Controller {
  @service('router') router;
  @service storage;

  @tracked isEditing = false;
  @tracked editedTitle = '';
  @tracked editedContent = '';
  @tracked newComment = '';
  @tracked hasCommentError = false;

  #refreshModel() {
    const owner = getOwner(this);
    const indexRoute = owner.lookup('route:index');
    indexRoute.refresh();
  }

  @action
  closeModal() {
    this.isEditing = false;
    this.router.transitionTo('index');
    this.newComment = '';
    this.hasCommentError = false;
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }

  @action
  deleteNote() {
    const note = this.model;
    this.storage.deleteNote(note.id);

    this.#refreshModel();

    this.router.transitionTo('index');
  }

  // Editing mode
  @action
  enableEditing() {
    this.isEditing = !this.isEditing;
    this.editedTitle = this.model.title;
    this.editedContent = this.model.content;
  }

  @action
  cancelEditing() {
    this.isEditing = false;
  }

  @action
  async saveChanges() {
    this.model.title = this.editedTitle;
    this.model.content = this.editedContent;

    await this.storage.updateNote(this.model);

    this.#refreshModel();

    this.isEditing = false;
  }

  // Editing handlers
  @action
  updateEditedTitle(event) {
    this.editedTitle = event.target.value;
  }

  @action
  updateEditedContent(event) {
    this.editedContent = event.target.value;
  }

  // Add comments
  @action
  addComment(event) {
    event.preventDefault();

    if (this.newComment.trim() === '') {
      this.hasCommentError = true;
      return;
    }

    const comment = {
      id: Date.now(),
      text: this.newComment,
    };

    this.model.comments = [comment, ...this.model.comments];

    this.storage.updateNote(this.model);

    this.#refreshModel();

    this.newComment = '';
    this.hasCommentError = false;
  }

  @action
  deleteComment(commentId) {
    this.model.comments = this.model.comments.filter(
      (comment) => comment.id !== commentId,
    );

    this.#refreshModel();
    this.storage.updateNote(this.model);
  }

  @action
  updateNewComment(event) {
    this.newComment = event.target.value;
    this.hasCommentError = false;
    this.#refreshModel();
  }
}
