const fs = require("fs");

// Note: All these need to be done
const Video = require("../models/videos");

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) res.status(404).send("Videos Not Found");
    res.send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneVideo = async (req, res) => {
  const _id = req.params.id;
  try {
    const video = await Video.findById(_id);
    if (!video) res.status(404).send("Not Found");
    res.send(video);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.postVideo = async (req, res) => {
  const video = new Video({
    ...req.body,
    src_url: req.file.path,
    file_props: {
      ...req.file,
    },
  });
  await video.save();
  res.send(video);
};

exports.updateVideo = async (req, res) => {
  const _id = req.params.id;
  try {
    const video = await Video.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!video) return res.status(404).send("Video Not Found");
    res.send(video);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteVideo = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedVideo = await Video.findByIdAndDelete(_id);
    fs.unlink(deletedVideo.src_url, function (errorUnlink) {
      if (errorUnlink) {
        console.log(errorUnlink);
      }
    });
    if (!deletedVideo) return res.status(404).send("Video Not Found");
    res.send(deletedVideo);
  } catch (error) {
    res.status(500).send(error);
  }
};
