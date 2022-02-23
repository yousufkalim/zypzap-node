const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  secretAccessKey: "LDlMQoEk3fg/m25anC7klW/w42GuDTbOpSlS4HNp",
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  accessKeyId: "AWS_ACCESS_KEY_ID_REDACTED",
  region: "eu-west-3", // region of your bucket
});

const s3 = new aws.S3();
const imageStorage = multer.diskStorage({
  destination: `uploads`, // Destination to store images
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(jpeg|png|svg|jpg|gif)$/)) {
      return cb(new Error("Please upload Image"));
    }
    cb(undefined, true);
  },
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pass-to-trip",
    destination: "uploads",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname, destination: "uploads" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const blogImageStorage = multer.diskStorage({
  destination: `uploads/blogImages`, // Destination to store images
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const blogImageUpload = multer({
  storage: blogImageStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(jpeg|png|svg|jpg|gif)$/)) {
      return cb(new Error("Please upload Image"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload, blogImageUpload, upload };
