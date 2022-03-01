const express = require("express");
const router = express.Router();
const { imageUpload, upload } = require("../middleware/imageUpload");
//const singleUpload = upload.single("image");
//for single image upload
router.post("/", upload.array("file"), async (req, res) => {
  try {
    let files = req.files;

    res.json({ file: files[0].location });
  } catch (error) {
    console.log("error message----->", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
