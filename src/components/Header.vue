<template>
  <v-app-bar app color="primary" id="app-bar" dark>
    <v-btn :class="!route.meta.backRoute && 'hidden'" icon @click="handleHome">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-title class="text-bold">iStash</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon
      :class="!logged && 'hidden'"
      @click.stop="openDrawer"
    ></v-app-bar-nav-icon>
    <!-- <div v-if="!logged">
      <v-btn icon @click="() => $changeLocale('pt-BR')">PT-BR</v-btn>
      <v-btn icon @click="() => $changeLocale('en-US')">EN-US</v-btn>
    </div> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  computed: {
    route() {
      return this.$route;
    },
    logged() {
      return this.$store.state.logged;
    },
  },
  props: {
    openDrawer: { type: Function, required: true },
  },
  methods: {
    handleHome() {
      let route;
      if ((route = this.route.meta.backRoute)) this.$router.replace(route);
    },
  },
};
</script>

<style scoped>
#app-bar {
  width: 100vw;
}
/* #header {
  padding: 1.5rem;
  text-align: center;
  background: #303F9F;
  color: white;
  font-size: 20px;
  height: 75px;
}
span {
  cursor: pointer;
  font-size: 2.5rem;
  font-weight: bold;
} */
.hidden {
  visibility: hidden;
}
</style>
