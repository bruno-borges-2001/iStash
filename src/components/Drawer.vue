<template>
  <v-navigation-drawer v-model="drawer" absolute temporary right>
    <v-list nav dense>
      <v-list-item-content class="pl-2">
        <v-list-item-title
          class="text-h6"
          style="text-transform: capitalize"
          v-if="$store.state.currentUser"
        >
          {{ $store.state.currentUser.name }}
        </v-list-item-title>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item
        link
        @click="handleNotifications"
        :disabled="route.name === 'notifications'"
        v-if="isOnline"
      >
        <v-list-item-icon>
          <v-icon> mdi-bell </v-icon>
          <div class="badge" v-if="$store.state.myInvites.length > 0"></div>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("keys.notifications") }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        @click="handleChanges"
        :disabled="$store.state.newData.length === 0"
        v-if="isOnline"
      >
        <v-list-item-icon>
          <v-icon> mdi-clipboard-search </v-icon>
          <div
            class="badge"
            v-if="Object.values($store.state.diffs).length > 0"
          ></div>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("keys.changes") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="handleSignOut">
        <v-list-item-title>{{ $t("button.logout") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-if="$store.state.logged" style="padding: 0.2rem 1rem">
        <v-list-item-title>{{ $t("keys.language") }}</v-list-item-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" plain small class="pa-1">
              {{ selectedLocale }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in locales"
              :key="index"
              @click="changeLanguage(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <!-- <v-list-item>
        <v-btn icon @click="() => changeLanguage('pt-BR')">PT-BR</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn icon @click="() => changeLanguage('en-US')">EN-US</v-btn>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { changeLocale, getLocale } from "../plugins/vueI18n";
import auth from "../plugins/firebase/auth";
import Vue from "vue";

export default Vue.extend({
  name: "AppDrawer",
  data: () => ({
    drawer: false,
    locales: ["pt-BR", "en-US"],
    selectedLocale: getLocale(),
  }),
  props: {
    click: Function,
  },
  computed: {
    now() {
      return new Date();
    },
    route() {
      return this.$route;
    },
    isOnline() {
      return navigator.onLine;
    },
  },
  methods: {
    handleSignOut() {
      auth.signOut().then(() => {
        this.drawer = false;
        location.reload();
      });
    },
    handleNotifications() {
      this.$router.push({ name: "notifications" });
    },
    handleChanges() {
      this.$router.push({ name: "changes" });
    },
    handleOpenDrawer() {
      this.drawer = true;
    },
    changeLanguage(locale: string) {
      this.selectedLocale = locale;
      changeLocale(locale as "pt-BR" | "en-US");
    },
  },
});
</script>

<style scoped>
.badge {
  content: "";
  height: 0px;
  width: 0px;
  border: solid 5px red;
  border-radius: 100%;
  transform: translateX(-10px);
}
</style>
