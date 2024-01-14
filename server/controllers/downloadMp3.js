const fs = require("fs");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const ffmpeg = require("ffmpeg-static");

const getDownloadMp3 = async (req, res) => {
  const { url } = req.body;

  const id = new URL(url).searchParams.get("v");

  const YD = new YoutubeMp3Downloader({
    ffmpegPath: ffmpeg,
    outputPath: "./",
    youtubeVideoQuality: "highestaudio",
  });

  YD.download(id);

  YD.on("progress", (data) => {
    console.log(data.progress.percentage + "% downloaded");
  });

  YD.on("finished", async (video) => {
    try {
      const videoFileName = video.file;
      console.log(`Downloaded ${videoFileName}`);

      const file = `${__dirname}/${videoFileName}`;
      console.log(file);
      return res.json({ message: "Downloaded" });
      // res.download(file);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
};

module.exports = { getDownloadMp3 };
