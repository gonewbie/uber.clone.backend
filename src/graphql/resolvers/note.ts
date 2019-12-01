import { Connection } from 'mongoose';
import { INote } from '../../database/models/note';
import { NoteService } from '../../service/note';

export default {
  Query: {
    /**
     * Note를 전부 조회한다.
     * @param {object} parent 부모 resolver로부터 
     * @param {object} args query나 mutation에서 넘어온 인자들
     * @param {object} context api 설정 시 생성되는 context 객체. 현재는 db connection정보.
     * @return {Promise<INote[]>} Note 항목 전체 반환
     */
    getAllNotes: async (
      _,
      _1,
      { dbConn }: { dbConn: Connection }
    ): Promise<INote[]> => {
      const service = new NoteService();
      return service.getAllNotes(dbConn);
    },

    getNote: async (
      _,
      { _id }: { _id: INote['_id'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
      const service = new NoteService();
      return service.getNote(dbConn, _id);
    }
  },

  Mutation: {
    saveNote: async (
      _,
      { title, content }: { title: INote['title'];  content: INote['content'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
      const service = new NoteService();
      return service.createNote(dbConn, title, content);
    },

    deleteNote: async (
      _,
      { _id }: { _id: INote['id'] },
      { dbConn }: { dbConn: Connection }
    ): Promise<INote> => {
      const service = new NoteService();
      return service.deleteNote(dbConn, _id);
    }
  }
};