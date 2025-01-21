// Import the Express app instance from the app.js file
const app = require("./app");

// Import the port configuration from the config file
const { port } = require("./config/config");

/**
 * Start the Express server on the specified port.
 * The port is either configured through an environment variable or defaults to 3000.
 */
app.listen(port, () => {
  console.log(`=================================`);
  console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.log(`🚀 App listening on the port ${port}`);
  console.log(`=================================`);
});
