/* @format */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });
const serverless = require('serverless-http');
const AdminRoutes = require("./modules/admin/routes");

const app = express();
app.use(cors());
var whitelist = [
    // "http://analytics.sensifyaware.com",
    "http://localhost:3000",
    "http://oculixai.com.s3-website-us-east-1.amazonaws.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // console.log("Request coming from:",origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

app.use("/knowMore", (req, res) => {
  res.send("Changed the Code");
  res.end();
});
app.use("/api/admin", AdminRoutes);

var PORT = 4000;
app.listen(PORT, console.log(`Server listening on port ${PORT}.`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:testing main for error`);
});

module.exports = app;
module.exports.handler = serverless(app);
