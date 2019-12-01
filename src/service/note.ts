import { INote } from '../database/models/note';
import { INoteStorage, NoteStorage } from '../storage/note';
import { Connection } from 'mongoose';

export interface INoteService {
  getAllNotes(dbConn: Connection): Promise<INote[]>;
  getNote(dbConn: Connection, _id: string): Promise<INote>;
  createNote(dbConn: Connection, title: string, content: string): Promise<INote>;
  deleteNote(dbConn: Connection, _id: string): Promise<INote>;
}

export class NoteService implements INoteService {
  noteStorage: INoteStorage;

  constructor(store?: INoteStorage) {
    if(store) {
      this.noteStorage = store;
    } else {
      this.noteStorage = new NoteStorage();
    }
  }

  getAllNotes(dbConn): Promise<INote[]> {
    return this.noteStorage.getAll(dbConn);
  }

  getNote(dbConn, _id): Promise<INote> {
    return this.noteStorage.get(dbConn, _id);
  }

  createNote(dbConn, title, content): Promise<INote> {
    return this.noteStorage.add(dbConn, title, content);
  }

  deleteNote(dbConn, _id): Promise<INote> {
    return this.noteStorage.delete(dbConn, _id);
  }
}