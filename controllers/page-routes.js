const router = require('express').Router();
const { Category, Hobby, User, UserLike } = require('../models')
const { withAuth, withoutAuth } = require('../utils/auth')
const sequelize = require('../config/connection');

//GET curent login user's data
//page/mypage
router.get('/mypage', withAuth, async (req, res) => {
  const user = await User.findByPk(req.session.userId, { include: [Hobby,{
    model:User,
    as:'likes',
  }]
})
  const serializeUser = user.get({ plain: true })
  console.log(' TESTTTTT')
  console.log(serializeUser.name.toUpperCase())
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
  res.render('users-page', {
    user: serializeUser,
   
  })
})
router.get('/users-page/:id',async (req,res)=>{
 const  id = req.params.id
 const  user = await User.findByPk(id,{
   include:Hobby
 })
  const serializeUser = user.get({ plain: true })
  res.render('users-page', {
    user: serializeUser,
   
  })
})


module.exports = router