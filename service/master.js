const { fork } = require('child_process');
const path = require('path');

// Path to your first script
const script1 = path.join(__dirname, 'index.js');
// Path to your second script
const script2 = path.join(__dirname, 'webSocket.js');

// Start the first script as a separate process
const child1 = fork(script1);
console.log('index.js started as a separate process');

// Start the second script as a separate process
const child2 = fork(script2);
console.log('webSocket.js started as a separate process');

// Handle exit events for the child processes
child1.on('exit', (code) => {
  console.log(`index.js exited with code ${code}`);
});

child2.on('exit', (code) => {
  console.log(`webSocket.js exited with code ${code}`);
});
