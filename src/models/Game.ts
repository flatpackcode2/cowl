import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelizeConnection } from './config'


export interface GameAttr {
    id: string;
    width: number;
    height: number;
    score?: number;
    fruit: object;
    snake: object;
}
export class Game extends Model<GameAttr, Optional<GameAttr, 'id'>> {
    declare id?: string;
    declare width: number;
    declare height: number;
    declare score?: number;
    declare fruit: object;
    declare snake: object;
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