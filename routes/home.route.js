const express = require('express');
const router = express.Router();
const home = require("../controllers/home.controller");
require('../config/passport');
const passport = require('passport');

router.post('/dang-nhap', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/',
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

router.post('/dang-ky', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash : true,
}));

router.get('/dang-xuat', function(req, res) {
    req.logout();
    res.redirect('/');
});

//* GET Home. */
router.get('/', home.getHome );
//* GET Detail. */
router.get('/chi-tiet/:slugT/:slug', home.getDetail);
/* GET Lists. */
router.get('/danh-sach/:slugC', home.getList);
/* GET Lists Submenu. */
router.get('/danh-sach/loai-tin/:slug', home.getType);
/* GET Tags. */
router.get('/tags/:tagN', home.getTagName);
/*  Search. */
router.post('/tim-kiem', home.getSearch);
router.get('/file-manager.html', function(req, res, next) {
    res.render('layouts/index', { title: 'Roxy Fileman for Node.js' });
});
module.exports = router