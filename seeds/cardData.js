const  Card  = require('../models/Card');
const mtg = require('mtgsdk');
// const e = require('express');
const seedCards = (data) => Card.bulkCreate(data);
mtg.card.where({setName: 'Limited Edition Alpha', pageSize:10})
.then(cards => {
     //console.log(cards)
  
    const cardData =  cards.map(e =>
       {
        var ob = {};
           ob.name = e.name;
           ob.manaCost = e.manaCost;
           ob.cmc = e.cmc;
           ob.imageUrl = e.imageUrl;


           return ob;
       }
    )
    seedCards(cardData)
   
    
})
 module.exports = seedCards;
// console.log(cardData)




