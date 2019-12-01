const express = require("express");
const router = express.Router();
const u = require("../controllers/profile.controller");
const db = require('../common/database');
// Is Logged
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
        }
        res.redirect('/');
    }
    // Is not logged
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
        }
        res.redirect('/');
}

router.get('/:id', isLoggedIn, u.getInfo);
router.post("/sua/:id", isLoggedIn, u.editU);
module.exports = router