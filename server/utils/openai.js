const OpenAIApi = require("openai");

const openAi = new OpenAIApi({
  apiKey: process.env.OPEN_AI_API_KEY,
});

module.exports = openAi;
