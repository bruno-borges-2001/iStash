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
      >
        <v-list-item-icon>
          <v-icon> mdi-bell </v-icon>
          <div id="badge" v-if="$store.state.myInvites.length > 0"></div>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("keys.notifications") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="handleSignOut">
        <v-list-item-title>{{ $t("button.logout") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list-item>
        <v-btn icon @click="() => changeLanguage('pt-BR')">PT-BR</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn icon @click="() => changeLanguage('en-US')">EN-US</v-btn>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { changeLocale } from "@/plugins/vueI18n";
import auth from "@/plugins/firebase/auth";

export default {
  name: "AppDrawer",
  data: () => ({
    drawer: false,
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
    handleOpenDrawer() {
      this.drawer = true;
    },
    changeLanguage(locale) {
      changeLocale(locale);
    },
  },
};
</script>

<style scoped>
#badge {
  content: "";
  height: 0px;
  width: 0px;
  border: solid 5px red;
  border-radius: 100%;
  transform: translateX(-10px);
}
</style>
