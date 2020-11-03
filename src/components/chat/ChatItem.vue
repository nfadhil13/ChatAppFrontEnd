<template>
  <v-container fluid :class="isUser ? 'text-right' : ''">
    <v-card max-width="100%" max-height="100%" style="padding 10px">
    <v-card-title :class="isUser ? 'justify-end' : ''"> 
        <span class="text-body-2 font-weight-bold">{{userName}} </span>
        <span class="text-caption grey--text text--lighten-1" style="margin-left:10px;">{{stringTime}}</span>
    </v-card-title>
      <v-card-text class="text--primary">
        <p class="text-body-2">{{message.message}}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    message: Object,
    isUser: Boolean,
  },
  computed: {
    stringTime() {
      return this.message.time.toLocaleDateString;
    },
    userName() {
      return this.isUser ? "You" : this.message.user.username;
    },
  },
};
</script>
