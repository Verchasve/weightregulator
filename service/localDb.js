import { JSONFilePreset } from 'lowdb/node'
import { nanoid } from 'nanoid';

// Initialize the database
const defaultData = {  
    products: [],
    brands: [],
    operators: [],
    colors: [],
    layers: [],
    portSettings: []
};

const productsTankData = { 
    tankData: []
};

// Setup lowDB to use JSON file as storage
const db = await JSONFilePreset('weightControllerDB.json', defaultData);
const tankWeightDb = await JSONFilePreset('tankweightDB.json', productsTankData);

// Create a function to initialize the database
const initLocalDBStorage = async() => {
    await db.read();
    await db.write();

    await tankWeightDb.read();
    await tankWeightDb.write();
};

// Function to get all data from a collection
const getAllItems = async (collection) => {
    checkCollectionAvailability(collection);
    return db.data[collection];
};

const findItemById = async(collection, id) => {
    checkCollectionAvailability(collection);
    return db.data[collection].find(item => item.id === id);
};

const findItemByName = async (collection, name) => {
    checkCollectionAvailability(collection);
    return db.data?.[collection]?.find?.((item) => {
        return item?.text === name ||
            item?.companyName === name ||
            item?.port === name ||
            item?.baudrate === name;
    });
};

// Function to add a new item to a collection
const addNewItems = async(collection, item) => {
    checkCollectionAvailability(collection);
    let newItem;
    console.log(`adding ${JSON.stringify(item)}  to ${collection}`);
    const existingItem = await findItemByName(collection, 
        item.text || item.companyName);           
   
    if (existingItem) {
        return existingItem;
    }else if ( item.text || item.companyName ) { 
            newItem = { id: nanoid(), ...item };
            db.data[collection].push(newItem);
            await db.write();
        }   
    return newItem;
};

const removeItems = async(collection, id) => {
    checkCollectionAvailability(collection);
    console.log(`removing ${JSON.stringify(id)}  from ${collection}`);
    const index = db.data[collection].findIndex(item => item.id === id);
    if (index !== -1) {
        db.data[collection].splice(index, 1);
        await db.write();
        return true;
    }
    return false;
};

const addTankWeight = async(item) => {
     await tankWeightDb.read();
     const newItem = item[0]["id"] = nanoid(); 
     tankWeightDb.data['tankData'].push(item[0]);
     await tankWeightDb.write();     
    return newItem;
};

const addPortSettings = async (collection, item) => {
    checkCollectionAvailability(collection);  
    const existingPortSettingsSize  = await db.data?.[collection].length; 
    console.log(`existingPortSettings : ${JSON.stringify(existingPortSettingsSize)}`);
    if (existingPortSettingsSize > 0) {

        if (existingPortSettingsSize.port !== item.port) { 
            db.data[collection][0]['port'] = item.port;
        }

        if (existingPortSettingsSize.baudrate !== item.baudrate) {
            db.data[collection][0]['baudrate'] = item.baudrate;
        }

    } else {
        db.data[collection].push(item);
    }

    await db.write();
    return item;
};


const checkCollectionAvailability = async(collection) => {
    await db.read();
    if (!db.data[collection]) {
        db.data[collection] = [];
        await db.write();
    }
    return db.data[collection];
};

const   localStorage = {
    initLocalDBStorage,
    getAllItems,
    addNewItems,
    removeItems,
    findItemById,
    findItemByName,
    addTankWeight,
    addPortSettings
};

export default localStorage;
