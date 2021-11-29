const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const pageRoutes = require('./page-routes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/page',pageRoutes);


module.exports = router;





