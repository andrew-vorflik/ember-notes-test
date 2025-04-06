import Service from '@ember/service';

export default class NoteManagerService extends Service {
  // Sorted notes
  sortByAlphabet(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();

      if (order === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  sortByCommentsCount(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const commentsA = a.comments.length;
      const commentsB = b.comments.length;

      if (order === 'asc') {
        return commentsA - commentsB;
      } else {
        return commentsB - commentsA;
      }
    });
  }

  sortByDate(notes, order = 'asc') {
    return notes.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (order === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
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

  //Searching
  searchNotes(notes, searchText = '') {
    const normalizedSearchText = searchText.toLowerCase();

    return notes.filter((note) => {
      const titleMatches = note.title
        .toLowerCase()
        .includes(normalizedSearchText);
      const contentMatches =
        note.content &&
        note.content.toLowerCase().includes(normalizedSearchText);

      return titleMatches || contentMatches;
    });
  }
}
