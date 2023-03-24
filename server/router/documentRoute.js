const express = require("express");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectID;

// const app = express();

// // serve static files
// app.use(express.static("public"));
router.use(express.static("../client/src/"));
const mongoURI = process.env.DATABASE;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs, filename;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images",
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    // this function runs every time a new file is created
    return new Promise((resolve, reject) => {
      // use the crypto package to generate some random hex bytes
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // turn the random bytes into a string and add the file extention at the end of it (.png or .jpg)
        // this way our file names will not collide if someone uploads the same file twice
        filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          //   user: "admin",
          filename: filename,
          bucketName: "images",
        };
        // resolve these properties so they will be added to the new file document
        resolve(fileInfo);
      });
    });
  },
});

// set up our multer to use the gridfs storage defined above
const store = multer({
  storage,
  // limit the size to 20mb for any files coming in
  limits: { fileSize: 20000000 },
  // filer out invalid filetypes
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // https://youtu.be/9Qzmri1WaaE?t=1515
  // define a regex that includes the file types we accept
  const filetypes = /pdf/;
  //check the file extention
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // more importantly, check the mimetype
  const mimetype = filetypes.test(file.mimetype);
  // if both are good then continue
  if (mimetype && extname) return cb(null, true);
  // otherwise, return error message
  cb("filetype");
}

const uploadMiddleware = (req, res, next) => {
  const upload = store.single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File too large");
    } else if (err) {
      // check if our filetype error occurred
      if (err === "filetype") return res.status(400).send("Image files only");
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    // all good, proceed
    next();
  });
};

router.post("/api/image/upload", uploadMiddleware, async (req, res) => {
  // get the .file property from req that was added by the upload middleware
  const { file } = req;
  // and the id of that new image file
  const { id } = file;
  // we can set other, smaller file size limits on routes that use the upload middleware
  // set this and the multer file size limit to whatever fits your project
  if (file.size > 5000000) {
    // if the file is too large, delete it and send an error
    deleteImage(id);
    return res.status(400).send("file may not exceed 5mb");
  }
  console.log("uploaded file: ", file);
  console.log("object ID: ", file.id);
  console.log("filename: " + filename);
  return res.send(file.id);
});

const deleteImage = (id) => {
  if (!id || id === "undefined") return res.status(400).send("no image id");
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) return res.status(500).send("image deletion error");
  });
};

router.get("/api/files/:id", ({ params: { id } }, res) => {
  // const file_id = "641b69f8ba87a128c7588d52";
  const downloadStream = gfs.openDownloadStream(ObjectId(id));

  // Set response headers
  res.set("Content-Type", "application/pdf");
  res.set("Content-Disposition", "attachment; ");

  // Stream the file to the client
  downloadStream.pipe(res);
});

// router.get("/api/files/view/:id", async (req, res) => {
//   const id = req.params.id.trim();
//   const file = await gfs.openDownloadStream(ObjectId(id));
//   const pdfData = [];

//   file.on("data", (chunk) => {
//     pdfData.push(chunk);
//   });

//   file.on("end", () => {
//     const pdfBuffer = Buffer.concat(pdfData);
//     const pdfDataUri = `contentType:application/pdf;base64,${pdfBuffer.toString(
//       "base64"
//     )}`;

//     // Use the PDF data URI here...
//     res.send(pdfDataUri);
//   });
// });
// const fs = require("fs");

// const fileId = new ObjectId("641b69f8ba87a128c7588d52"); // replace with your file id
// const downloadStream = gfs.openDownloadStream(fileId);

// // pipe the file stream to a local file (optional)
// const writeStream = fs.createWriteStream("file.pdf");
// downloadStream.pipe(writeStream);

// router.get("/api/files/view/:id", async (req, res) => {
//   const fileId = new ObjectId("641b69f8ba87a128c7588d52");
//   const downloadStream = gfs.openDownloadStream(fileId);
//   downloadStream.pipe(res);
// });

// router.get("/api/files/view/:id", (req, res) => {
//   gfs.files.findOne({ _id: new mongo.ObjectID(req.params.id) }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: "No files exist",
//       });
//     }

//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

// const mongoURI = process.env.DATABASE;
// const conn = mongoose.createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let gfs, filename;
// conn.once("open", () => {
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "images",
//   });
// });
const Grid = require("gridfs-stream");
let gfs1;
mongoose.connection.once("open", () => {
  gfs1 = Grid(mongoose.connection.db, mongoose.mongo);
});

router.get("/api/files/view/:id", (req, res) => {
  const fileId = req.params.id;
  console.log("Files: " + req.params.id);
  // gfs1.files.findOne({ _id: fileId }, (err, file) => {
  //   if (!file || file.length === 0) {
  //     return res.status(404).json({
  //       err: "No files exist",
  //     });
  //   }
  // const readstream = gfs1.createReadStream(
  //   `7217c83dafb3f884f53df9a14896866a.pdf`
  // );
  // res.set("Content-Type", file.contentType);
  // return readstream.pipe(res);

  // });

  const downloadStream = gfs.openDownloadStream(new ObjectId(fileId));
  downloadStream.on("error", () => {
    res.status(404).json({
      message: "File not found",
    });
  });
  res.set("Content-Type", "application/pdf");
  downloadStream.pipe(res);
});

// In the updated code:

// We use gfs.files.findOne instead of gfs.files.find to retrieve the file with the given ID. This returns a

module.exports = router;
// filename= "27431f4c4421b3a61fe30853540f0644.pdf"
