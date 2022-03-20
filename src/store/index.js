import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import db from "@/plugins/firebase/firestore";

export default new Vuex.Store({
  state: {
    // AUTH
    logged: false,
    currentUser: null,
    userId: null,

    // STASH
    myStashes: [],
  },
  mutations: {
    login(state, userId) {
      state.logged = !!userId;
      state.userId = userId;
    },
    setUserData(state, userData) {
      state.currentUser = userData;
    },
    setStashes(state, value) {
      state.myStashes = value;
    },
  },
  actions: {
    login({ commit }, currentUser) {
      commit("login", currentUser);

      if (currentUser) {
        db.collection("users")
          .doc(currentUser)
          .get()
          .then((doc) => doc.exists && commit("setUserData", doc.data()));
      }
    },
  },
  modules: {},
});
