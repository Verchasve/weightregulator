const WebSocket = require('ws');
const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');

const server = new WebSocket.Server({ port: 4001 });
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
      serialPortInstance = startSerialConnection();
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
          const latestData = collectScaletData(decodedData);

        if (latestData !== undefined && latestData !== distinctVal) {
         distinctVal = latestData;

        if (!socket?._socket?._readableState?.closed && socket.readyState === WebSocket.OPEN) {
        //console.log(`Serial data.... ${data}`); 
          //socket.send(`${distinctVal}`);
        }

        }
        }
      });

    }
  } catch (error) {
    console.log(error);
  }
}


if (require.main === module) {
  server.on('connection', (socket) => {
    handlingSocketConnection(socket);
  });
}



// // problrm with this code is that when connect button is clicked first time, the state of the socket.readyState) in console.log('socket.readyState  3rdnd-> ' + socket.readyState) remain 1. But when the disconnect button is clicked, and then after connect button is clicked again, the state of the socket.readyState in console.log('socket.readyState  3rdnd-> ' + socket.readyState) turn to 3. fix the follwing code such that state of socket.readyState should remain 1


// const WebSocket = require('ws');
// const { startSerialConnection, collectScaletData } = require('./serialComm/serialScaleGen');

// const server = new WebSocket.Server({ port: 4001 });
// let isConnected = false;
// let decodedData, distinctVal = '';
// let serialPortInstance;

// const handlingSocketConnection = () => {
//   server.on('connection', (socket) => {
//     console.log('Client connected');
//     socket.send('WebSocketServer!');

//     socket.on('close', () => {
//       console.log('Client disconnected');
//       isConnected = false;
//       if (serialPortInstance && serialPortInstance.isOpen) {
//         serialPortInstance.close(() => {
//           console.log('Serial port closed due to client disconnection');
//         });
//       }
//     });


    
//     socket.on('error', (error) => {
//       console.log('WebSocket error:', error);
//       socket.close();
//       attemptReconnection();
//     });

//     handlingSerialConnection(socket);
//   });

//   server.on('error', (error) => {
//     console.log('WebSocket server error:', error);
//     // Attempt reconnection after a delay
//     attemptReconnection();
//   });

// };

// const attemptReconnection = () => {
//   setTimeout(() => {
//     console.log('Attempting to reconnect...');
//     handlingSocketConnection();
//   }, 2000);
// };

// const handlingSerialConnection = (socket) => {
//   try {
//     console.log('Checking for new serial port instance...' + isConnected);
//     if (!isConnected) {
//       serialPortInstance = startSerialConnection();
//     }

//     if (serialPortInstance) {
//       console.log('socket.readyState  2nd-> ' + socket.readyState);
//       if (!isConnected) {
//         serialPortInstance.open((err) => {
//           if (err) {
//             console.log('Error opening port: ', err.message);
//             return;
//           }
//           isConnected = true;
//           console.log('Serial Connection Started....');
//         });
//       }

//       serialPortInstance.on('readable', () => {
//         const data = serialPortInstance.read();
//         if (data != null) {
//           decodedData = new TextDecoder().decode(data);
//           const latestData = collectScaletData(decodedData);

//           if (latestData !== undefined && latestData !== distinctVal) {
//             distinctVal = latestData;
//             console.log('socket.readyState  3rd-> ' + socket.readyState);
//             if (socket.readyState === WebSocket.OPEN) {
//               console.log(`Serial data.... ${distinctVal}`);
//               socket.send(`${distinctVal}`);
//             }
//           }
//         }
//       });

//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// if (require.main === module) {
//   handlingSocketConnection();
// }



// //code 3
