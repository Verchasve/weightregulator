import express, { Router } from "express";
import pkg from 'body-parser';
import cors from "cors";
import mongoDB from 'mongoose';
import serialScaleGen from "./serialComm/serialScaleGen.js";
import { host, port, mongoUri } from "./Settings.js";
import utils from "./utils.js";
import localStorage from "./localDb.js";

const { json, urlencoded } = pkg;
const { connect, connection: _connection } = mongoDB;
const app = express();
app.use(cors());
const jsonParser = json() 

const serviceURL = `${host}:${port}`;

const router = Router();
connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = _connection;

// collections Names
const operatorsCollection = 'operators';
const layerCollection = 'layers';
const sizesCollection = 'sizes';
const brandsCollection = 'brands';
const productsCollection = 'products';
const colorCollection = 'colors';
const portCollection = "portSettings"; 

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

// initializing Local Database storage
localStorage.initLocalDBStorage();

app.use(express.json());
app.use("/", router);

router.route("/getAllData").get(jsonParser , async function (req, res) {
  try {
    console.log('Get All Data');
    const allProducts = await localStorage.getAllItems(productsCollection); 
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getData/{name}").get(jsonParser, async function (req, res) {
  try {
   const allProducts = await localStorage.getAllItems(productsCollection); 
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/setData").post(jsonParser , async function (req, res) {
  try {
    const result = await localStorage.addNewItems(productsCollection, req?.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


// header entries code
router.route("/setHeader").post(jsonParser, async function (req, res) {
  try {
    console.log(JSON.stringify(req?.body));
    if (req?.body) {
      const results = await localStorage.addNewItems(productsCollection, req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getHeader").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const productsCollection = connection.collection(productsCollection);
    if (req?.query?.companyName) {
      data = await productsCollection.findOne({ companyName: req?.query?.companyName });
    } else {
      data = await productsCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteHeader").delete(jsonParser, async function (req, res) {
  try {
    const check = await utils.removeProductHeader(req?.body, connection);
    if (check) {
      res.send(JSON.stringify("Data delete"));
    } else {
      res.send(JSON.stringify("Unable to delete Data"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// brand parameters 
router.route("/setBrand").post(jsonParser, async function (req, res) {
  try {
      if (req?.body) {
        const results = await localStorage.addNewItems(brandsCollection, req?.body); 
        res.send(results);
      }
  } catch (error) {
    res.status(500).send(error);
    console.error(error?.message)
  }
});

router.route("/getBrand").get(jsonParser, async function (req, res) {
  try {
    let data = {}; 
    if (req?.query?.brandsName) {
      data = await localStorage.findItemById(brandsCollection, req?.query?.id);
    } else {
      data = await localStorage.getAllItems(brandsCollection); 
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.route("/deleteBrand").delete(jsonParser, async function (req, res) {
  try {
    const check = await localStorage.removeItems(brandsCollection, req?.body?.id);
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// size parameters 
router.route("/setSize").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      const results = await localStorage.addNewItems(sizesCollection, req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(error?.message)
  }
});

router.route("/getSize").get(jsonParser, async function (req, res) {
  try {

    let data = {}; 
    if (req?.query?.brandsName) {
      data = await localStorage.findItemById(sizesCollection, req?.query?.id);
    } else {
      data = await localStorage.getAllItems(sizesCollection); 
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.route("/deleteSize").delete(jsonParser, async function (req, res) {
  try {
    const check = await localStorage.removeItems(sizesCollection, req?.body?.id);
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// color parameters

router.route("/setColor").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      const results = await localStorage.addNewItems(colorCollection, req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getColor").get(jsonParser, async function (req, res) {
  try {
   
    let data = {}; 
    if (req?.query?.brandsName) {
      data = await localStorage.findItemById(colorCollection, req?.query?.id);
    } else {
      data = await localStorage.getAllItems(colorCollection); 
    }
    res.send(data); 
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteColor").delete(jsonParser, async function (req, res) {
  try {
    const check = await localStorage.removeItems(colorCollection, req?.body?.id);
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// layer parameters  
router.route("/setLayer").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      const results = await localStorage.addNewItems(layerCollection, req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getLayer").get(jsonParser, async function (req, res) {
  try {

    let data = {}; 
    if (req?.query?.brandsName) {
      data = await localStorage.findItemById(layerCollection, req?.query?.id);
    } else {
      data = await localStorage.getAllItems(layerCollection); 
    }
    res.send(data); 
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteLayer").delete(jsonParser, async function (req, res) {
  try {
    const check = await localStorage.removeItems(layerCollection, req?.body?.id);
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// operator param Operator

router.route("/setOperator").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      const results = await localStorage.addNewItems(operatorsCollection, req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getOperator").get(jsonParser, async function (req, res) {
  try {

    let data = {}; 
    if (req?.query?.brandsName) {
      data = await localStorage.findItemById(operatorsCollection, req?.query?.id);
    } else {
      data = await localStorage.getAllItems(operatorsCollection); 
    }
    res.send(data); 
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteOperator").delete(jsonParser, async function (req, res) {
  try {
    const check = await localStorage.removeItems(operatorsCollection, req?.body?.id);
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.route("/setProductTableData").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      console.log(`adding Tank : ${JSON.stringify(req?.body)}`);
      const results = await localStorage.addTankWeight(req?.body); 
      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/setPortBaudRate").post(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      console.log(`adding Port and Rate : ${JSON.stringify(req?.body)}`);
      const results = await localStorage.addPortSettings(portCollection, req?.body); 
      console.log(`results : ${JSON.stringify(results)}`);

      res.send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getPortBaudRate").get(jsonParser, async function (req, res) {
  try {
    if (req?.body) {
      const data = await localStorage.getAllItems(portCollection); 
      console.log(`data : ${JSON.stringify(data)}`);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, function () {
  console.log("Server is running on Port: " + serviceURL);
});
