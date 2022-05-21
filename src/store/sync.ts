import { Store } from "vuex";
import { removeValue, updateValue } from "../plugins/firebase/firestore";
import { Mutation, State } from "../types";

const plugin = (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case "updateStash":
        updateValue(
          "stashes",
          mutation.payload["id"],
          mutation.payload["value"]
        )
          .catch()
          .finally(() => {
            state.updateData = true;
          });
        break;
      case "removeStash":
        removeValue("stashes", mutation.payload["id"])
          .catch()
          .finally(() => {
            state.updateData = true;
          });
        break;
      default:
      // Ignore default case
    }
  });
};

export default plugin;
