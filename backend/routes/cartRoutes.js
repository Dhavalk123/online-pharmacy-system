const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Test route
router.get("/test", (req, res) => {
    res.send("Orders route working");
});

// Create order
router.post("/create", authMiddleware, createOrder);

module.exports = router;