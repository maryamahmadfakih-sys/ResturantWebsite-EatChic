const { Sequelize } = require("sequelize");

// On Clever Cloud, the linked MySQL add-on provides MYSQL_ADDON_* settings automatically.

// Cloud MySQL hosts (like Aiven) need SSL and a custom port.
// Set DB_SSL=true and DB_PORT in production. Optionally paste the host's
// CA certificate into DB_CA_CERT to verify the server certificate.
const useSSL = process.env.DB_SSL === "true";
const sslOptions = process.env.DB_CA_CERT
  ? { ca: process.env.DB_CA_CERT.replace(/\\n/g, "\n") }
  : { rejectUnauthorized: false };

const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.MYSQL_ADDON_DB || "restaurant_db",
  process.env.DB_USER || process.env.MYSQL_ADDON_USER || "root",
  process.env.DB_PASSWORD || process.env.MYSQL_ADDON_PASSWORD || "",
  {
    host: process.env.DB_HOST || process.env.MYSQL_ADDON_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || process.env.MYSQL_ADDON_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: useSSL ? { ssl: sslOptions } : {},
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
