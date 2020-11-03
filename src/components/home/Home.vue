<template>
    <v-app>
      <nav-bar/>
      <v-main>
           <transition name="slide" mode="out-in">
               <router-view></router-view>
           </transition>
      </v-main>
    </v-app>
</template>

<script>
import NavBar from '../UI/NavBar.vue'
export default {
  components: {
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>

.slide-enter-active{
    animation : slide-in 0.4s ease-out forwards;
}

.slide-leave-active{
    animation : slide-out 0.4s ease-out forwards;
}

@keyframes slide-in {
    from{
        transform: translateX(-100%);
        opacity: 0;
    }
    to{
        transform: translateX(0%);
        opacity: 1;
    }
}

@keyframes slide-in {
    from{
        transform: translateX(0%);
        opacity: 1;
    }
    to{
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
