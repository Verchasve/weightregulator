const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'appDataService', // Name of your service
  description: 'Node.js application as a Windows service', // Description of your service
  script: path.join(__dirname, 'master.js'), // Path to the script you want to run as a service
  nodeOptions: [
    '--harmony', // Optional: Node options like '--harmony' can be specified here
    '--max_old_space_size=4096'
  ],
  // If the app uses environment variables, you can define them here
  env: {
    name: 'NODE_ENV',
    value: 'production'
  }
});

// Listen for the "install" event, which indicates the process is available as a service
svc.on('install', () => {
  console.log('Service installed successfully!');
  svc.start(); // Start the service after installation
});

// Install the service
svc.install();
