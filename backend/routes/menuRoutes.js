const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;