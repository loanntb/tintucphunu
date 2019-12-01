const express = require("express");
const router = express.Router();
const type = require("../controllers/type.controller");

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

router.get("/", );
router.get('/danhsach', adminIsLoggedIn, type.getAll);
router.get('/them', adminIsLoggedIn, type.getAdd);
router.post("/themlt", adminIsLoggedIn, type.postNewType);
router.post("/xoa/:id", adminIsLoggedIn,  type.deleteType);
router.get('/sua/:id', adminIsLoggedIn, type.getEditType); 
router.post("/sua/:id", adminIsLoggedIn, type.postEditType);
module.exports = router