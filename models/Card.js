const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
// const mtg = require('mtgsdk')

class Card extends Model {}

// // mtg.card.where({setName: 'Limited Edition Alpha'})
// // .then(cards => {
// //     console.log(cards)
// })
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