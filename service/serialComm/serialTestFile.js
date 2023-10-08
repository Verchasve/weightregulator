
const { SerialPort } = require('serialport');


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
    collectData(decodedData);
});

const collectData = (data) => {

    try {
        buffStr.push(data);
        const joinedStr = buffStr.join("");
        if (joinedStr.startsWith('S') && joinedStr.endsWith('g')) {
            const finStr = joinedStr;
            printWeightData(finStr);
        }
    } catch (err) {
        console.error(err);
    }
};

const printWeightData = (str) => {
    const regex = /[^0-9.\sKg]/g;
    const match = str.replace(regex, " ")

    console.log(match);

};

export {SerialPort}

//   node serialComm/serialTestFile.js