<template>
  <v-container :class="isNameLabelNeeded? '' : 'mt-n7'">
    <p class="text-body-2 font-weight-bold" v-if="isNameLabelNeeded">
      {{userName}}
      <span
        class="text-caption grey--text text--lighten-1"
        style="margin-left:10px;"
      >{{stringTime}}</span>
    </p>
    <p :class="textClass">{{messageString}}</p>
  </v-container>
</template>

<script>
import MessageStatus from "../../store/util/messageConst";
export default {
  props: {
    message: Object,
    isUser: Boolean,
    isNameLabelNeeded : Boolean,
  },
  computed: {
    textClass() {
      let classString = "text-body-2";
      if (this.message.status !== undefined) {
        console.log(this.message.status);
        switch (this.message.status) {
          case MessageStatus.SENT:
            classString = "text-body-2";
            break;
          case MessageStatus.PENDING:
            classString = "text-body-2 grey--text text--lighten-1";
            break;
          case MessageStatus.FAILED:
            classString = "text-body-2 red--text text--lighten-1";
            break;
        }
      }
      return classString;
    },
    stringTime() {
      const timeInt = Date.parse(this.message.time);
      const plainDate = new Date(timeInt);

      //Get only time example : 5:50 PM , 12:00 AM
      const onlyTimeDate = plainDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (plainDate.getDay() == new Date().getDay()) {
        return onlyTimeDate;
      } else {
        return (
          onlyTimeDate +
          " | " +
          plainDate.getDate() +
          "/" +
          plainDate.getMonth()
        );
      }
    },
    messageString(){
      let message = this.message.message
      if(this.message.status !== undefined){
        if(this.message.status === MessageStatus.FAILED){
          message = message + ' (Error , message not sent)'
        }
      }
      return message
    },
    userName() {
      return this.isUser ? "You" : this.message.user.username;
    },
  },
};
</script>
