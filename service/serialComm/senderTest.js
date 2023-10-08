const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');



const { PacketLengthParser } = require('@serialport/parser-packet-length')



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
  port.write('main screen turn on')
})

//const parser = port.pipe(new ByteLengthParser({ length: 1 }));

const parser = port.pipe(new PacketLengthParser({
  delimiter: 0xbc,
  packetOverhead: 5,
  lengthBytes: 2,
  lengthOffset: 2,
}))

parser.on('data', function (){
  const dataW = port.read();
  console.log(dataW);
}) ;
// The open event is always emitted
port.on('open', function () {
  // open logic
});

port.on('readable', function () {
  const dataW = port.read()
  const decodedData = new TextDecoder().decode(dataW)
  const regexPattern = /(\d+\.\d+)\s*KG/g;

  let serialData = matchAll(decodedData,regexPattern)
  console.log("Data:",serialData)
});

  // Approach 1
  // Step1 - Parse every single packet.
  //  Step 2 -Add every character into String
  // Output const data = {ST, ,GS, 17.0,KG  }
  // Step 3 -  Regex -> data {Remove ST , space and comma}
  // Final result - > {17.0 KG}

  // Approach 2
  //  regex - String Start with ST and end with KG chracter
  // Output const data = {ST, ,GS, 17.0,KG  }
  // String.replace -  ST KG , - "" }
 // if (decodedData.length > 1 ){
    //console.log( 'Data:', decodedData);
   




//   node serialComm/senderTest.js
