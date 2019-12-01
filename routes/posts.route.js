const express = require("express");
const router = express.Router();
const post = require("../controllers/posts.controller");

// Is Logged
function adminIsLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

// Is not logged
function adminNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

router.get('/danhsach', adminIsLoggedIn, post.getAll);
router.get('/danh-sach-bai-viet-da-xoa', adminIsLoggedIn, post.getTemporaryPost);
router.get('/them', adminIsLoggedIn, post.getAdd);
router.post('/thembv', adminIsLoggedIn, post.postNewPost )
router.get('/sua/:id', adminIsLoggedIn, post.getEditPost); 
router.post("/sua/:id", adminIsLoggedIn,  post.postEditPost);
router.post('/xoa/:id', adminIsLoggedIn, post.deletePost);
router.post('/xoatam/:id', adminIsLoggedIn, post.temporaryPost);
router.post('/khoi-phuc/:id', adminIsLoggedIn, post.restorePost);
router.post('/xoa-tat-ca', adminIsLoggedIn, post.deleteAllPost);
module.exports = router