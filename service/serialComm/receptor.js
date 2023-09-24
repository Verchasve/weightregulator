const SerialPort = require("serialport");
const port = "COM2";

const serialPort = new SerialPort(
  port, {
  baudRate: 9600
});

serialPort.on("open", function() {
  console.log("-- Connection opened --");
  serialPort.on("data", function(data) {
    console.log("Data received: " + data);
  });
});