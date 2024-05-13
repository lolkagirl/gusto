const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), itemController.create);
router.get("/", itemController.getAll);
router.get("/:id", itemController.getOne);
router.delete("/",checkRole("ADMIN"), itemController.deleteItem);
// router.post("/add-to-cart", itemController.addToCart);
// // router.post("/basket",checkRole("USER"), itemController.getItemsFromBasket);
// router.post("/basket", checkRole("USER"), itemController.getItemsFromBasket);

// router.get("/",checkRole("ADMIN"), itemController.getAllOrders);

module.exports = router;
