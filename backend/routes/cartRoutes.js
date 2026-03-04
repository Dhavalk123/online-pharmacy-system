const express = require("express");
const router = express.Router();

const { addToCart, getCart, updateCartItem, removeFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Add product to cart
router.post("/add", authMiddleware, addToCart);

// Get cart items
router.get("/", authMiddleware, getCart);

// Update quantity
router.put("/update/:cart_id", authMiddleware, updateCartItem);

// Remove item
router.delete("/remove/:cart_id", authMiddleware, removeFromCart);

module.exports = router;