require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function sendMessage(chatlog) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: chatlog,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Interviewer:", " Camron:"],
  });
  const responseText = response.data.choices[0].text;
  console.log(chatlog + responseText);
  return responseText;
}

module.exports = { sendMessage };
