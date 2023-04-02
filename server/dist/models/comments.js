"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../db/database.config"));
class CommentInstance extends sequelize_1.Model {
}
exports.CommentInstance = CommentInstance;
CommentInstance.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    movieId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500],
        },
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Comment",
});
