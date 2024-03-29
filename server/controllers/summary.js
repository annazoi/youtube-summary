const fs = require("fs");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const ffmpeg = require("ffmpeg-static");
const deepgram = require("../utils/deepgram");
const summary = require("../services/summary");
const path = require("path");

const getSummary = async (req, res) => {
  try {
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

    YD.on("finished", async (err, video) => {
      const videoFileName = video.file;
      console.log(`Downloaded ${videoFileName}`);

      const file = {
        buffer: fs.readFileSync(videoFileName),
        mimetype: "audio/mp3",
      };
      const options = {
        punctuate: true,
      };

      await deepgram.transcription
        .preRecorded(file, options)
        .then(async (result) => {
          fs.unlinkSync(videoFileName);
          const transcript =
            result.results.channels[0].alternatives[0].transcript;

          const summaryText = await summary(transcript, res);
          return res.status(200).json({ transcript, summaryText });
        })
        .catch((e) => console.log(e));
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { getSummary };
