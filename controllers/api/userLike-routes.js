const router = require('express').Router();
const { User, Hobby, UserHobby } = require('../../models');
//POST routes UserLikes
//api/likes/add-likes
router.post('/add-likes', async (req,res)=>{
  const userId1 =  req.session.userId
  const user1 = await User.findByPk(userId1)

  const userId2 = req.body.userId2
  const foundUserLiked = await User.findByPk(userId2)

  await user1.addLike(foundUserLiked)
  

  // refresh the user since just added a hobby
  // and the old user doesn't have it since loaded it before adding the new foundHobby
  user = await User.findByPk(userId1)

  res.status(200).json(user.get({ plain: true }))

});
router.get('/add-likes', async (req,res)=>{
    User.findAll()
})
module.exports = router;