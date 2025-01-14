const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const { promisify } = require("util");
const mkdir = promisify(fs.mkdir); // Promisify mkdir to use async/await

// Set up storage with diskStorage to store files on the disk
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let fullPath = "./otherUploads"; // Default folder

    // Dynamically set the folder based on the fieldname (input name)
    if (file.fieldname === "companyLogo") {
      fullPath = `./public/uploads/companyLogos`;
    } else if (file.fieldname === "cv") {
      fullPath = `./public/uploads/cvs`;
    } else if (file.fieldname === "profileImage") {
      fullPath = `./public/uploads/profileImages`;
    }

    // Check if the folder exists, if not, create it
    try {
      if (!fs.existsSync(fullPath)) {
        await mkdir(fullPath, { recursive: true }); // Create folder recursively
      }

      cb(null, fullPath);
    } catch (err) {
      console.error(err);
      return cb(err); // If an error occurs during folder creation
    }
  },

  filename: function (req, file, cb) {
    // Ensure req.user.id is available (check if the user is authenticated)
    // if (!req?.user || !req?.user?.id) {
    //   return cb(new Error("User ID is required"));
    // }

    // Generate the filename using user.id + timestamp + random string
    const timestamp = Date.now(); // Current timestamp
    const randomStr = crypto.randomBytes(4).toString("hex"); // 8 random characters
    const userId = req?.user?.id || req?.body?.email || ""; // User's ID

    // Create the final filename
    const filename = `${userId}-${timestamp}-${randomStr}${path.extname(
      file.originalname
    )}`;

    cb(null, filename);
  },
});

// Create the multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
