const express = require("express");
const router = express.Router();
const role = require("../controllers/role.controller");


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
router.get('/danhsach', adminIsLoggedIn, role.getRole);
router.post("/them", adminIsLoggedIn, role.postNewRole);
router.post("/sua/:id", adminIsLoggedIn, role.editRole);
router.post("/xoa/:id", adminIsLoggedIn,  role.deleteRole);

module.exports = router