const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const MenuItem = sequelize.define("MenuItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  Image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = MenuItem;