const express = require("express");
const app = express();
const { SERVER_PORT, CLIENT_URL, SERVER_URL, CLIENT_PORT } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const { rateLimit } = require("express-rate-limit");

//limit number of requests to 40 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 40,
});

//for CORS -> full client url string with port
const clientUrlString = `${CLIENT_URL}:${CLIENT_PORT}`;

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: clientUrlString, credentials: true }));
app.use(passport.initialize());
app.use(limiter);

//import routes
const authRoutes = require("./routes/auth");

//database connection check
const checkConnect = require("./db/connectCheck");

//initilize routes
app.use("/api", authRoutes);

//serve static files
app.use(express.static(path.join(__dirname, "../../frontend/build")));

//fixes the "cannot GET /url" error when refreshing the client-side app.
//ensures that all server requests will be redirected to index.html, which
//will make sure that the react-router-dom will handle the appropriate requests.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

//exporting the app (for testing)
module.exports = app;

//app start
const appStart = async () => {
  try {
    await checkConnect();
    app.listen(SERVER_PORT, () => {
      console.log(`The server is running at ${SERVER_PORT}`);
      console.log(`The server is using CORS and accepting connections from ${clientUrlString}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
