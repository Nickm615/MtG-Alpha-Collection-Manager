const router = require('express').Router();
var passport = require('passport')

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
