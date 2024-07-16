const WebSocket = require('ws');
const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');

const server = new WebSocket.Server({ port: 4001 });

const handlingSocketConnection = () => {
  server.on('connection', (socket) => {
    console.log('Client is closed -> ' + socket._socket?._readableState?.closed);
    socket.send('WebSocketServer!');

    if (!socket._socket?._readableState?.closed) {
      handlingSerialConnection(socket);
    }
  });
};

const reConnection = () => {

      setTimeout(() => {
        console.log('Attempting to reconnect...');
        server.on('connection', (socket) => {
          console.log('Client Reconnected');
          socket.send('WebSocketServer Reconnected!');  
        });
      }, 2000);
};


const handlingSerialConnection = (socket) => {

  try {
    let isConnected = false;
    let decodedData, distinctVal = '';
    const serialPortInstance = startSerialConnection();

    if (serialPortInstance) {
      serialPortInstance.open(function (err) {
        if (err) {
          if (err.message === 'Port is already open') {
            serialPortInstance.close();
          }
          console.log('Error opening port: ', err.message);
        }
        isConnected = true;
        console.log('Serial Connection Started....');
      });

      serialPortInstance.on('readable', function () {
        const data = serialPortInstance.read();
        if (data != null) {
          decodedData = new TextDecoder().decode(data);
          const latestData = collectScaletData(decodedData);
         
          if (latestData !== undefined && latestData !== distinctVal) {
             distinctVal = latestData;
            if (!socket?._socket?._readableState?.closed){
              socket.send(`${distinctVal}`);
            } 
            console.log(`Serial data.... ${distinctVal}`);
          }
        }
      });

    }
  } catch (error) {
    console.log(error);
  }

}

if (require.main === module) {
  handlingSocketConnection();
}
