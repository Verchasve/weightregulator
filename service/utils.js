const setProductHeader = (data, db) => { 
    
    const productsCollection = db.collection('products');
    productsCollection.insertOne(data, (err, result) => {
      if (err) {
        console.error(err);
        return false;
      }  
    
    });
    return true;
}

module.exports = {
  setProductHeader
}

// setting brands 
const setProductBrands = (data, db) => { 
    
  const brandsCollection = db.collection('brands');
  brandsCollection.insertOne(data, (err, result) => {
    if (err) {
      console.error(err);
      return false;
    }  
  
  });
  return true;
}

module.exports = {
  setProductBrands
}

// setting sizes

const setProductSizes = (data, db) => { 
    
  const sizesCollection = db.collection('sizes');
  sizesCollection.insertOne(data, (err, result) => {
    if (err) {
      console.error(err);
      return false;
    }  
  
  });
  return true;
}

module.exports = {
  setProductSizes
}

// setting colors

const setProductColors = (data, db) => { 
    
  const colorsCollection = db.collection('colors');
  colorsCollection.insertOne(data, (err, result) => {
    if (err) {
      console.error(err);
      return false;
    }  
  
  });
  return true;
}

module.exports = {
  setProductColors
}

// setting layers

const setProductLayers = (data, db) => { 
    
  const layersCollection = db.collection('layers');
  layersCollection.insertOne(data, (err, result) => {
    if (err) {
      console.error(err);
      return false;
    }  
  
  });
  return true;
}

module.exports = {
  setProductLayers
}

// setting operator

const setProductOperators = (data, db) => { 
    
  const operatorsCollection = db.collection('operators');
  operatorsCollection.insertOne(data, (err, result) => {
    if (err) {
      console.error(err);
      return false;
    }  
  
  });
  return true;
}

module.exports = {
  setProductOperators
}
 








