import { JSONFilePreset } from 'lowdb/node'
import { nanoid } from 'nanoid';

// Initialize the database
const defaultData = {  products: [],
    brands: [],
    operators: [],
    colors: [],
    layers: [] }

// Setup lowDB to use JSON file as storage
const db = await JSONFilePreset('weightControllerDB.json', defaultData)

// Create a function to initialize the database
const initLocalDBStorage = async() => {
    await db.read();
    await db.write();
};

// Function to get all data from a collection
const getAllItems = async (collection) => {
    await db.read();
    return db.data[collection];
};

// Function to add a new item to a collection
const addNewItems = async(collection, item) => {
    await db.read();
    const newItem = { id: nanoid(), ...item };
    db.data[collection].push(newItem);
    await db.write();
    return newItem;
};


const removeItems = async(collection, id) => {
    await db.read();
    const index = db.data[collection].findIndex(item => item.id === id);
    if (index !== -1) {
        db.data[collection].splice(index, 1);
        await db.write();
        return true;
    }
    return false;
};

// Example usage:
// (async () => {
//    await initDB();

//     // Add new products
//     const newProduct = await addItem('products', { text: 'Product 1' });
//     console.log('Added Product:', newProduct);

//     // Fetch all products
//     const allProducts = await getAll('products');
//     console.log('All Products:', allProducts);
// })();

const localStorage = {
    initLocalDBStorage,
    getAllItems,
    addNewItems,
    removeItems
};

export default localStorage;
