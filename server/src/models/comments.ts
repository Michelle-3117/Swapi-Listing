import { DataTypes, Model } from 'sequelize';
import database from '../db/database.config';

interface CommentAttributes{
    id: string,
    movieId: string,
    comment: string,
    ipAddress: string,
    createdAt: Date,
}

export class CommentInstance extends Model<CommentAttributes>{

}

CommentInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: database,
    modelName: "comment",
  },
);