<template>
  <div>
    <v-form>
      <v-container>
        <v-row class="justify-center">
          <v-col md="4" cols="10" sm="10" lg="4">
            <v-row>
              <v-text-field
                ref="username"
                label="Username"
                hint="this will be use for chat username"
                :rules="[rules.required , rules.maxLength , rules.notContainSpace]"
                v-model="username"
              ></v-text-field>
            </v-row>
            <v-row style="margin-top:20px;">
              <v-text-field
                                v-model="roomId"
                label="Chat room code"
                hint="Input chat code shared by your friend"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-row class="justify-center">
                <v-btn
                  outlined
                  :disabled="!isInputValid"
                  @click="joinRoom({username, roomId})"
                >Create Room</v-btn>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import RoomResponseState from '../../store/responsestates/room'
export default {
  data() {
    return {
      maxNameLength: 18,
      username: "",
      roomId : "",
      rules: {
        required: (value) => !!value || "This field is required",
        maxLength: (value) =>
          value.length <= this.maxNameLength ||
          `Maximum length is ${this.maxNameLength} characters`,
        notContainSpace: (value) => !/\s/.test(value) || "No Spaces Allowed",
      },
    };
  },
  computed: {
    ...mapGetters({
      state : 'room/state'    
    }),
    isInputValid() {
      const isEmpty = this.username === "" || this.roomId === '';
      const isLengthOver = this.username.length > this.maxNameLength;
      const isContainSpace = /\s/.test(this.username);
      if (isEmpty || isLengthOver || isContainSpace) {
        return false;
      }
      return true;
    },
  },
  watch : {
    state(value){
      console.log(value.message)
      if(value.success){
        console.log(value.message)
        if(value.message === RoomResponseState.JOIN_ROOM_SUCCESS){
          this.goToChat(this.roomId);
        }
      }
    }
  },
  beforeDestroy(){
    console.log('destory');
  },
  methods : {
    ...mapActions({
      joinRoom : 'room/joinRoom'
    }),
    goToChat(roomId) {
      this.$router.push({
        name: "chat",
        params: { roomId },
      });
    },
  }
};
</script>