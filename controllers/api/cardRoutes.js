const router = require('express').Router();
const Card = require('../../models/Card');
const Collection = require('../../models/Collection');

// router.get('/cards', async (req, res) => {
//     try{
//         const dbCardData = await Card.findOne({
//             where:{
//                 imageUrl: req.body.imageUrl
//             }
            
//         })
//         res.status(200).json(dbCardData)
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// })

router.post('/', async (req, res) =>{
    console.log('===================================================')
    console.log(req.body)
    console.log('===================================================')

    try{
        const dbCardData = await Collection.create({
            cardId: JSON.parse(req.body.id),
            quantity: 1,
            userId: 1
        },/*{fields:['card_id', 'quantity', 'user_id']}*/);
        res.status(200).json('Card added to collection')
    }catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router