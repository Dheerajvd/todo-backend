const express = require("express");
const router = express.Router();
const {
    handleUserLogin,
    handleUserSignIn
} = require("../controllers/users.controllers");

//methods
router.post("/login", handleUserLogin); // --> user Login
router.post("/sign-up", handleUserSignIn); // --> user sign-in

module.exports = router;
