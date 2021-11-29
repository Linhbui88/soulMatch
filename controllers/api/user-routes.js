const router = require('express').Router();
const { User, Hobby, UserHobby } = require('../../models');
const faker = require("faker");
const { withAuth, withoutAuth } = require('../../utils/auth')

router.get('/',(req,res)=>{
  User.findAll({
    attributes: { exclude: ['[password'] }
})
.then(dbUserData => res.json(dbUserData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})

//api/user/
router.post('/', async (req, res) => {

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: faker.internet.avatar(),
      story: faker.lorem.words()
    });
    // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(async () => {
      req.session.loggedIn = true;
      req.session.userId = newUser.id
      const responseUser = await User.findByPk(newUser.id, {
        attributes: { exclude: ['password'] }
      })
      res.json(responseUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
//api/user/id
router.get(':/id', async (req,res)=>{
  try {
    const dbUserData = await User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
            },
    include: [{
      model:UserHobby,
      attibute: ['hobbyId']
    },
    {
      model:UserLike,
      attribute:['likeId']
    }]

  }); 
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
} catch(error) {
    console.log(err);
    res.status(500).json(err);

  }
})


//api/user/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//api/user/logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'ok' });
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;