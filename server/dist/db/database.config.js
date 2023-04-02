"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize("app", "", "", {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});
exports.default = database;
