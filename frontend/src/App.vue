<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <VueBotUI
      :options="botOptions"
      :messages="messageData"
      :bot-typing="botTyping"
      :input-disable="inputDisable"
      :is-open="true"
      @msg-send="msgSend"
      @init="botStart"
    />
  </div>
</template>

<script>
import { VueBotUI } from "vue-bot-ui";
import { sendMessage, getChatlog } from "./helpers/helpers";

export default {
  name: "App",
  components: {
    VueBotUI,
  },
  watch: {
    messageData() {
      console.log(this.messages);
    },
  },
  data() {
    return {
      messageData: [], // See Data example below
      botTyping: false,
      inputDisable: false,
      botOptions: {
        // See the list of options below
      },
    };
  },
  methods: {
    botStart() {
      this.messageData.push({
        type: "text",
        agent: "bot",
        text: "Hi, I'm Camron. Nice to meet you!",
      });
    },
    msgSend(message) {
      // Send message to the backend
      // ...
      // Add response to the messages array
      this.messageData.push({
        type: "text",
        agent: "user",
        text: message.text,
      });
      this.getResponse();
    },
    async getResponse() {
      this.botTyping = true;
      this.inputDisable = true;
      // Get response from the backend
      const chatlog = getChatlog(this.messageData);
      console.log({ chatlog });
      const response = await sendMessage(chatlog);
      this.botTyping = false;
      this.inputDisable = false;
      this.messageData.push({
        type: "text",
        agent: "bot",
        text: response,
      });

    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
