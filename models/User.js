const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
class User extends Model{
}

User.init(
    {
        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          username:{
            type: DataTypes.STRING,
            allowNull: false,
          },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
        },
        
    },
    {
    
        sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    }
);
module.exports = User;
