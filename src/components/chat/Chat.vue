<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <p
            class="text-center text-h5 font-weight-bold"
          >Happy Chatting!</p>
        </v-col>
      </v-row>
      <v-row v-for="(message,index) in messages" :key="message.id">
        <chat-item
          :message="message"
          :isUser="user.id === message.user.id"
          :isNameLabelNeeded=" !(index>0 && messages[index].user.id === messages[index-1].user.id)"
        ></chat-item>
      </v-row>
      <v-row>
        <v-col>
          <form @submit.prevent="sendMessage">
            <v-row>
              <v-col>
                <v-textarea color="black" rows="1" outlined auto-grow v-model="newMessage"></v-textarea>
              </v-col>
              <v-col cols="1">
                <v-btn type="submit" class="ma-2" outlined color="black">Send</v-btn>
              </v-col>
            </v-row>
          </form>
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
import { store } from "../../store/index.js";

export default {
  created() {
    this.socket = openSocket.connect(BASE_URL);
    this.socket.emit("room", this.roomId);
    this.socket.on(NEW_MESSAGE_EVENT, ({ data }) => {
      if (data.user.id !== this.user.id) {
        this.pushMessage(data);
      }
    });
    this.socket.on(NEW_USER_EVENT, (data) => {
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
      clearData: "room/clearData",
    }),
    sendMessage() {
      console.log(this.roomId);
      this.sendNewMessage({
        userId: this.user.id,
        message: this.newMessage,
        roomId: this.roomId,
      });
      this.newMessage = "";
    },
  },
  computed: {
    ...mapGetters({
      roomId: "room/roomId",
      state: "room/state",
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
      socket: null,
    };
  },
  beforeDestroy() {
    this.socket.disconnect();
    this.clearData();
  },
  async beforeRouteEnter(to, from, next) {
    const roomId = to.params.roomId;
    await store.dispatch("room/validateJoinRoom", { theRoomId: roomId });
    const state = store.getters["room/state"];
    if (state.error) {
      store.dispatch("room/clearData");
      next({ path: "/" });
    } else {
      next();
    }
  },
};
</script>