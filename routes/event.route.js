const express = require("express");
const router = express.Router();
const event = require("../controllers/event.controller");


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

router.get('/danhsach', adminIsLoggedIn, event.getEvent);
router.post("/them", adminIsLoggedIn, event.postNewEvent);
router.post("/sua/:id", adminIsLoggedIn, event.editEvent);
router.post("/xoa/:id", adminIsLoggedIn,  event.deleteEvent);

module.exports = router