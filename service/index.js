const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("../service/db/users");
const Settings = require("../service/Settings");
const { setProductHeader }= require("./utils");
app.use(cors()); 

const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

  router.route("/setHeader").post(jsonParser , async function(req, res) {
    try {
     const check = setProductHeader(req?.body , connection);
     if (check){
      res.send(JSON.stringify("Data added"));
     }else{
      res.send(JSON.stringify("Unable to add Data"));
     }
    } catch (error) {
        res.status(500).send(error);
    }
  });

  router.route("/getHeader").get(jsonParser , async function(req, res) {
    try {
     const productsCollection = connection.collection('products'); 
     const data =  await productsCollection.findOne({companyName: req?.query?.companyName}); 
     res.send(data); 
    } catch (error) {
        res.status(500).send(error);
    }
  });

app.listen(Settings.port, function() {
  console.log("Server is running on Port: " + serviceURL);
});