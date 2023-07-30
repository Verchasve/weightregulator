const { ObjectId } = require("mongodb");

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


const removeProductHeader = async(data, db) => { 
  const productsCollection = db.collection('products');
  let deleted = false;
  
  if (data.length > 0){
 
    const ids = data.map(item => (new ObjectId(item))); 
    const query = {_id: { $in: ids}}; 
    const check = await productsCollection.deleteMany(query);
  
     if (check?.deletedCount > 0){
      deleted = true;
     }
  }
  return deleted;
}

// setting brands 
const setProductBrands = async(data, db) => { 
 const brandsCollection = db.collection('brands');

 if (data?.text){
  console.log( `Adding item : ${JSON.stringify(data)}`);
 //const brandNames = data.map(item => ({ text: item.text }));
 const brandNames = [{ text: data?.text }];
 await brandsCollection.insertMany(brandNames, (err, result) => {
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

const removeProductBrands = async(data, db) => { 
  const brandsCollection = db.collection('brands');
  let deleted = false; 

  if (data){  
    const query = {_id:new ObjectId(data?.id)};  
    console.log( `Removing item : ${JSON.stringify(query)}`);
    const check = await brandsCollection.deleteMany(query); 
     if (check?.deletedCount > 0){
      deleted = true;
     }
  }
  return deleted;
}
 

// setting sizes
const setProductSizes = (data, db) => { 
  const sizesCollection = db.collection('sizes');
  if (data){ 
    const sizeNames = data?.sizes.map(item => ({ text: item.text })); 
    sizesCollection.insertMany(sizeNames, (err, result) => { 
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
    const colorNames = data.map(item => ({ text: item.text })); 
    colorsCollection.insertMany(colorNames, (err, result) => { 
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
 

// setting layers

const setProductLayers = (data, db) => { 
    
  const layersCollection = db.collection('layers');
  if (data.length > 0){
    const layerNames = data.map(item => ({ text: item.text })); 
    layersCollection.insertMany(layerNames, (err, result) => { 
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

 

// setting operator

const setProductOperators = (data, db) => { 
    
  const operatorsCollection = db.collection('operators');
  if (data.length > 0){
    const operatorNames = data.map(item => ({ text: item.text })); 
    operatorsCollection.insertMany(operatorNames, (err, result) => { 
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


module.exports = {
  setProductBrands,
  setProductSizes,
  setProductColors,
  setProductLayers,
  setProductHeader ,
  setProductOperators,
  removeProductHeader,
  removeProductBrands,
}
 








