const { Service } = require("node-windows");
const path = require("path");

// Create a new service object
const svc = new Service({
  name: "AppTest", // Name of the service
  description: "My Node.js application as a Windows service.", // Description
  script: path.join(__dirname, "index.js") && path.join(__dirname, "webSocket.js"), // Path to the script to run as a processt"), // Path to the script to run
  logpath: path.join(__dirname, "logs"), // Path to the log directory
  logFile: "weightApp.log", // Log file name
  wait: 1, // Wait 1 second before restarting
  grow: 0.25, // Increase wait by 25% on each crash
  maxRetries: 3, // Maximum retries before giving up
  abortOnError: false, // Keep the service running despite errors
});

// Event triggered when the service is installed
svc.on("install", () => {
  console.log("Service installed successfully!");
  svc.start(); // Start the service after installation
});

// Event triggered when there's an error
svc.on("error", (err) => {
  console.error("Error during service setup:", err);
});

// Install the service
svc.uninstall();

