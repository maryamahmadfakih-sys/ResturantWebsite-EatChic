const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./db");
connectDB();

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const loginRoutes = require("./routes/loginRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", loginRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));