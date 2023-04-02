import { Sequelize } from "sequelize";

const database = new Sequelize('mysql', 'root', 'Michelle', {
    host: "localhost",
    dialect: "mysql"
})
export default database