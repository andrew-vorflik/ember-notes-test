import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service storage;
  @service noteManager;

  @tracked showDeleteNoteModal = false;
  @tracked noteToDelete = null;
  @tracked model;
  @tracked defaultFilteredNotes = this.model;

  @action
  showModal(note = null) {
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
    let deletedNoteId = this.noteToDelete.id || noteId;

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
    event.stopPropagation();
  }

  // Sorting
  @action
  handleSortChange(event) {
    console.log('here', event.target.value);

    const sortOption = event.target.value;

    switch (sortOption) {
      case 'alphabetAsc':
        this.sortNotesByAlphabet('asc');
        break;
      case 'alphabetDesc':
        this.sortNotesByAlphabet('desc');
        break;
      case 'dateAsc':
        this.sortByDate('asc');
        break;
      case 'dateDesc':
        this.sortByDate('desc');
        break;
      case 'commentsAsc':
        this.sortByCommentsCount('asc');
        break;
      case 'commentsDesc':
        this.sortByCommentsCount('desc');
        break;
      default:
        this.sortByDate('asc');
        break;
    }
  }
  @action
  sortNotesByAlphabet(order = 'asc') {
    console.log('service method', order);

    const sortedNotes = this.noteManager.sortByAlphabet(this.model, order);
    this.model = sortedNotes;
  }

  @action
  sortByCommentsCount(order = 'asc') {
    console.log('service method', order);

    const sortedNotes = this.noteManager.sortByCommentsCount(this.model, order);
    this.model = sortedNotes;
  }

  @action
  sortByDate(order = 'asc') {
    console.log('service method date', order);

    const sortedNotes = this.noteManager.sortByDate(this.model, order);
    this.model = sortedNotes;
  }

  // Filter
  @action
  handleFilterChange(event) {
    console.log('here', event.target.value);

    const sortOption = event.target.value;

    switch (sortOption) {
      case 'hasComments':
        this.filterByIsHasComments();
        break;
      case 'hasDescription':
        this.filterByIsHasDescription();
        break;
      case 'none':
        this.clearFilter();
        break;
      default:
        this.clearFilter();
        break;
    }
  }

  @action
  filterByIsHasComments() {
    const filteredNotes = this.noteManager.filterByIsHasComments(
      this.defaultFilteredNotes,
    );

    this.model = filteredNotes;
  }

  @action
  filterByIsHasDescription() {
    const filteredNotes = this.noteManager.filterByIsHasDescription(
      this.defaultFilteredNotes,
    );

    this.model = filteredNotes;
  }

  @action
  clearFilter() {
    this.model = this.defaultFilteredNotes;
  }
}
