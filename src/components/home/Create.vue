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
                counter
                v-model="username"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-btn v outlined @click="createRoom(username)" :disabled="!isInputValid">Join</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  beforeDestroy(){
    console.log('beforedestroy')
  },
  data() {
    return {
      username: "",
      maxNameLength: 18,
      rules : {
        required : value => !!value || 'This field is required',
        maxLength : value => value.length <= this.maxNameLength || `Maximum length is ${this.maxNameLength} characters`,
        notContainSpace : value => !/\s/.test(value) || "No Spaces Allowed"
      }
    };
  },
  computed: {
    ...mapGetters({
      roomId: "room/roomId",
      state: "room/state",
    }),
    isInputValid(){
      const isEmpty = this.username ==='';
      const isLengthOver = this.username.length > this.maxNameLength;
      const isContainSpace = /\s/.test(this.username)
      if(isEmpty || isLengthOver ||  isContainSpace){
        return false;
      }
      return true;
    }
  },
  watch: {
    roomId(value) {
      if (value != "") {
        this.goToChat(value);
      }
    },
  },
  methods: {
    ...mapActions({
      createRoom: "room/createRoom",
    }),
    goToChat(roomId) {
      console.log(roomId);
      this.$router.push({
        name: "chat",
        params: { roomId },
      });
    },
  },
};
</script>