const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNotes({ title, tags, body }) {
    const id = nanoid(10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
      id,
      title,
      tags,
      body,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNotes);

    const isSucces = this._notes.filter((n) => n.id === id).length > 0;
    if (!isSucces) {
      throw new Error('Catatan gagal ditambahakan');
    }
    return id;
  }
}
