import { Store } from "vuex";
import { State } from "../types";
import { getState } from "./storage";

export default function (store: Store<State>) {
  if (store.state.initialized) {
    return Promise.resolve();
  }

  return getState().then((state) => store.commit("setSavedData", state));
}
