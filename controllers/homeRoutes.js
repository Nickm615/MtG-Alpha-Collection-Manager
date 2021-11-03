const router = require('express').Router();
const{ Card, User, Collection } = require('../models')



// GET request for cards
router.get('/', async (req, res) => {
    try{
    const dbCardData = await Card.findAll();
    // console.log(dbCardData)
    const cards = dbCardData.map((e) => 
        e.get({plain: true})
        
    );
    res.render('card-list', {
        cards,
       // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
    try {
      const dbCardData = await Card.create(req.body.id);
      res.status(200).json(dbCardData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const dbCardData = await Card.destroy({
        where: {
          id: req.params.id,
          card_id: req.session.card_id,
        },
      });
  
      if (!dbCardData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(dbCardData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// GET a single card
// app.get('/api/Card/:Card_name', (req, res) => {
//     if (req.params.Card_name) {
//       console.info(`${req.method} request received to get a Card`);
//       const cardName = req.params.card_name;
//       for (let i = 0; i < cards.length; i++) {
//         const currentCard = cards[i];
//         if (currentCard.Card_name === cardName) {
//           res.json(currentCard);
//           return;
//         }
//       }
//       res.status(404).send('Card not found');
//     } else {
//       res.status(400).send('Card name not provided');
//     }
//   });
  

module.exports = router