const fs = require("fs");

const deleteFile = async (path) => {
  await fs.unlink(path, (err) => {
    if (err) console.error(err);
  });
};

module.exports = deleteFile;
