<template>
  <div>
    <p class="text-center text-h5 font-weight-bold" style="margin-top:10px">Happy Chatting!</p>
    <v-container>
      <v-row v-for="message in messages" :key="message.id">
        <chat-item :message="message" :isUser="user.id === message.user.id"></chat-item>
      </v-row>
      <v-row>
        <v-col lg="8">
          <input width="100%" type="text" v-model="newMessage" />
        </v-col>
        <v-col>
          <button @click="sendMessage">Send Message</button>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import openSocket from "socket.io-client";
import { BASE_URL, NEW_MESSAGE_EVENT, NEW_USER_EVENT } from "../../api/const";
import ChatItem from "./ChatItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    const socket = openSocket.connect(BASE_URL);
    socket.emit("room" , this.roomId || this.$route.params.roomId);
    socket.on(NEW_MESSAGE_EVENT, ({data}) => {
      console.log(data);
      this.pushMessage(data);
    });
    socket.on(NEW_USER_EVENT, (data) => {
      console.log(data);
    });
  },
  components: {
    ChatItem,
  },
  methods: {
    ...mapActions({
      pushMessage: "room/pushMessage",
      sendNewMessage: "room/sendMessage",
    }),
    sendMessage() {
      console.log(this.roomId);
      this.sendNewMessage({
          userId : this.user.id,
          message : this.newMessage,
          roomId : this.roomId
      });
      this.newMessage = "";
    },
  },
  computed: {
    ...mapGetters({
      roomId: "room/roomId",
      loading: "room/loading",
      getMessage: "room/messages",
      user: "room/user",
    }),
    messages: {
      get() {
        return this.$store.getters["room/messages"];
      },
      set(value) {
        this.pushMessage(value);
      },
    },
  },
  data() {
    return {
      newMessage: "",
    };
  },
};
</script>