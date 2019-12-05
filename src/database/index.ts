import { Connection, createConnection } from 'mongoose';

const uri: string = process.env.mongoDBHost;

let conn: Connection = null;

export const getConnection = async (): Promise<Connection> => {
  if (conn === null) {
    conn = await createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  
  return conn;
}