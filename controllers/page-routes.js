const router = require('express').Router();
const { Category, Hobby, User, UserLike } = require('../models')
const { withAuth, withoutAuth } = require('../utils/auth')
const sequelize = require('../config/connection');

//GET curent login user's data
//page/mypage
router.get('/mypage', withAuth, async (req, res) => {
  console.log(req.session.userId)
  const user = await User.findByPk(req.session.userId, { include: [Hobby,{
    model:User,
    as:'likes',
  }]
})
  const serializeUser = user.get({ plain: true })
  console.log(serializeUser)

  res.render('personal-page', {
    user: serializeUser,
  })
})
//post user's story
//page
router.post('/', async (req, res) => {
  const userId = req.session.userId
  const currentUser = await User.findByPk(userId)
  const story = req.body.story
  currentUser.story = story
  await currentUser.save()
  res.status(200).send('Story added')
})
//GET users for homepage
//page/users-page
router.get('/users-page', withAuth, async (req, res) => {
  const user = await User.findOne({
    order: sequelize.random(),
    include: Hobby
  })

  const serializeUser = user.get({ plain: true })
  console.log(serializeUser)

  res.render('users-page', {
    user: serializeUser,
  })
})
module.exports = router