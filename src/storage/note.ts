import { Connection, Model } from 'mongoose';
import NoteModel, { INote } from '../database/models/note';
import { ApolloError } from 'apollo-server-lambda';
import dayjs from 'dayjs';

export interface INoteStorage {
  getAll(dbConn): Promise<INote[]>;
  get(dbConn, _id: string): Promise<INote>;
  add(dbConn, title: string, content: string): Promise<INote>;
  delete(dbConn, _id: string): Promise<INote>;
}

export class NoteStorage {
  async getAll(dbConn: Connection): Promise<INote[]> {
    const Note: Model<INote> = NoteModel(dbConn);

    let list: INote[];

    try {
      list = await Note.find().exec();
    } catch (error) {
      console.error(`> getAllNotes error: ${error}`);

      throw new ApolloError('Error retrieving all notes');
    }

    return list;
  }

  async get(dbConn: Connection, _id: string): Promise<INote> {
    const Note: Model<INote> = NoteModel(dbConn);

    try {
      const note = await Note.findById(_id).exec();

      return note;
    } catch (error) {
      console.error(`> getNote error: ${error}`);

      throw new ApolloError('Error retrieving specific note');
    }
  }

  async add(dbConn: Connection, title: string, content: string): Promise<INote> {
    const Note: Model<INote> = NoteModel(dbConn);

    try {
      const note = await Note.create({
        title,
        content,
        date: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      });

      return note;
    } catch (error) {
      console.error(`> saveNote error: ${error}`);

      throw new ApolloError('Error creating note');
    }
  }

  async delete(dbConn: Connection, _id: string): Promise<INote> {
    const Note: Model<INote> = NoteModel(dbConn);

    try {
      const note = await Note.findByIdAndDelete(_id).exec();

      return note;
    } catch (error) {
      console.error(`> deleteNote error: ${error}`);

      throw new ApolloError('Error deleting note');
    }
  }
}