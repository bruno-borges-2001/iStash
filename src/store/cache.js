import { setState } from "./storage";

const shouldSkipCache = (mutation) => {
  if (mutation.type === "setInvites") return true;
  return false;
};

const plugin = (store) => {
  store.subscribe((mutation, state) => {
    if (!shouldSkipCache(mutation)) {
      setState(state).catch((err) =>
        console.warn("failed to cache state", err)
      );
    }
  });
};

export default plugin;
