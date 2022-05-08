import db from "../plugins/firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";

import Stash from "../models/Stash";
import { Invite } from "../types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // AUTH
    logged: false,
    currentUser: null,
    userId: null,

    // STASH
    myStashes: [] as Stash[],
    myInvites: [] as Invite[],

    // OTHER
    stashesLoaded: false,
    invitesLoaded: false,

    updateData: true,
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
      state.stashesLoaded = true;
    },
    setInvites(state, value) {
      state.myInvites = value;
      state.invitesLoaded = true;
    },
    setSavedData(_state, value) {
      _state = value;
    },
    enableUpdateData(state) {
      state.updateData = true;
    },
    disableUpdateData(state) {
      state.updateData = false;
    },
  },
  actions: {
    login({ commit }, currentUser: string) {
      commit("login", currentUser);

      if (currentUser) {
        db.collection("users")
          .doc(currentUser)
          .get()
          .then((doc) => doc.exists && commit("setUserData", doc.data()));
      }
    },
    addNewStash({ state, commit }, stash: Stash) {
      commit("setStashes", [...state.myStashes, stash]);
    },
    removeStash({ state, commit }, id: string) {
      const element = state.myStashes.find((el) => el.id === id)!;
      element.remove();
      commit(
        "setStashes",
        state.myStashes.filter((el) => el.id !== id)
      );
    },
  },
  getters: {
    getStash: (state) => (id: string) => {
      return state.myStashes.find((el) => el.id === id);
    },
  },
  modules: {},
});
