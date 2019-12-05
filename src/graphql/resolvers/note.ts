import { Connection, Model } from 'mongoose';
import dayjs from 'dayjs';
import NoteModel, { INote } from '../../database/models/note';
import { ApolloError } from 'apollo-server-lambda';

export default {
  Query: {
    /**
     * Note를 전부 조회한다.
     * @param {object} parent ?
     * @param {object} args query나 mutation에서 넘어온 인자들
     * @param {object} context api 설정 시 생성되는 context 객체. 현재는 db connection정보.
     * @return {Promise<INote[]>} Note 항목 전체 반환
     */
    getAllNotes: async (
      parent,
      args,
      { dbConn }: { dbConn: Connection }
    ): Promise<INote[]> => {
      const Note: Model<INote> = NoteModel(dbConn);

      let list: INote[];

      try {
        list = await Note.find().exec();
      } catch (error) {
        console.error(`> getAllNotes error: ${error}`);

        throw new ApolloError('Error retrieving all notes');
      }

      return list;
    },

    getNote: async (
      parent,
      { _id }: { _id: INote['_id'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
      const Note: Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.findById(_id).exec();

        return note;
      } catch (error) {
        console.error(`> getNote error: ${error}`);

        throw new ApolloError('Error retrieving specific note');
      }
    }
  },

  Mutation: {
    saveNote: async (
      parent,
      { title, content }: { title: INote['title'];  content: INote['content'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
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
    },

    deleteNote: async (
      parent,
      { _id }: { _id: INote['id'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
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
};