const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Order = sequelize.define("Order", {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Order Placed",
  },
});

module.exports = Order;