const WebSocket = require('ws');
const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');

const server = new WebSocket.Server({ port: 4001 });
let isConnected = false;
let decodedData, distinctVal = '';
let serialPortInstance;

const handlingSocketConnection = () => {
  server.on('connection', (socket) => {
    console.log('Client connected');
    socket.send('WebSocketServer!');

    socket.on('close', () => {
      console.log('Client disconnected');
      isConnected = false;
      if (serialPortInstance && serialPortInstance.isOpen) {
        serialPortInstance.close(() => {
          console.log('Serial port closed due to client disconnection');
        });
      }
    });

    socket.on('error', (error) => {
      console.log('WebSocket error:', error);
      socket.close();
      attemptReconnection();
    });

    handlingSerialConnection(socket);
  });

  server.on('error', (error) => {
    console.log('WebSocket server error:', error);
    // Attempt reconnection after a delay
    attemptReconnection();
  });

};

const attemptReconnection = () => {
  setTimeout(() => {
    console.log('Attempting to reconnect...');
    handlingSocketConnection();
  }, 2000);
};

const handlingSerialConnection = (socket) => {
  try {
    console.log('Checking for new serial port instance...' + isConnected);
    if (!isConnected) {
      serialPortInstance = startSerialConnection();
    }

    if (serialPortInstance) {
      console.log('socket.readyState  2nd-> ' + socket.readyState);
      if (!isConnected) {
        serialPortInstance.open((err) => {
          if (err) {
            console.log('Error opening port: ', err.message);
            return;
          }
          isConnected = true;
          console.log('Serial Connection Started....');
        });
      }

      serialPortInstance.on('readable', () => {
        const data = serialPortInstance.read();
        if (data != null) {
          decodedData = new TextDecoder().decode(data);
          const latestData = collectScaletData(decodedData);

          if (latestData !== undefined && latestData !== distinctVal) {
            distinctVal = latestData;
            console.log('socket.readyState  3rd-> ' + socket.readyState);
            if (socket.readyState === WebSocket.OPEN) {
              console.log(`Serial data.... ${distinctVal}`);
              socket.send(`${distinctVal}`);
            }
          }
        }
      });

    }
  } catch (error) {
    console.log(error);
  }
};

if (require.main === module) {
  handlingSocketConnection();
}

