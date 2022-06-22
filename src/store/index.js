import db from "../plugins/firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";

import Stash from "../models/Stash";

import load from "./loadState";
import cache from "./cache";
import sync from "./sync";
import createStash from "../helpers/createStash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    // AUTH
    logged: false,
    currentUser: null,
    userId: null,

    // STASH
    myStashes: [],
    myInvites: [],

    diffs: [],
    newData: [],

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
    setDiffs(state, { diffs, data }) {
      state.diffs = diffs;
      state.newData = data;
    },
    setSavedData(state, value) {
      Object.keys(value).forEach((key) => {
        switch (key) {
          case "myStashes": {
            if (navigator.onLine) return;
            const parsed = value[key].map(createStash);

            state[key] = parsed;

            break;
          }

          case "myInvites": {
            const parsed = value[key].map((el) => ({
              ...el,
              stash: createStash(el.stash),
            }));

            state[key] = parsed;

            break;
          }

          case "updateData":
            state.updateData = true;

            break;

          default:
            state[key] = value[key];
        }
      });
      state.initialized = true;
    },
    enableUpdateData(state) {
      state.updateData = true;
    },
    disableUpdateData(state) {
      state.updateData = false;
    },
    updateStash(state, { id, value }) {
      const itemIndex = state.myStashes.findIndex((el) => el.id === id);

      if (itemIndex >= 0) {
        state.myStashes[itemIndex] = value;
      } else {
        state.myStashes.push(createStash(value));
      }
    },
    removeStash(state, { id }) {
      state.myStashes = state.myStashes.filter((el) => el.id !== id);
    },
    clearChange(state, id) {
      delete state.diffs[id];
      state.newData = state.newData.filter((el) => el.id !== id);
    },
    clearData(state) {
      state.myStashes = [];
      state.myInvites = [];
      state.diffs = [];
      state.newData = [];
    }
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
    removeStash({ getters }, id) {
      const element = getters.getStash(id);
      element.remove();
    },
  },
  getters: {
    getStash: (state) => (id) => {
      return state.myStashes.find((el) => el.id === id);
    },
  },
  plugins: [load, cache, sync],
  modules: {},
});
