import Service from '@ember/service';

export default class StorageService extends Service {
  getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }

  saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  addNote(newNote) {
    const notes = this.getNotes();
    notes.push(newNote);
    this.saveNotes(notes);
  }

  getNoteById(noteId) {
    const notes = this.getNotes();
    return notes.find((note) => note.id === noteId);
  }

  deleteNote(noteId) {
    let notes = this.getNotes();
    notes = notes.filter((note) => note.id !== noteId);
    this.saveNotes(notes);
  }

  updateNote(updatedNote) {
    const notes = this.getNotes();
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = updatedNote;
      this.saveNotes(notes); // Сохраняем обновленные заметки
    }
  }
}
