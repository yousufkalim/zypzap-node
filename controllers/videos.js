const path = require("path");
const { getVideoDurationInSeconds } = require("get-video-duration");
// const AWS = require("aws-sdk");
// Note: All these need to be done
const Video = require("../models/videos");
const Course = require("../models/courses");

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
  try {
    const _id = req.params.id;
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
//   convert mints to time formate houre:mint:second  it use in frontEnd , here we save total second of video duration
// function format(time) {
//   // Hours, minutes and seconds
//   var hrs = ~~(time / 3600);
//   var mins = ~~((time % 3600) / 60);
//   var secs = ~~time % 60;

//   // Output like "1:01" or "4:03:59" or "123:03:59"
//   var ret = "";
//   if (hrs > 0) {
//     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
//   }
//   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
//   ret += "" + secs;
//   return ret;
// }
exports.postVideo = async (req, res) => {
  try {
    const { courseId } = req.body;
    const path = req.file.location;
    let duration;
    const videoDuration = await getVideoDurationInSeconds(path);
    const video = new Video({
      ...req.body,
      src_url: req.file.location,
      views: 0,
      duration: videoDuration,
      course: courseId,
      file_props: {
        ...req.file,
      },
    });
    await video.save();
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { videos: video._id },
      },
      {
        new: true,
      }
    );
    res.send(video);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addViews = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(400).send({ message: "Video not found" });
    video.views = video.views + 1;
    video.save();
    res.send(video);
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
