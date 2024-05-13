const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/add-to-cart", orderController.addToCart);
// router.post("/basket",checkRole("USER"), itemController.getItemsFromBasket);
router.get("/:id", orderController.getItemsFromBasket);

router.get("/", checkRole("ADMIN"), orderController.getAllOrders);
router.post("/status", checkRole("ADMIN"), orderController.updateStatus);
router.post("/user-order", checkRole("ADMIN"), orderController.getOneOrder);

module.exports = router;
