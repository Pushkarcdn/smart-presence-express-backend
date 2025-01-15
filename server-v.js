const app = require("./app");
const http = require("http");

// Vercel expects an HTTP server to be used for Node.js deployments
const server = http.createServer(app);

// Port will be set by Vercel's environment variable
const port = 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
