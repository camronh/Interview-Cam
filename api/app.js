const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const { sendMessage } = require("./gpt");

app.post("/send", async (req, res) => {
  let { chatlog } = req.body;
  if (!chatlog) res.status(400).send("No chatlogs provided");
  chatlog += `Camron:`;
  const response = await sendMessage(chatlog);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
