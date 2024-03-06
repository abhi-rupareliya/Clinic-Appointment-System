const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const { setupSocket } = require("./Services/socket.services");
const { patientRoutes, userRoutes, appointmentRoutes } = require("./Routes");
require("dotenv").config({ path: "./.env" });
const db = require("./Database/config");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database Synced");
});
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // Update with your frontend's URL
    credentials: true, // Allow cookies in CORS requests
  })
);
app.use(cookieParser());
app.use(logger("dev"));
app.get("/", (req, res) => {
  res.send("API is running 🥳");
});
app.use("/patient", patientRoutes);
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);
app.use("*", (req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
