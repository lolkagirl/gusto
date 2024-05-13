// const Router = require('express')
const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const orderRouter = require("./orderRouter");

router.use("/user", userRouter);
router.use("/item", itemRouter);
router.use("/order", orderRouter);

module.exports = router;
