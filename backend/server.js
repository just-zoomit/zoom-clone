const express = require("express");
const dotenv = require("dotenv");

const zoomRoutes = require("./routes/zoomRoutes"); // Import the zoomRoutes.js file
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
const cors = require("cors");
app.use(cors())

app.use(express.json());

const port = process.env.PORT || 30010;

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

// Must be before any other routes. Remove this line if you don't want to use the default route.
app.get("/api", (req, res) => {
  res.send(" Backend API is working");
});

app.use("/api/zoom", zoomRoutes); // Use the zoomRoutes.js file

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
