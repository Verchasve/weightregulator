const WebSocket = require('ws');
const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');

const server = new WebSocket.Server({ port: 4001 });

const handlingSocketConnection = () => {
  server.on('connection', (socket) => {
    console.log('Client connected -> ' + socket._socket?._readableState?.closed);
    socket.send('WebSocketServer!');

    if (!socket._socket?._readableState?.closed) {
      handlingSerialConnection(socket);
    }
  });
};

const reConnection = () => {

  // server.on('close', (code, reason) => {
  //     console.log(`WebSocket connection closed with code ${code} and reason: ${reason}`);
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        server.on('connection', (socket) => {
          console.log('Client Reconnected');
          socket.send('WebSocketServer Reconnected!');  
        });
      }, 2000);
   // });

}



const handlingSerialConnection = (socket) => {

  try {
    let isConnected = false;
    let decodedData, distinctVal = '';
    const serialPortInstance = startSerialConnection();

    if (isConnected) {
      //serialPortInstance.close();
    }

    if (serialPortInstance) {
      serialPortInstance.open(function (err) {
        if (err) {
          if (err.message === 'Port is already open') {
            // serialPortInstance.close();
          }
          console.log('Error opening port: ', err.message);
        }
        isConnected = true;
        console.log('Serial Connection Started....');
      });

      serialPortInstance.on('readable', function () {
        const data = serialPortInstance.read();

       // console.log('Data.....', data)
        if (data != null) {
          decodedData = new TextDecoder().decode(data);

          const latestData = collectScaletData(decodedData);

          //console.log("latestData =",decodedData)
          if (latestData !== undefined && latestData !== distinctVal) {
            distinctVal = latestData;
             
             console.log(`socket.... ${JSON.stringify(socket?._socket?._readableState?.closed)}`);

            //console.log("odlDataValue = ", oldDataValue)

            if (!socket?._socket?._readableState?.closed){
              socket.send(`Serial : ${latestData}`);
            } 
            console.log(`Serial data.... ${latestData}`);
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
