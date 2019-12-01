const express = require("express");
const router = express.Router();
const category = require("../controllers/categories.controller");


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

router.get('/danhsach', adminIsLoggedIn, category.getCategory);
router.post("/them", adminIsLoggedIn, category.postNewCategory);
router.post("/sua/:id", adminIsLoggedIn,  category.editCategory);
router.post("/xoa/:id", adminIsLoggedIn,  category.deleteCategory);
module.exports = router