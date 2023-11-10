
const { SerialPort } = require('serialport');
const { PacketLengthParser } = require('@serialport/parser-packet-length');

const port = new SerialPort({
    path: 'COM4',
    baudRate: 9600,
    autoOpen: false
});

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
    // Because there's no callback to write, write errors will be emitted on the port:
    //    port.write('main screen turn on')
})



let buffStr = []; // Initialize an empty array to collect data
port.on('readable', function () {
    const data = port.read();
    const decodedData = new TextDecoder().decode(data);
     collectScaletData(decodedData);
});
let newReading = "";



const getWeightData = (str) => {
    const regex = /[^0-9.\sKg]/g;
    const match = str.replace(regex, "");
    const data =  match.split(",");

    const distinctVal =  [...new Set(data)];
    

        const valuesArray = distinctVal[0].split('\n');
        if (valuesArray.length > 1 ){
        // Get the last value in the array
        const lastValue = valuesArray[valuesArray.length - 2].trim(); // Trim to remove leading and trailing spaces
        if (newReading != lastValue){
            newReading = lastValue;
        
            return newReading;
        }  
    }

};

const collectScaletData = (data) => {
    let finalData ;
    try {
        buffStr.push(data);
        const joinedStr = buffStr.join("");
        if (joinedStr.startsWith('S') && joinedStr.endsWith('g')) {
            const finStr = joinedStr;
            finalData = getWeightData(finStr);
            
            if (finalData){
                console.log(`final - ${finalData}`);
                return finalData;
            }
           
        }
    } catch (err) {
        console.error(err);
    }
    
};


module.exports = {
    collectScaletData,
}

//   node serialComm/serialTestFile.js