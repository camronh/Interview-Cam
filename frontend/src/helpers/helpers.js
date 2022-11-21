let apiUrl = `http://localhost:3000`;
const axios = require("axios").default;

function getChatlog(messages) {
  let chatlog = "";
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let user = "Interviewer";
    if (message.agent == "bot") user = "Camron";
    chatlog += user + ": " + message.text + "\n";
  }
  return chatlog;
}

async function sendMessage(chatlog) {
  const response = await axios.post(`${apiUrl}/send`, {
    chatlog,
  });
  return response.data;
}

module.exports = { sendMessage, getChatlog };
