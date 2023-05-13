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
};
 

// setting sizes
const setProductSizes = (data, db) => { 
  const sizesCollection = db.collection('sizes');
  if (data){ 
    const brandNames = data?.sizes.map(item => ({ text: item.text })); 
    sizesCollection.insertMany(brandNames, (err, result) => { 
      if (err) {
        console.error(err);
        return false;
         }  
     
      if (result?.insertedCount > 0){
        return true;
      }
     }); 
     }
    return true;
   };
 

// setting colors
const setProductColors = (data, db) => { 
  const colorsCollection = db.collection('colors'); 
  if (data.length > 0){
    const brandNames = data.map(item => ({ text: item.text })); 
    colorsCollection.insertMany(brandNames, (err, result) => { 
      if (err) {
        console.error(err);
        return false;
         }  
       }); 
     }
    return true;
   };
 

// setting layers

const setProductLayers = (data, db) => { 
    
  const layersCollection = db.collection('layers');
  if (data.length > 0){
    const brandNames = data.map(item => ({ text: item.text })); 
    layersCollection.insertMany(brandNames, (err, result) => { 
      if (err) {
        console.error(err);
        return false;
         }  
       }); 
     }
    return true;
};

 

// setting operator

const setProductOperators = (data, db) => { 
    
  const operatorsCollection = db.collection('operators');
  if (data.length > 0){
    const brandNames = data.map(item => ({ text: item.text })); 
    operatorsCollection.insertMany(brandNames, (err, result) => { 
      if (err) {
        console.error(err);
        return false;
         }  
       }); 
     }
    return true;
};


module.exports = {
  setProductBrands,
  setProductSizes,
  setProductColors,
  setProductLayers,
  setProductHeader ,
  setProductOperators
}
 








