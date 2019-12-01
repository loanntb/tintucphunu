const express = require("express");
const router = express.Router();
const u = require("../controllers/contact.controller");


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

router.get('/danhsach', adminIsLoggedIn, u.getContact);
router.post("/xoa/:id", adminIsLoggedIn,  u.deleteContact);
module.exports = router