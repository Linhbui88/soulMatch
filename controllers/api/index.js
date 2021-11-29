const router = require('express').Router();

const userRoutes = require('./user-routes');
const userHobbyRoutes = require('./userHobby-routes');
const userLikesRoutes = require('./userLike-routes');

router.use('/user', userRoutes);
router.use('/hobbies',userHobbyRoutes);
router.use('/likes',userLikesRoutes);

module.exports = router;
