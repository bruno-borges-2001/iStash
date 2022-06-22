<template>
  <v-app>
    <Header :openDrawer="openDrawer" />
    <v-main id="app">
      <Notification group="center" />
      <router-view></router-view>
      <div
        v-if="Object.keys($store.state.diffs).length > 0"
        style="position: fixed; bottom: 0.5rem; left: 0.5rem"
      >
        <v-icon>mdi-alert-circle</v-icon>
        {{ $t("message.pendingchanges") }}
      </div>
    </v-main>

    <reload-prompt />
    <app-drawer :model="drawer" ref="drawer" v-if="logged"></app-drawer>
  </v-app>
</template>

<script>
import Vue from "vue";
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";
import Notification from "./components/Notification.vue";

import Stash from "./models/Stash";

import firestore, { updateValue } from "./plugins/firebase/firestore";
import { OWNER } from "./helpers/UserStatus";
import { diff } from "./helpers/diff";
import ReloadPrompt from "./components/ReloadPrompt.vue";
import { getState } from "./store/storage";
import createStash from "./helpers/createStash";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    "app-drawer": Drawer,
    Notification,
    ReloadPrompt,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    logged() {
      return this.$store.state.logged;
    },
    stashes() {
      return firestore.collection("stashes");
    },
    userStashes() {
      return this.stashes
        .where("users", "array-contains", this.$store.state.currentUser.uid)
        .orderBy("date");
    },
    userInvites() {
      return this.stashes.where(
        "invites",
        "array-contains",
        this.$store.state.userId
      );
    },
  },
  created() {
    this.load();
  },

  beforeDestroy() {
    const saveData = {
      stashes: this.$store.state.myStashes,
    };

    sessionStorage.setItem("savedData", JSON.stringify(saveData));
  },

  methods: {
    openDrawer() {
      this.$refs.drawer.handleOpenDrawer();
    },
    parseSavedData(data) {
      const parsedData = JSON.parse(data);
      return {
        ...parsedData,
        stashes: parsedData.stashes?.map(createStash),
        invites: parsedData.invites?.map((el) => ({
          id: el.id,
          message: el.message,
          stash: createStash(el.stash),
        })),
      };
    },
    async load() {
      if (navigator.onLine) {
        let promises = [];

        if (this.$store.state.logged && this.$store.state.updateData) {
          promises.push(new Promise(this.loadStashes));
          promises.push(new Promise(this.loadInvites));
        }

        Promise.all(promises).then(() => setTimeout(this.load, 5 * 1000));
      } else {
        getState().then((state) => {
          this.$store.commit("setSavedData", state);

          setTimeout(this.load, 5 * 1000);
        });
      }
    },
    async loadStashes(resolve) {
      const stashes = await this.userStashes.get();


      this.$store.state.myStashes
        ?.filter((el) => el.version < 0)
        .forEach((item) => {
          updateValue("stashes", item.id, item.buildTemplate());
        });

      if (stashes) {
        const parsedData = stashes.docs.map((el) => {
          const data = el.data();
          return createStash(data);
        }).filter(el => el.name);

        const diffs = parsedData.reduce((prev, el) => {
          if (this.$store.state.myStashes.length > 0) {
            let localData = this.$store.getters.getStash(el.id);

            if (localData.version < el.version) {
              const newDiff = diff(el.products, localData.products);

              const next = {
                ...prev,
                [el.id]: newDiff,
              };

              if (localData.name !== el.name) {
                (next)[el.id]["name"] = {
                  newName: el.name,
                  oldName: localData.name,
                };
              }

              if (Object.keys(next[el.id]).length === 0)
                delete next[el.id];

              return next;
            } else if (localData.version > el.version) {
              if (!("buildTemplate" in localData))
                localData = createStash(localData);

              updateValue("stashes", el.id, localData.buildTemplate());
            }
          }
          return prev;
        }, {});


        if (Object.keys(diffs).length === 0)
          this.$store.commit("setStashes", parsedData);
        else this.$store.commit("setDiffs", { diffs, data: parsedData });
      }

      resolve();
    },
    async loadInvites(resolve) {
      const stashes = await this.userInvites.get();

      if (stashes) {
        this.$store.commit(
          "setInvites",
          stashes.docs
            .filter((el) => el.data().shared)
            .map((el) => {
              const data = el.data();
              return {
                id: el.id,
                message: this.$t("message.invitemessage", {
                  user: data.usersInfo.find(
                    (el) => el.userStatus === OWNER
                  ).name,
                  stash: data.name,
                }),
                stash: createStash(data),
              };
            })
        );
      }

      resolve();
    },
  },
});
</script>

<style lang="scss">
html {
  overflow-y: auto !important;

  @media (max-width: 1080px) {
    font-size: 93.75%; // 15px
  }

  @media (max-width: 720px) {
    font-size: 87.5%; // 14px
  }
}

#app {
  padding: 0;
}

.v-application--wrap {
  overflow-x: hidden;
}

.full-height {
  height: 100% !important;
  position: relative;
}

.full-width {
  width: 100% !important;
  position: relative;
}

.button {
  width: 15rem;
}

[disabled] {
  opacity: 0.6;
}
</style>
