const router = require("express").Router();
const Card = require("../../models/Card");
const { Collection } = require("../../models");

router.post('/card-list', async (req, res) => {
    console.log('===================================================')
    console.log(req.body)
    console.log('===================================================')

    try {

        const checkCardData = await Collection.findOne({
            where: {
                card_id: parseInt(req.body.id)
            }
        })
        if (!checkCardData) {
            console.log('no data');
            const dbCardData = await Collection.create({
                card_id: parseInt(req.body.id),
                quantity: 1,
                user_id: 1
            }, { fields: ['card_id', 'quantity', 'user_id'] });
        } else {
            const dbCardData = await Collection.update({
                
                quantity: checkCardData.dataValues.quantity + 1,
              
            },{

                where: {
                card_id: parseInt(req.body.id)
            }
            }
            );
        }
        res.status(200).json('Card added to collection')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
