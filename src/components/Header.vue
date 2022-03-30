<template>
  <v-app-bar app color="primary" id="app-bar" dark>
    <v-btn :class="!route.meta.backRoute && 'hidden'" icon @click="handleHome">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-title class="text-bold">iStash</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon
      v-if="logged"
      :class="!logged && 'hidden'"
      @click.stop="openDrawer"
    ></v-app-bar-nav-icon>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" plain small class="pa-1">
          {{ selectedLocale }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in locales"
          :key="index"
          @click="selectedLocale = item"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { getLocale, changeLocale } from "../plugins/vueI18n";

export default {
  name: "Header",
  data: () => ({
    locales: ["pt-BR", "en-US"],
    selectedLocale: getLocale(),
  }),
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
  watch: {
    selectedLocale(newValue, oldValue) {
      if (newValue !== oldValue) changeLocale(newValue);
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

.v-input__control > div {
  background-color: transparent !important;
}
</style>
