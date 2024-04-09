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
const setProductSizes = async(data, db) => { 
  const sizesCollection = db.collection('sizes');
 
  if (data?.text){
   console.log( `Adding item : ${JSON.stringify(data)}`);
  //const brandNames = data.map(item => ({ text: item.text }));
  const sizeNames = [{ text: data?.text }];
  await sizesCollection.insertMany(sizeNames, (err, result) => {
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
 
 const removeProductSizes = async(data, db) => { 
   const sizesCollection = db.collection('sizes');
   let deleted = false; 
 
   if (data){  
     const query = {_id:new ObjectId(data?.id)};  
     console.log( `Removing item : ${JSON.stringify(query)}`);
     const check = await sizesCollection.deleteMany(query); 
      if (check?.deletedCount > 0){
       deleted = true;
      }
   }
   return deleted
  }

// setting colors

const setProductColors = async(data, db) => { 
  const colorsCollection = db.collection('colors');
 
  if (data?.text){
   console.log( `Adding item : ${JSON.stringify(data)}`);
  //const colorNames = data.map(item => ({ text: item.text }));
  const colorNames = [{ text: data?.text }];
  await colorsCollection.insertMany(colorNames, (err, result) => {
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
 
 const removeProductColors = async(data, db) => { 
   const colorsCollection = db.collection('colors');
   let deleted = false; 
 
   if (data){  
     const query = {_id:new ObjectId(data?.id)};  
     console.log( `Removing item : ${JSON.stringify(query)}`);
     const check = await colorsCollection.deleteMany(query); 
      if (check?.deletedCount > 0){
       deleted = true;
      }
   }
   return deleted;
 }
  
 

// setting layers

const setProductLayers = async(data, db) => { 
  const layersCollection = db.collection('layers');
 
  if (data?.text){
   console.log( `Adding item : ${JSON.stringify(data)}`);
  //const layerNames = data.map(item => ({ text: item.text }));
  const layerNames = [{ text: data?.text }];
  await layersCollection.insertMany(layerNames, (err, result) => {
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
 
 const removeProductLayers = async(data, db) => { 
   const layersCollection = db.collection('layers');
   let deleted = false; 
 
   if (data){  
     const query = {_id:new ObjectId(data?.id)};  
     console.log( `Removing item : ${JSON.stringify(query)}`);
     const check = await layersCollection.deleteMany(query); 
      if (check?.deletedCount > 0){
       deleted = true;
      }
   }
   return deleted;
 }
  

 

// setting operator

const setProductOperators = async(data, db) => { 
  const operatorsCollection = db.collection('operators');
  if (data?.text){
   console.log( `Adding item : ${JSON.stringify(data)}`);
  //const operatorNames = data.map(item => ({ text: item.text }));
  const operatorNames = [{ text: data?.text }];
  await operatorsCollection.insertMany(operatorNames, (err, result) => {
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
 
 const removeProductOperators = async(data, db) => { 
   const operatorsCollection = db.collection('operators');
   let deleted = false; 
 
   if (data){  
     const query = {_id:new ObjectId(data?.id)};  
     console.log( `Removing item : ${JSON.stringify(query)}`);
     const check = await operatorsCollection.deleteMany(query); 
      if (check?.deletedCount > 0){
       deleted = true;
      }
   }
   return deleted;
 };

 const setProductTableData = async(data, db) => { 
  const collection = db.collection('productTableData');
  console.log( `Adding item : ${JSON.stringify(data)}`);
  if (data){
  
  //const operatorNames = data.map(item => ({ text: item.text }));
  //c/onst tankData = [{ text: data }];
  await collection.insertMany(data, (err, result) => {
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
  removeProductSizes,
  removeProductColors,
  removeProductLayers,
  removeProductOperators,
  setProductTableData
}
 








