const Card = require('./Card')
const Collection = require('./Collection')
const User = require('./User')

Card.belongsToMany(User, {
    through: {
        model: Collection,
        unique: false,
        foreignKey: 'card_id'
    },
    as: 'cards_in_collection',
    onDelete: 'CASCADE'
});

User.belongsToMany(Card, {
    through: {
        model: Collection,
        unique:false,
        foreignKey: 'user_id'
    },
    as: 'card_owner',
    onDelete: 'CASCADE'
});

module.exports = { Collection, User, Card };

