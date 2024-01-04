const openAi = require("../utils/openai");

const summary = async (transcript) => {
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `create a summary of this text ${transcript}` },
    ],
  });
  const result = response.choices[0].message.content;
  // console.log(result);
  return result;
};

module.exports = summary;
