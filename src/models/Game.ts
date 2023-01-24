import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelizeConnection } from './config'
import { Board } from "../types";

export interface GameAttr {
    id: string;
    width: number;
    height: number;
    score?: number;
    fruit: Board.Fruit;
    snake: Board.Snake;
}
export class Game extends Model<GameAttr, Optional<GameAttr, 'id'>> {
    declare id?: string;
    declare width: number;
    declare height: number;
    declare score?: number;
    declare fruit: Board.Fruit;
    declare snake: Board.Snake;
}

Game.init({
    id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fruit: {
        type: DataTypes.JSONB,
    },
    snake: {
        type: DataTypes.JSONB,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize: sequelizeConnection,
    freezeTableName: true,
    tableName: 'game'
});