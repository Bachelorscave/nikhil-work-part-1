const { exec } = require('child_process');
const os = require('os');

// Get local IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (!iface.internal && iface.family === 'IPv4') {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Start the server
console.log('Starting Bachelors Cave server...');
const serverProcess = exec('node src/server.js');

// Handle server output
serverProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

serverProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

// Get local IP address
const localIp = getLocalIpAddress();
console.log(`\n=================================================`);
console.log(`Server is accessible at:`);
console.log(`- Local: http://localhost:${process.env.PORT || 5000}`);
console.log(`- Network: http://${localIp}:${process.env.PORT || 5000}`);
console.log(`\nTo connect from Cursor:`);
console.log(`1. Open Cursor`);
console.log(`2. Go to Settings > Extensions > API`);
console.log(`3. Enter the URL: http://localhost:${process.env.PORT || 5000}`);
console.log(`4. Click "Connect"`);
console.log(`=================================================\n`);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  serverProcess.kill();
  process.exit();
}); 