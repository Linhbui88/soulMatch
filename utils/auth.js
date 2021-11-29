const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};
const withoutAuth = (req,res,next) =>{
  if(req.session.loggedIn) {
    res.redirect('/page/users-page')
  } else {
    next();
  }
}

module.exports = {
  withAuth,
  withoutAuth
}

