import Service from '@ember/service';

export default class NoteManagerService extends Service {
  // Sorted notes
  sortByAlphabet(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const nameA = a.title.toLowerCase(); // предполагаем, что у заметок есть свойство title
      const nameB = b.title.toLowerCase();

      if (order === 'asc') {
        return nameA.localeCompare(nameB); // от A к Z
      } else {
        return nameB.localeCompare(nameA); // от Z к A
      }
    });
  }

  // Сортировка по количеству комментариев
  sortByCommentsCount(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const commentsA = a.comments.length; // предполагаем, что у заметок есть свойство comments (массив)
      const commentsB = b.comments.length;

      if (order === 'asc') {
        return commentsA - commentsB; // от меньшего к большему
      } else {
        return commentsB - commentsA; // от большего к меньшему
      }
    });
  }

  sortByDate(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const dateA = new Date(a.createdAt); // предполагаем, что у заметок есть свойство createdAt
      const dateB = new Date(b.createdAt);

      console.log(dateA, dateB, dateA - dateB);

      if (order === 'asc') {
        return dateA - dateB; // от старых к новым
      } else {
        return dateB - dateA; // от новых к старым
      }
    });
  }

  //Filters
  filterByIsHasComments(notes) {
    return notes.filter((note) => {
      return note.comments.length > 0;
    });
  }

  filterByIsHasDescription(notes) {
    return notes.filter((note) => {
      return note.content.length > 0;
    });
  }
}
