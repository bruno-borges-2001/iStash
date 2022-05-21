import db from "../plugins/firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";

import Stash from "../models/Stash";

import load from "./loadState";
import cache from "./cache";
import sync from "./sync";
import { Invite, State } from "../types";
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
    setSavedData(state, value: any) {
      Object.keys(value).forEach((key) => {
        switch (key) {
          case "myStashes": {
            const parsed = (value[key] as Stash[]).map(createStash);

            state[key as keyof State] = parsed as never;

            break;
          }

          case "myInvites": {
            const parsed = (value[key] as Invite[]).map((el) => ({
              ...el,
              stash: createStash(el.stash),
            }));

            state[key as keyof State] = parsed as never;

            break;
          }

          default:
            state[key as keyof State] = value[key] as never;
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
        state.myStashes.push(value);
      }
    },
    removeStash(state, { id }) {
      state.myStashes = state.myStashes.filter((el) => el.id !== id);
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
  plugins: [load, cache, sync],
  modules: {},
});
