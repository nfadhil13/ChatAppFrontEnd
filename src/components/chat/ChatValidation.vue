<template>
  <div>
    <!-- <p class="text-center text-h5 font-weight-bold" style="margin-top:10px">Happy Chatting!</p>
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
    </v-container> -->
  </div>
</template>

// <script>
// import openSocket from "socket.io-client";
// import { BASE_URL, NEW_MESSAGE_EVENT, NEW_USER_EVENT } from "../../api/const";
// import { mapActions, mapGetters } from "vuex";
// import { store } from "../../store/index.js";

// export default {
//   methods: {
//     ...mapActions({
//         validateJoinRoom : 'room/validateJoinRoom'
//     })
//   },
//   computed: {
//     ...mapGetters({
//       state : 'room/state'
//     }),
//     messages: {
//       get() {
//         return this.$store.getters["room/messages"];
//       },
//       set(value) {
//         this.pushMessage(value);
//       },
//     },
//   },
//   data() {
//     return {
//       newMessage: "",
//       socket: null,
//     };
//   },
//   beforeDestroy() {
//     this.socket.disconnect();
//     this.clearData();
//     console.log("beforeDestroy");
//   },
//   async beforeRouteEnter(to, from, next) {
//     console.log('beforeEnter');
//     const roomId = to.params.roomId;
//     await store.dispatch("room/validateJoinRoom", { theRoomId: roomId });
//     const state = store.getters["room/state"];
//     if (state.error) {
//       console.log('Error');
//       store.dispatch("room/clearData");
//       next({ path: "/" });
//     }
//     if (state.success) {
//       console.log('SUCCESS'); 
//       next();
//     }
//   },
// };
// </script>