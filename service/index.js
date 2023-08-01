const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("../service/db/users");
const Settings = require("../service/Settings");
const { setProductHeader,
  setProductBrands,
  setProductLayers,
  setProductColors,
  setProductOperators,
  setProductSizes,
  removeProductHeader,
  removeProductBrands,
  removeProductSizes,
  removeProductLayers,
  removeProductColors,
  removeProductOperators} = require("./utils");

app.use(cors());

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const serviceURL = `${Settings.host}:${Settings.port}`;

const router = express.Router();
mongoose.connect(Settings.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});
app.use("/", router);

router.route("/getData").get(async function (req, res) {
  const users = await Users.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// header entries code
router.route("/setHeader").post(jsonParser, async function (req, res) {
  try {
    const check = setProductHeader(req?.body, connection);
    if (check) {
      res.send(JSON.stringify("Data added"));
    } else {
      res.send(JSON.stringify("Unable to add Data"));
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getHeader").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const productsCollection = connection.collection('products');
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
    const check = await removeProductHeader(req?.body, connection);
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
    const check = await setProductBrands(req?.body, connection);
    console.log(`Brand Added Check : ${check}`);
    if (check) {
      res.send(JSON.stringify("Brands added"));
    } else {
      res.send(JSON.stringify("Unable to add Brands"));
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(error?.message)
  }
});

router.route("/getBrand").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const brandsCollection = connection.collection('brands');
    if (req?.query?.brandsName) {
      data = await brandsCollection.findOne({ brandsName: req?.query?.brandsName });
    } else {
      data = await brandsCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteBrand").delete(jsonParser, async function (req, res) {
  try {
    const check = await removeProductBrands(req?.body, connection);
    console.log(`deleteBrand  : ${check}`);
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

// size parameters 
router.route("/setSize").post(jsonParser, async function (req, res) {
  try {
    const check = await setProductSizes(req?.body, connection);
    console.log(`Size Added Check: $(check)`)
    if (check) {
      res.send(JSON.stringify("Sizes added"));
    } else {
      res.send(JSON.stringify("Unable to add Sizes"));
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(error?.message)
  }
});

router.route("/getSize").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const sizesCollection = connection.collection('sizes');
    if (req?.query?.sizesName) {
      data = await sizesCollection.findOne({ sizesName: req?.query?.sizesName });
    } else {
      data = await sizesCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.route("/deleteSize").delete(jsonParser, async function (req, res) {
  try {
    const check = await removeProductSizes(req?.body, connection);
    console.log(`deleteSize  : ${check}`);
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


// color parameters

router.route("/setColor").post(jsonParser, async function (req, res) {
  try {
    const check = await setProductColors(req?.body, connection);
    if (check) {
      res.send(JSON.stringify("Colors added"));
    } else {
      res.send(JSON.stringify("Unable to add Colors"));
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getColor").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const colorsCollection = connection.collection('colors');
    if (req?.query?.colorsName) {
      data = await colorsCollection.findOne({ colorsName: req?.query?.colorsName });
    } else {
      data = await colorsCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteColor").delete(jsonParser, async function (req, res) {
  try {
    const check = await removeProductColors(req?.body, connection);
    console.log(`deleteColor  : ${check}`);
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

// layer parameters  
router.route("/setLayer").post(jsonParser, async function (req, res) {
  try {
    const check = await setProductLayers(req?.body, connection);
    if (check) {
      res.send(JSON.stringify("Layers added"));
    } else {
      res.send(JSON.stringify("Unable to add Layers"));
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getLayer").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const layersCollection = connection.collection('layers');
    if (req?.query?.layersName) {
      data = await layersCollection.findOne({ layersName: req?.query?.layersName });
    } else {
      data = await layersCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteLayer").delete(jsonParser, async function (req, res) {
  try {
    const check = await removeProductLayers(req?.body, connection);
    console.log(`deleteLayer  : ${check}`);
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

// operator param Operator

router.route("/setOperator").post(jsonParser, async function (req, res) {
  try {
    const check = await setProductOperators(req?.body, connection);
    if (check) {
      res.send(JSON.stringify("Operators added"));
    } else {
      res.send(JSON.stringify("Unable to add Operators"));
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/getOperator").get(jsonParser, async function (req, res) {
  try {
    let data = {};
    const operatorsCollection = connection.collection('operators');
    if (req?.query?.layersName) {
      data = await operatorsCollection.findOne({ operatorsName: req?.query?.operatorsName });
    } else {
      data = await operatorsCollection.find().toArray();
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/deleteOperator").delete(jsonParser, async function (req, res) {
  try {
    const check = await removeProductOperators(req?.body, connection);
    console.log(`deleteOperator  : ${check}`);
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

// 

app.listen(Settings.port, function () {
  console.log("Server is running on Port: " + serviceURL);
});
//