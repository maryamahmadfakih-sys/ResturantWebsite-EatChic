const path = require("path");
const fs = require("fs");
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

// FRONTEND_URL limits which website may call this API (e.g. https://eat-chic.vercel.app).
// Separate several with commas. If unset, any site may call it (handy locally).
const allowedOrigins = (process.env.FRONTEND_URL || "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors(allowedOrigins.length ? { origin: allowedOrigins } : {}));
app.use(express.json());
app.use("/api/auth", loginRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Serve the React website from the same server, so the whole site lives at one address.
// The website is built into frontend/build (see the root package.json).
const siteDir = path.join(__dirname, "..", "frontend", "build");
if (fs.existsSync(siteDir)) {
  app.use(express.static(siteDir));
  // Any other page address (like /menu) loads the React app
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(siteDir, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Eat Chic API is running"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));