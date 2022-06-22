import auth from "../plugins/firebase/auth";
import { getState } from "./storage";

export default function (store) {
  if (auth.currentUser && store.state.initialized) {
    return Promise.resolve();
  }

  return getState().then((state) => {
    store.commit("setSavedData", state);
  });
}
