const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "restaurant_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Database Connected Successfully!");
    await sequelize.sync();
  } catch (error) {
    console.error("MySQL Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };