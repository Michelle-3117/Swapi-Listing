"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize('mysql', 'root', 'Michelle', {
    host: "localhost",
    dialect: "mysql"
});
exports.default = database;
