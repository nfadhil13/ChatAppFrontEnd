<template>
    <v-app-bar app flat height="150" color="white">
      <v-spacer />
      <v-container fluid>
        <v-row class="justify-center">
          <v-toolbar-title>
            <span class="font-weight-bold text-h1">F</span>
            <span class="font-weight-light">chat</span>
          </v-toolbar-title>
        </v-row>
        <v-row>
          <hr />
        </v-row>
        <v-row class="justify-center" style="margin-top:10px">
            <v-btn text  to="/" @click="currentSelected = 'home'" :ripple="false">
              <span :class="navItemClass('home')">Home</span>
            </v-btn>
            <v-btn text  to="/create"  @click="currentSelected = 'create_room'" :ripple="false">
              <span :class="navItemClass('create_room')">Create Room</span>
            </v-btn>
        </v-row>
      </v-container>
      <v-spacer />
    </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      currentSelected: "home",
    };
  },
  methods: {
    navItemClass(navItem) {
      if (navItem === this.currentSelected) {
        return "font-weight-bold text-content";
      }
      return "font-weight-light text-content";
    },
  },
};
</script>