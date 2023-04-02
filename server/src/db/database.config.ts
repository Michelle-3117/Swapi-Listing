import { Sequelize } from "sequelize";

const database = new Sequelize("app", "", "", {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});
export default database