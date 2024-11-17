
import { SerialPort } from 'serialport';
import { PacketLengthParser } from '@serialport/parser-packet-length';
import localStorage from "../localDb.js";

let finalData = "";
let serialPortInstance; 

const getPortSettings = async() => {

    const existingPortSettingsSize  = await localStorage.findItemByName('portSettings', 'port'); 
    const port = (existingPortSettingsSize) ? existingPortSettingsSize.port : 'COM7';
    const baudRate = (existingPortSettingsSize) ? existingPortSettingsSize.baudrate : 9600;
    return { port, baudRate };

};

const startSerialConnection = async () => {
  const ports = await SerialPort.list();
  const { port , baudRate } = await getPortSettings();
  const comPort = ports.find(item => item.path === port) || ports[0];
  

  if (!comPort) {
    throw new Error('No serial port found');``
  }

  if (!serialPortInstance) {
    serialPortInstance = new SerialPort({
      path: comPort.path,
      baudRate: baudRate,
      autoOpen: true,
    });
  }

  return serialPortInstance;
};



const getWeightData = (str) => {
    let newReading = "";
    const regex = /[^0-9.\sKg]/g;
    const match = str.replace(regex, "");
    const data =  match.split(",");
    // console.log( "oldData001...", match)

    const distinctVal =  [...new Set(data)];
        const valuesArray = distinctVal[0].split('\n');
        
        if (valuesArray.length > 1 ){
        // Get the last value in the array
        const lastValue = valuesArray[valuesArray.length - 2].trim(); 
        // Trim to remove leading and trailing spaces
        if (newReading != lastValue){
            newReading = lastValue;        
            return newReading;
        }  
    }
};

let buffStr = [];
const collectScaletData = (data) => {
    try {
        buffStr.push(data);
        const joinedStr = buffStr.join("");
        if (joinedStr.startsWith('S') && joinedStr.endsWith('g')) {
            const finStr = joinedStr;
            finalData = getWeightData(finStr); 
            if (finalData){ 
                return finalData;
            }
           
        }
    } catch (err) {
        console.error(err);
    }  
};


const  serialScaleGen = {
    startSerialConnection,
    collectScaletData,
};

export default serialScaleGen;

 
//export default serialScaleGen;