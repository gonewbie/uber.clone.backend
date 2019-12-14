import { ConnectionOptions } from "typeorm";
const {
  DB_ENDPOINT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    'entities/**/*.*'
  ],
  host: DB_ENDPOINT || 'localhost',
  port: 5432,
  username: DB_USERNAME || 'user',
  password: DB_PASSWORD || ''
};

export default connectionOptions;