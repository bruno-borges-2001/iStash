import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

import db from "@/plugins/firebase/firestore";

export default new Vuex.Store({
  state: {
    // AUTH
    logged: false,
    currentUser: null,
    userId: null,

    // ROUTER
    history: [],

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
    historyAdd(state, newRoute) {
      state.history.push(newRoute);
    },
    historyUpdate(state, newRoute) {
      if (state.history.length > 0) state.history[-1] = newRoute;
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
    pushRoute({ commit }, route) {
      commit("historyAdd", router.currentRoute.name);
      router.push(route).catch(() => {});
    },
    replaceRoute({ commit }, route) {
      commit("historyUpdate", router.currentRoute.name);
      router.replace(route).catch(() => {});
    },
    goBack({ state }, resetAll) {
      if (resetAll) {
        state.history = [];
        router.replace("/").catch(() => {});
      } else {
        const retrievedRoute = state.history.pop();
        router
          .replace(
            retrievedRoute && retrievedRoute !== "Home" ? retrievedRoute : "/"
          )
          .catch(() => {});
      }
    },
  },
  modules: {},
});
