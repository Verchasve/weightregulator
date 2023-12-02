const express = require('express');
const { SerialPort } = require('serialport');

const app = express();
const port = 4001; // Choose a port for your HTTP server

// Replace 'COM3' with the appropriate serial port for your system
        const serialPort = new SerialPort({
            path: 'COM4',
            baudRate: 9600,
            autoOpen: false
        }); 

        serialPort.open(function (err) {
            if (err) {
                return console.log('Error opening port: ', err.message)
            }
            console.log(`Serial Connection Started....`);
            // Because there's no callback to write, write errors will be emitted on the port:
            //    port.write('main screen turn on')
        });
        
        
        
         // Initialize an empty array to collect data

             app.get('/stream-serial-data', (req, res) => {
                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
                res.setHeader('Connection', 'keep-alive');
            
                // Send continuous serial stream data to the HTTP client
                const sendDataToClient = (data) => {
                  res.write(`data: ${data}\n\n`);
                };
            
                // Listen for data from the serial port and send it to the client
                serialPort.on('readable', function () {
                    const data = serialPort.read();
                    const decodedData = new TextDecoder().decode(data);
                    // const finalDatas = collectScaletData(decodedData);
                     console.log(`Serial data.... ${decodedData}`);
                     sendDataToClient(decodedData);
        });
});

app.listen(port, () => {
    console.log(`HTTP server is running on port ${port}`);
  });

// Handle errors
serialPort.on('error', (err) => {
  console.error('Serial port error:', err.message);
});
