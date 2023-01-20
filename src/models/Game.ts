import { DataTypes, Model, Optional } from "sequelize";
import { Json } from "sequelize/types/utils";
import { sequelizeConnection } from './config'


export interface GameAttr {
    id: Number;
    width: Number;
    height: Number;
    score: Number;
    fruit: Json;
    snake: Json;
}
export interface GameCreateAttr extends Optional<GameAttr, 'id'> { }
export class Game extends Model<GameAttr, GameCreateAttr> implements GameAttr {
    public id!: Number;
    public width!: Number;
    public height!: Number;
    public score!: Number;
    public fruit!: Json;
    public snake!: Json;
}

Game.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
    paranoid: true,
    freezeTableName: true,
    tableName: 'game'
});