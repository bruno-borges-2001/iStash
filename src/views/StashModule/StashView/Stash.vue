<template>
  <v-card id="content-wrapper">
    <v-card class="content">
      <v-tabs-items class="full-height" v-model="tab" v-if="stash">
        <v-tab-item :key="tabsList[0].label" class="full-height">
          <product-view :stash="stash" class="full-height" />
        </v-tab-item>
        <v-tab-item :key="tabsList[1].label" class="full-height">
          <shopping-list :stash="stash" class="full-height" />
        </v-tab-item>
        <v-tab-item :key="tabsList[2].label" class="full-height">
          <user-view :stash="stash" class="full-height" />
        </v-tab-item>
        <v-tab-item :key="tabsList[3].label" class="full-height">
          <settings-view :stash="stash" class="full-height" />
        </v-tab-item>
      </v-tabs-items>
      <LoadingIndicator v-else />
    </v-card>
    <v-bottom-navigation v-model="tab" grow color="primary">
      <v-btn v-for="item in tabsList" :key="item.label">
        <span>{{ $tc(`keys.${item.label}`, 2) }}</span>

        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script lang="ts">
import LoadingIndicator from "../../../components/LoadingIndicator.vue";
import ProductView from "./ProductView.vue";
import UserView from "./UserView.vue";
import SettingsView from "./SettingsView.vue";
import ShoppingList from "./ShoppingList.vue";
import Vue from "vue";
import Stash from "../../../models/Stash";
import { User } from "../../../types";

export default Vue.extend({
  name: "StashView",
  props: ["id"],

  components: {
    LoadingIndicator,
    UserView,
    ProductView,
    SettingsView,
    ShoppingList,
  },

  data: () => ({
    tab: null,
  }),

  computed: {
    stash(): Stash {
      return this.$store.getters.getStash(this.id);
    },
    users(): User[] {
      return this.stash?.usersInfo;
    },
    tabsList(): { label: string; icon: string }[] {
      return [
        { label: "product", icon: "mdi-archive-outline" },
        { label: this.shoppingListLabel, icon: "mdi-basket-outline" },
        { label: "user", icon: "mdi-account-multiple" },
        { label: "setting", icon: "mdi-cog" },
      ];
    },
    shoppingListLabel(): string {
      if (this.$vuetify.breakpoint.xs) return "shoppinglistshort";
      return "shoppinglist";
    },
  },
});
</script>

<style scoped>
#content-wrapper {
  background-color: red;
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow: hidden;
}

.content {
  flex-grow: 1;

  min-height: calc(100% - 56px);
  max-height: calc(100vh - 56px - 56px);

  overflow: auto;

  position: relative;
}
</style>
