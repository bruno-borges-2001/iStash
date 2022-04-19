<template>
  <v-app>
    <Header :openDrawer="openDrawer" />
    <v-main id="app">
      <notifications
        ignoreDuplicates
        animation-type="velocity"
        :animation="animation"
        position="bottom center"
        group="center"
        classes="notification"
      />
      <notifications
        ignoreDuplicates
        position="bottom right"
        group="right"
        classes="notification"
      />
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
    firstLoading: true,

    drawer: null,
  }),
  computed: {
    logged() {
      return this.$store.state.logged;
    },
    stashes() {
      return firestore
        .collection("stashes")
        .where("users", "array-contains", this.$store.state.userId)
        .orderBy("date");
    },
    animation() {
      return {
        enter(element) {
          let height = element.clientHeight;
          return {
            height: [height, 0],
            opacity: [1, 0],
          };
        },
        leave: {
          height: 0,
          opacity: 0,
        },
      };
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
        stashes: parsedData.stashes.map(
          (el) =>
            new Stash(
              el.id,
              el.name,
              el.shared,
              el.usersInfo,
              el.products,
              el.rules,
              el.date
            )
        ),
      };
    },
    async load() {
      const saveData = sessionStorage.getItem("savedData");

      if (saveData) {
        const parsedData = this.parseSavedData(saveData);
        this.$store.commit("setSavedData", parsedData);
        sessionStorage.removeItem("savedData");
      }

      if (this.$store.state.logged) {
        const stashes = await this.stashes.get();

        if (stashes) {
          this.$store.commit(
            "setStashes",
            stashes.docs.map((el) => {
              const data = el.data();
              return new Stash(
                el.id,
                data.name,
                data.shared,
                data.usersInfo,
                data.products,
                data.rules,
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

.notification {
  font-size: 1rem;
  padding: 1rem;

  margin: 0.5rem;
  color: white;
  background: rgb(2, 0, 36);

  border-radius: 8px;
}
.notification > .notification-title {
  font-size: 1.2rem;
}

.notification > .notification-title {
  border-bottom: 1px solid gray;
  margin-bottom: 5px;
}

.notification.success {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(27, 180, 14, 0.9) 0%,
    rgba(12, 122, 0, 0.4) 100%
  );
}
.notification.info {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(221, 195, 31, 0.9) 0%,
    rgba(232, 229, 35, 0.4) 100%
  );
}
.notification.error {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(238, 22, 22, 0.9) 0%,
    rgba(236, 12, 12, 0.4) 100%
  );
}
</style>
