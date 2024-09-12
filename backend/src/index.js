const express = require("express");
const app = express();

//Uncomment these once the React client app has been built with "npm run build"
  // //serve static files
  // app.use(express.static(path.join(__dirname, "../../frontend/build")));

  // //fixes the "cannot GET /url" error when refreshing the client-side app.
  // //ensures that all server requests will be redirected to index.html, which
  // //will make sure that the react-router-dom will handle the appropriate requests.
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
  // });

//app start
const appStart = async () => {
  try {
    app.listen(80, () => {
      console.log(`The app is running at http://localhost:80`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
