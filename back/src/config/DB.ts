import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

const sequelize = new Sequelize( DB_NAME!,DB_USER!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: "mysql",
  port: Number(DB_PORT!),
  dialectOptions: {
    ssl: {
        rejectUnauthorized: true,
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("conectada a la base de datos azure");
  })
  .catch((err: Error) => {
    console.log("no se pudo conectar a la base de datos", err);
  });

export default sequelize;
