import { PoolOptions } from "mysql2";
export const databaseConfig = (): PoolOptions => {
  if (process.env.IS_OFFLINE) {
    console.log("Running in offline mode");
    return {
      database: process.env.DBNAME,
      host: "localhost",
      user: "root",
      password: "root",
      timezone: "-04:00",
    };
  } else {
    return {
      user: process.env.DBUSER,
      database: process.env.DBNAME,
      host: process.env.DBHOST,
      password: process.env.DBPASSWORD,
      timezone: process.env.DBTIMEZONE,
    };
  }
};
