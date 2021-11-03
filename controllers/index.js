const router = require('express').Router();
var passport = require('passport')

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const authRoutes = require('./authcontroller')
// const userRoutes = require('./authcontroller')
// router.use('/auth', authRoutes)
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/user', userRoutes);

module.exports = router;
