const Router = require('express-promise-router')
const router = new Router()
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../common/database')
const u = require('../models/user.model')
var passport = require('passport');
const { check, validationResult } = require('express-validator');


passport.serializeUser(function(user, done){
    done(null, user.user_id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done){
    db.query("select * from users where  user_id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
  });
  
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, email, password, done){
      db.query("select * from users where email = ?", [email], function(err, rows){
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

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
  db.query("select * from users where email = '"+email+"'",function(err,rows){
  console.log(rows);
  if (err)
      return done(err);
  if (rows.length) {
            return done(null, false, req.flash('signupMessage', 'Email đã được sử dụng'));
        } else {
          let user_resgistered = new Date();
          let updated_date = new Date();
         let  newUser = {
            full_name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_resgistered:user_resgistered,
            updated_date:updated_date
          };
          if (req.body.password!= req.body.confirm && req.body.password.trim().length != 0) {
               res.redirect('/',{data: {error: "Mật khẩu không khớp"}});
          }else{
            db.query('INSERT INTO `users`(`email`,`password`,`full_name`,`role_id`,`user_resgistered`, `updated_date`) VALUES(?,?,?,?,?,?)', [ newUser.email, newUser.full_name, newUser.password,2, user_resgistered, updated_date ], (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("Thêm tài khoản mới:", email);
                db.query("SELECT * FROM users WHERE email=?", [email], (err, res) => {
                  return done(null, newUser);
                });
              }
            });
          }
          
              }	
        });
}));