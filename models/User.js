//I commented out the bcrypt hashing, the check password method and the before create hook to validate user info. If we need them instead of passport we can easily just uncomment them.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
// const bcrypt = require('bcrypt');
class User extends Model{
    //checkPassword(loginPw) {
    // return bcrypt.compareSync(loginPw, this.password);
}

User.init(
    {
        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
        // hooks: {
        //     beforeCreate: async (newUserData) => {
        //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
        //       return newUserData;
        //     },
        //   },
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
)
module.exports = User