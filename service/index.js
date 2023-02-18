const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("../service/db/users");
const Settings = require("../service/Settings");
app.use(cors());

const serviceURL = `${Settings.host}:${Settings.port}`;

const router = express.Router();
mongoose.connect(Settings.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful"); 
});


app.use("/", router);

router.route("/getData").get(async function(req, res) {
    const users = await Users.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
  });

app.listen(Settings.port, function() {
  console.log("Server is running on Port: " + serviceURL);
});