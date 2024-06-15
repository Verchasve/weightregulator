
const { SerialPort } = require('serialport');
const { PacketLengthParser } = require('@serialport/parser-packet-length');

let finalData = "";
let serialPortInstance;

const startSerialConnection = () => {

    if (!serialPortInstance){

        serialPortInstance = new SerialPort({
            path: 'COM7',
            baudRate: 9600,
            autoOpen: true
        }); 
       
    }
    return serialPortInstance;

};






const getWeightData = (str) => {
    let newReading = "";
    const regex = /[^0-9.\sKg]/g;
    const match = str.replace(regex, "");
    const data =  match.split(",");

    // oldDataValue
    console.log( "oldData001...", match)

    const distinctVal =  [...new Set(data)];
        const valuesArray = distinctVal[0].split('\n');
        
        if (valuesArray.length > 1 ){
        // Get the last value in the array
        const lastValue = valuesArray[valuesArray.length - 2].trim(); 
        
        
        // Trim to remove leading and trailing spaces
        if (newReading != lastValue){
            newReading = lastValue; 
            //comsole.log(lastValue)       
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
                //console.log(`final - ${finalData}`);
                return finalData;
            }
           
        }
    } catch (err) {
        console.error(err);
    }
    
};


module.exports = {
    startSerialConnection,
    collectScaletData,
}

//   node serialComm/serialTestFile.js