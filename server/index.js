const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const summaryRoutes = require("./routes/summary");
const http = require("http").Server(app);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(cors());

app.use("/summary", summaryRoutes);

http.listen(3000, () => {
  console.log("App is running");
});
