const sequelize = require('../config/connection');
const seedCards = require('./cardData');

const seedAll = async () => {
    
    await sequelize.sync({ force: true });

    await seedCards()

}

seedAll();