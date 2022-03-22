<template>
  <v-app>
    <Header :openDrawer="openDrawer" />
    <v-main id="app">
      <router-view></router-view>
    </v-main>

    <app-drawer :model="drawer" ref="drawer"></app-drawer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";

import Stash from "./models/Stash";

import firestore from "@/plugins/firebase/firestore";

export default {
  name: "App",
  components: {
    Header,
    "app-drawer": Drawer,
  },
  data: () => ({
    users: [],
    groups: [],
    products: [],
    drawer: null,
  }),
  computed: {
    logged() {
      return this.$store.state.logged;
    },
    stashes() {
      return firestore.collection("stashes");
    },
  },
  created() {
    this.load();
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.handleOpenDrawer();
    },
    async load() {
      if (this.$store.state.logged) {
        const stashes = await this.stashes
          .where("users", "array-contains", this.$store.state.userId)
          .orderBy("date")
          .get();

        if (stashes) {
          this.$store.commit(
            "setStashes",
            stashes.docs.map((el) => {
              const data = el.data();

              return new Stash(
                data.name,
                data.shared || null,
                data.usersInfo,
                data.products,
                data.rules,
                el.id,
                data.date
              );
            })
          );
        }
      }

      setTimeout(this.load, 5000);
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
