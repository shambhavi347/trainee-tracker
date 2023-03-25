const express = require("express");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectID;

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
  return res.send(file);
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

const Grid = require("gridfs-stream");
let gfs1;
mongoose.connection.once("open", () => {
  gfs1 = Grid(mongoose.connection.db, mongoose.mongo);
});

router.get("/api/files/view/:id", (req, res) => {
  const fileId = req.params.id;
  // console.log("Files: " + req.params.id);

  const downloadStream = gfs.openDownloadStream(new ObjectId(fileId));
  downloadStream.on("error", () => {
    res.status(404).json({
      message: "File not found",
    });
  });
  res.set("Content-Type", "application/pdf");
  downloadStream.pipe(res);
});

router.get("/file/delete/:id", (req, res) => {
  const fileId = req.params.id;
  // const { imageId } = req.body;
  console.log("File id: " + fileId);
  const _id = new mongoose.Types.ObjectId(fileId);
  gfs.delete(_id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting file");
    } else {
      console.log("File deleted successfully");
      res.status(200).send("File deleted successfully");
    }
  });
});

module.exports = router;
