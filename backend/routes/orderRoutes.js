const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST: Create Order
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({ orderId, items, total });
    res.status(201).json({ orderId, order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch Order Status
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ where: { orderId: req.params.orderId } });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;