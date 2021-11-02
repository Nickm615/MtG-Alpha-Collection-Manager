const router = require('express').Router();
const cardRoutes = require('./cardRoutes')

router.use('/cards', cardRoutes);

module.exports = router;