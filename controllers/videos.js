const fs = require("fs");
const path = require("path");

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
exports.watchVideo = async (req, res) => {
  const _id = req.params.id;
  try {
    const video = await Video.findById(_id);
    if (!video) res.status(404).send("Not Found");
    const range = req.headers.range;
    const videoPath = path.resolve(video.src_url);
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.postVideo = async (req, res) => {
  try {
    console.log(req.file);
    const video = new Video({
      ...req.body,
      src_url: req.file.path,
      views: 0,
      file_props: {
        ...req.file,
      },
    });
    await video.save();
    res.send(video);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addViews = async (req, res) => {
  const video_id = req.params.id;
  try {
    const vedio = await Video.findById(video_id);
    if (!vedio)
      return res.status(400).send({ message: "Vedio Id is not valid" });
    vedio.views = vedio.views + 1;
    vedio.save();
    res.send(vedio);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getviews = async (req, res) => {
  const video_id = req.params.id;
  try {
    const vedio = await Video.findById(video_id);
    if (!vedio)
      return res.status(400).send({ message: "Vedio Id is not valid" });
    let views = vedio.views;
    res.send({ "Total Views": views });
  } catch (error) {
    res.status(500).send(error);
  }
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
