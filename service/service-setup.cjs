const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'weightregulator1.0', // Name of the service
  description: 'My Node.js application as a Windows service.', // Description
  script: 'D:\\ProjectFiles\\abhishekReact\\weightregulator\\service\\localDb.js', // Full path to your app
  //D:\ProjectFiles\abhishekReact\weightregulator\src\App.js
  nodeOptions: [
    '--harmony', // Optional Node.js options
    '--max_old_space_size=4096'
  ]
});

// Event triggered when the service is installed
svc.on('install', () => {
  console.log('Service installed successfully!');
  svc.start(); // Start the service after installation
});

// Install the service
svc.install();
