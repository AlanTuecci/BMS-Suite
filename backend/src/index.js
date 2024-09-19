const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
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

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
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

//app start
const appStart = async () => {
  try {
    await checkConnect();
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
