import { Store } from "vuex";
import auth from "../plugins/firebase/auth";
import { State } from "../types";
import { getState } from "./storage";

export default function (store: Store<State>) {
  if (auth.currentUser && store.state.initialized) {
    return Promise.resolve();
  }

  return getState().then((state) => {
    store.commit("setSavedData", state);
  });
}
