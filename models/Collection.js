const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Card = require('./Card');

class Collection extends Model{}

Collection.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'card',
                key: 'id'
                
            }

        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1

        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
        
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'collection'
    }
)
module.exports = Collection;