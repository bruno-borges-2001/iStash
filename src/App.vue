<template>
  <v-app>
    <Header :openDrawer="openDrawer" />
    <v-main id="app">
      <Notification group="center" />
      <router-view></router-view>
    </v-main>

    <app-drawer :model="drawer" ref="drawer" v-if="logged"></app-drawer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";
import Notification from "./components/Notification.vue";

import Stash from "./models/Stash";

import firestore from "@/plugins/firebase/firestore";
import { OWNER } from "@/helpers/UserStatus";

export default {
  name: "App",
  components: {
    Header,
    "app-drawer": Drawer,
    Notification,
  },
  data: () => ({
    firstLoading: true,

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
        .where("users", "array-contains", this.$store.state.userId)
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
        stashes: parsedData.stashes?.map(
          (el) =>
            new Stash(
              el.id,
              el.name,
              el.shared,
              el.users,
              el.invites,
              el.usersInfo,
              el.products,
              el.date
            )
        ),
        invites: parsedData.invites?.map((el) => ({
          id: el.id,
          message: el.message,
          stash: new Stash(
            el.stash.id,
            el.stash.name,
            el.stash.shared,
            el.stash.users,
            el.stash.invites,
            el.stash.usersInfo,
            el.stash.products,
            el.stash.date
          ),
        })),
      };
    },
    async load() {
      const saveData = sessionStorage.getItem("savedData");

      if (saveData) {
        const parsedData = this.parseSavedData(saveData);
        this.$store.commit("setSavedData", parsedData);
        sessionStorage.removeItem("savedData");
      }

      let promises = [];

      if (this.$store.state.logged) {
        promises.push(new Promise(this.loadStashes));
        promises.push(new Promise(this.loadInvites));
      }

      Promise.all(promises).then(() => setTimeout(this.load, 5 * 1000));
    },

    async loadStashes(resolve) {
      const stashes = await this.userStashes.get();

      if (stashes) {
        this.$store.commit(
          "setStashes",
          stashes.docs.map((el) => {
            const data = el.data();
            return new Stash(
              el.id,
              data.name,
              data.shared,
              data.users,
              data.invites,
              data.usersInfo,
              data.products,
              data.date
            );
          })
        );
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
                  user: data.usersInfo.find((el) => el.userStatus === OWNER)
                    .name,
                  stash: data.name,
                }),
                stash: new Stash(
                  el.id,
                  data.name,
                  data.shared,
                  data.users,
                  data.invites,
                  data.usersInfo,
                  data.products,
                  data.date
                ),
              };
            })
        );
      }

      resolve();
    },
  },
};
</script>

<style>
html {
  overflow-y: auto;
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
</style>
