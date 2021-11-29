const router = require('express').Router();
const { Category, Hobby, User, UserLike } = require('../models')
const { withAuth, withoutAuth } = require('../utils/auth')
const sequelize = require('../config/connection');


router.get('/', withoutAuth, (req, res) => res.render('index'))
router.get('/signup', withoutAuth, (req, res) => res.render('signup'))
router.get('/login', withoutAuth, (req, res) => res.render('login'))




//GET all categories
router.get('/categories', withAuth, async (req, res) => {
  const foundCategories = await Category.findAll()
  const categories = foundCategories.map(category => category.get({ plain: true }))
  res.render('categories', {
    categories,
    loggedIn: req.session.loggedIn
  })
})

//GET all hobbies belongs to that specific gallery
router.get('/categories/:id', withAuth, async (req, res) => {
  const user = await User.findByPk(req.session.userId, { include: Hobby })
  const id = req.params.id
  const foundCategory = await Category.findByPk(id, { include: Hobby })
  const category = foundCategory.get({ plain: true });
  res.render('hobbies', {
    category,
    user
  })
  console.log(category, user)
})



module.exports = router