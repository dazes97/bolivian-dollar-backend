import { ConnectionOptions } from "mysql2";
export const databaseConfig: ConnectionOptions = {
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  timezone: process.env.TIMEZONE,
};
