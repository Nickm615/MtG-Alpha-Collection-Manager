const sequelize = require('../config/connection');
const seedCards = require('./cardData');
const mtg = require('mtgsdk');
const seedAll = async (page_num) => {
    
    await sequelize.sync({ force: false });

    const cards = await mtg.card.where({setName: 'Limited Edition Alpha', page: page_num });
    console.log(cards.length);
    const cardData = await cards.map(e =>
        {
         var ob = {};
            ob.name = e.name;
            ob.manaCost = e.manaCost || "";
            ob.cmc = e.cmc;
            ob.imageUrl = e.imageUrl;
 
 
            return ob;
        }
     )

    await seedCards(cardData)

}
for (let i = 1; i < 4; i++) {
    seedAll(i);
}
