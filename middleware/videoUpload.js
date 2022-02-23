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
const videoStorage = multer.diskStorage({
  destination: "videos", // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 1000000000, // 1000000000 Bytes = 1000 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});
module.exports = videoUpload;
