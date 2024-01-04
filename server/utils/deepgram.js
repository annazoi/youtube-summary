const { Deepgram } = require("@deepgram/sdk");

const deepgram = new Deepgram(process.env.DG_KEY);

module.exports = deepgram;
