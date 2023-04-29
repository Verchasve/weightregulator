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

// setting brands 
const setProductBrands = (data, db) => { 
  
 const brandsCollection = db.collection('brands');
 
 if (data.length > 0){
 const brandNames = data.map(item => ({ text: item.text }));
 
 brandsCollection.insertMany(brandNames, (err, result) => {
  
   if (err) {
     console.error(err);
     return false;
   }  
 }); 
}
 return true;
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
  setProductBrands,
  setProductSizes,
  setProductColors,
  setProductLayers,
  setProductHeader ,
  setProductOperators
}
 








