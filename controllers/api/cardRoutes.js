const router = require('express').Router();
const Card = require('../../models/Card');
const { Collection } = require('../../models');

// router.get('/:id', async (req, res) => {
//     console.log(req.params.id)
//     try{
//         const dbCardData = await Collection.findOne({
//             where:{
//                 card_id: parseInt(req.params.id)
//             }

//         })
//         if(dbCardData){
//             console.log(dbCardData.dataValues)
//         }else{
//             console.log('no data')
//         }
//         // console.log(dbCardData)
//         // res.send('ok')
//         res.status(200).json(dbCardData)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err)
//     }
// })

router.post('/', async (req, res) => {
    console.log('===================================================')
    console.log(req.body)
    console.log('===================================================')

    try {

        const checkCardData = await Collection.findOne({
            where: {
                card_id: parseInt(req.body.id)
            }
        })
        // console.log(checkCardData.dataValues);
        if (!checkCardData) {
            console.log('no data');
            const dbCardData = await Collection.create({
                card_id: parseInt(req.body.id),
                quantity: 1,
                user_id: 1
            }, { fields: ['card_id', 'quantity', 'user_id'] });
        } else {
            console.log('update data',checkCardData.dataValues);
            const dbCardData = await Collection.update({
                
                quantity: checkCardData.dataValues.quantity + 1,
              
            },{

                where: {
                card_id: parseInt(req.body.id)
            }
            }
            );
        }
        // const dbCardData = await Collection.create({
        //     card_id: parseInt(req.body.id),
        //     quantity: 1,
        //     user_id: 1
        // // });
        // } ,{fields:['card_id', 'quantity', 'user_id']});
        res.status(200).json('Card added to collection')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router