const router = require('express').Router();
const{ Card, User, Collection } = require('../models')


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

module.exports = router