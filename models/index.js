const Card = require('./Card')
const Collection = require('./Collection')
const User = require('./User')

Card.belongsToMany(User, {
    through: {
        model: Collection,
        unique: false
    },
    as: 'cards_in_collection'
});

User.belongsToMany(Card, {
    through: {
        model: Collection,
        unique:false
    },
    as: 'card_owner'
});

module.exports = { Collection, User, Card };

