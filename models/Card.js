const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Card extends Model {}

Card.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manaCost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cmc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }


},
{
    sequelize,
    freezeTableName: true,
    modelName: 'card',
    timestamps: false
}
)

module.exports = Card;