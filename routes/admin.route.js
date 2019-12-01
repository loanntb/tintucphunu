const Router = require('express-promise-router')
const router = new Router()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../common/database')

passport.use('local-admin-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, email, password, done){
      db.query("select * from users where role_id = 1 and email = ?", [email], function(err, rows){
        if (err) return done(req.flash('message',err));
        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
        var dbPassword  = rows[0].password;
        if(!(password == dbPassword)){
            return done(null, false, req.flash('message','Invalid username or password.'));
         }
        return done(null, rows[0]);
      });
    }
));

passport.serializeUser(function(user, done){
  done(null, user.user_id);
});
// used to deserialize the user
passport.deserializeUser(function(id, done){
  db.query("select * from users where role_id = 1 and user_id = "+ id, function (err, rows){
      done(err, rows[0]);
  });
});

// Is not logged
function adminNotLoggedIn(req, res, next) {
	if (!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
// Is Logged
function adminIsLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

/* GET users listing. */
router.get('/login', function(req, res, next){
  let error = req.flash('error');
	res.render('admin/partials/login', {
		title: 'Admin dang nhập',
    error: error
  });
});

router.post('/login', passport.authenticate('local-admin-login', {
        successRedirect : '/admin',
        failureRedirect : '/admin/login',
        failureFlash : true
	}),
    function(req, res) {
        if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
          req.session.cookie.expires = false;
        }
    	res.redirect('/');
	}
);

router.get('/', adminIsLoggedIn, function(req, res) {
	res.render('admin/partials/index', {
		title: 'News',
		user : req.user
	});
});

router.get('/dang-xuat', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router



