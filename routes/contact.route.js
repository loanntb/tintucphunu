const express = require("express");
const router = express.Router();
const contact = require("../controllers/contact.controller");

router.get("/", contact.getContact );
router.post("/gui", contact.addMessage);

module.exports = router