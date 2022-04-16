<template>
  <v-card id="content-wrapper">
    <v-card class="content">
      <v-tabs-items v-model="tab" v-if="stash">
        <v-tab-item :key="tabsList[0].label">
          <v-card>
            <h1 v-for="item in stash.products" :key="item.id">
              {{ item.name }}
            </h1>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="tabsList[1].label">
          <v-card>
            <h1 v-for="item in stash.usersInfo" :key="item.id">
              {{ item.name }}
            </h1>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="tabsList[2].label">
          <v-card>
            <h1 v-for="item in stash.products" :key="item.id">
              {{ item.name }}
            </h1>
          </v-card>
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

<script>
import LoadingIndicator from "../components/LoadingIndicator.vue";

export default {
  name: "Stash",
  props: ["id"],

  components: {
    LoadingIndicator,
  },

  data: () => ({
    tab: null,

    tabsList: [
      { label: "product", icon: "mdi-basket-outline" },
      { label: "user", icon: "mdi-account-multiple" },
      { label: "setting", icon: "mdi-cog" },
    ],
  }),

  computed: {
    stash() {
      return this.$store.state.myStashes?.find((el) => el.id === this.id);
    },
  },
};
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
