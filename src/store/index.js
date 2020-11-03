import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/room'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules : {
        room
    }
});
