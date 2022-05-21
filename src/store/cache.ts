import { MutationPayload, Store } from "vuex";
import { State } from "../types";
import { setState } from "./storage";

const shouldSkipCache = (mutation: MutationPayload) => {
  if (mutation.type === "setInvites") return true;
  return false;
};

const plugin = (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    if (!shouldSkipCache(mutation)) {
      setState(state).catch((err) =>
        console.warn("failed to cache state", err)
      );
    }
  });
};

export default plugin;
