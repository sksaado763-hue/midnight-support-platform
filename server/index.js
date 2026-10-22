require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const express = require("express");
const fs = require("fs");
const path = require("path");
const { connectDb, MONGODB_URI } = require("./src/db");
const contentRoutes = require("./src/routes/content");
const formRoutes = require("./src/routes/forms");

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, db: MONGODB_URI });
});

app.use("/api", contentRoutes);
app.use("/api", formRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, error: "Unknown API endpoint." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Something went wrong." });
});

/* Serve the built React client when it exists. */
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API on http://localhost:${PORT} (Mongo: ${MONGODB_URI})`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  });
