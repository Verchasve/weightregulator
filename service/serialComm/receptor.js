const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const port = new SerialPort({
  path: 'COM4',
  baudRate: 9600,
  autoOpen: false
});

port.on('open', () => {
  port.port.emitData('data');
});

port.on('readable', function () {
  const dataW = port.read()
  const decodedData = new TextDecoder().decode(dataW);
  console.log(decodedData);
});

const parser = port.pipe(new ByteLengthParser({ length: 8 }));

parser.on('data', function (){
  const dataW = port.read();
  //console.log(dataW);
}) ;