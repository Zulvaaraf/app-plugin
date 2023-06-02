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

  getNote() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();
    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new Error('Catatan gagal dihapus, Id tidak ditemukan');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
