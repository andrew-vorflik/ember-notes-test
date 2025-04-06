import { service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class IndexNoteController extends Controller {
  @service('router') router;
  @service storage;

  @tracked isEditing = false; // Состояние режима редактирования
  @tracked editedTitle = ''; // Для редактируемого заголовка
  @tracked editedContent = ''; // Для редактируемого содержимого
  @tracked newComment = '';
  @tracked hasCommentError = false;

  #refreshModel() {
    const owner = getOwner(this);
    const indexRoute = owner.lookup('route:index');
    indexRoute.refresh();
  }

  // Methods with modal window
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
    this.editedTitle = this.model.title; // Устанавливаем текущие данные
    this.editedContent = this.model.content;
  }

  @action
  cancelEditing() {
    this.isEditing = false; // Отменяем режим редактирования
  }

  @action
  async saveChanges() {
    // Сохраняем изменения
    this.model.title = this.editedTitle;
    this.model.content = this.editedContent;

    await this.storage.updateNote(this.model); // Обновляем заметку через сервис

    this.#refreshModel();

    this.isEditing = false; // Выходим из режима редактирования
  }

  // Editing handlers
  @action
  updateEditedTitle(event) {
    this.editedTitle = event.target.value; // Обновляем значение editedTitle
  }

  @action
  updateEditedContent(event) {
    this.editedContent = event.target.value; // Обновляем значение editedContent
  }

  // Add comments
  @action
  addComment(event) {
    event.preventDefault();

    if (this.newComment.trim() === '') {
      this.hasCommentError = true;
      return; // Не добавляем пустые комментарии
    }

    const comment = {
      id: Date.now(), // Уникальный ID для комментария
      text: this.newComment,
    };

    // Добавляем комментарий в начало списка
    this.model.comments = [comment, ...this.model.comments];

    // Сохраняем изменения в модели
    this.storage.updateNote(this.model);

    this.#refreshModel();

    // Очищаем поле ввода
    this.newComment = '';
    this.hasCommentError = false;
  }

  @action
  deleteComment(commentId) {
    // Удаляем комментарий по ID
    this.model.comments = this.model.comments.filter(
      (comment) => comment.id !== commentId,
    );

    this.#refreshModel();

    // Сохраняем изменения в модели
    this.storage.updateNote(this.model);
  }

  @action
  updateNewComment(event) {
    this.newComment = event.target.value;
    this.hasCommentError = false;
    this.#refreshModel();
  }
}
