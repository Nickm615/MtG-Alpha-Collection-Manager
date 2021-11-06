const  Card  = require('../models/Card');
const mtg = require('mtgsdk');
const seedCards = (data) => Card.bulkCreate(data);

 module.exports = seedCards;





