const express = require("express");
const router = express.Router();
// const { imageUpload, upload } = require("../middleware/imageUpload");
const { upload } = require("../middleware/imageUpload");
const singleUpload = upload.array("files");
//const singleUpload = upload.single("image");
//for single image upload
router.post("/", singleUpload, async (req, res) => {
  try {
    let files = req.files;
    console.log(files, "------>files");
    res.json({ file: files, courses: req.body });
  } catch (error) {
    console.log("error message----->", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
