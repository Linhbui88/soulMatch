const router = require('express').Router();
const { User, Hobby, UserHobby } = require('../../models');
//api/hobbies/add-hobbies
router.post('/add-hobbies', async (req, res) => {
  const userId = req.session.userId
  const hobbyId = req.body.hobby
  const foundHobby = await Hobby.findByPk(hobbyId)
  let user = await User.findByPk(userId, { include: Hobby })
  await user.addHobby(foundHobby)

  // refresh the user since just added a hobby
  // and the old user doesn't have it since loaded it before adding the new foundHobby
  user = await User.findByPk(userId, { include: Hobby })

  res.status(200).json(user.get({ plain: true }))

})
//api/hobbies/delete-hobby
router.delete('/delete-hobby', async (req, res) => {
  const userId = req.session.userId
  await UserHobby.destroy({
    where: {
      userId,
      hobbyId: req.body.id
    }
  })
  let user = await User.findByPk(userId, { include: Hobby })

  res.status(200).json(user.get({ plain: true }))
});
module.exports = router;