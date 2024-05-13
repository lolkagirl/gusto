// const Router = require('express')
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require("../middleware/checkRoleMiddleware");



router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/auth", authMiddleware, userController.check);
// router.post("/feedback",checkRole("USER"), userController.addComment);
router.post("/feedback", userController.addComment);

module.exports = router;
