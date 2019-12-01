const express = require("express");
const router = express.Router();
const u = require("../controllers/user.controller");


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

router.get('/danhsach', adminIsLoggedIn, u.getU);
router.get('/them', adminIsLoggedIn, u.getAdd);
router.post("/them", adminIsLoggedIn, u.postNewU);
router.post("/sua/:id", adminIsLoggedIn, u.editU);
router.get('/sua/:id', adminIsLoggedIn, u.getEditU); 
router.post("/xoa/:id", adminIsLoggedIn,  u.deleteUser);

module.exports = router