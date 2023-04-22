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