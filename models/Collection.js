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
                key: 'id',
                unique: false
                
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
                key: 'id',
                unique: false
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'card',
                key: 'imageUrl'
            }
        }
        
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'collection'
    }
)
module.exports = Collection;