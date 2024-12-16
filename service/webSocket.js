//const WebSocket = require('ws');
import WebSocket, { WebSocketServer } from 'ws'
//const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');
import serialScaleGen from './serialComm/serialScaleGen.js';
const server = new WebSocketServer({ port: 4001 });
let isConnected = false;
let decodedData, distinctVal = '';
let serialPortInstance ;
let socketInstance;

const handlingSocketConnection = async(socket) => {
  if (!socketInstance || socketInstance.readyState === WebSocket.CLOSED) {
    console.log('Client is closed -> ' + socket._socket?._readableState?.closed);
    console.log('socket.readyState -> ' + socket.readyState);
    socket.send('WebSocketServer!');
    socketInstance = socket;
    socketInstance.onclose = () => {
      console.log('Client disconnected');
      //isConnected = false;
      // if (serialPortInstance && serialPortInstance.isOpen) {
      //   serialPortInstance.close(() => {
      //     console.log('Serial port closed due to client disconnection');
      //   });
      // }
      socketInstance = null;
    }
    await handlingSerialConnection(socket);
  }
};

const reConnection = () => {

      setTimeout(() => {
        console.log('Attempting to reconnect...');
        handlingSocketConnection(socketInstance);
      }, 2000);
};



const handlingSerialConnection = async(socket) => {

  try {
    console.log('Checking for new serial port instance...' + isConnected);
    if (!isConnected){ 
      serialPortInstance = await serialScaleGen.startSerialConnection();
    }
  
    if (serialPortInstance) {
      console.log('socket.readyState  2nd-> ' + socket.readyState);
      if (!isConnected){
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
      }
        console.log('socket.readyState  3rdnd-> ' + socket.readyState);
      serialPortInstance.on('readable', function () {
        console.log('socket.readyState 4th-> ' + socket.readyState);
        const data = serialPortInstance.read();
        if (data != null) {
          decodedData = new TextDecoder().decode(data);
          const latestData = serialScaleGen.collectScaletData(decodedData);

        if (latestData !== undefined && latestData !== distinctVal) {
         distinctVal = latestData;

        if (!socket?._socket?._readableState?.closed && socket.readyState === WebSocket.OPEN) {
        //console.log(`Serial data.... ${data}`); 
          socket.send(`${distinctVal}`);
        }

        }
        }
      });

    }
  } catch (error) {
    console.log(error);
  }
}

const startWebSocketServer = () => { 
  console.log('Socket server running on port 4001');
  
  server.on('connection', (socket) => {
    console.log('Client connected');
    socket.send('WebSocketServer!');
    handlingSocketConnection(socket);
  });
  };

  export { startWebSocketServer };

