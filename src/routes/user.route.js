const express = require("express");
const router = express.Router();
const {
    login,
    register,
    authenticate,
} = require("../controllers/user.controller");

router
    .get("/api/authenticate", authenticate)
    .post("/api/login", login)
    .post("/api/register", register);

module.exports = router;
