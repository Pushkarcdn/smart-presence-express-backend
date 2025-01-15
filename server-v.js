const app = require("./app"); // Your express app
const { port = 3000 } = process.env; // Use PORT from environment, fallback to 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
