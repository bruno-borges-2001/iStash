<template>
  <div
    class="d-flex flex-column flex-grow-1 justify-center align-center full-width full-height"
  >
    <div
      v-if="loaded"
      class="d-flex full-height full-width align-center flex-column"
      style="max-height: calc(100vh - 56px); overflow: hidden"
    >
      <header class="full-width d-flex align-center px-4 search-bar">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('message.searchstash')"
          v-model="searchFilter"
        ></v-text-field>
        <v-btn icon @click="handleCreateStash">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </header>
      <div
        class="full-width d-flex flex-column align-center px-4 pb-4"
        style="
          padding-top: 1rem;
          max-height: calc(100vh - 56px - 80px);
          overflow: auto;
        "
      >
        <div
          class="d-flex full-width align-center flex-column"
          v-if="stashCount > 0"
        >
          <s-button
            v-for="(el, i) in stashesList"
            :key="i"
            :stash="el"
            :onclick="() => handleStashClick(el.id)"
            class="stash-button"
          ></s-button>
        </div>
        <div class="center-text" v-else>
          {{ $t("message.nostashes") }}
        </div>
        <v-btn id="create-button" @click="handleCreateStash">
          <v-icon size="60" color="#A9A9A9">mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <LoadingIndicator v-else />
  </div>
</template>

<script>
import Vue from "vue";
import StashButton from "../components/Buttons/StashButton.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import Stash from "../models/Stash";

export default Vue.extend({
  name: "MyStashes",
  components: {
    "s-button": StashButton,
    LoadingIndicator,
  },
  data: () => ({
    searchFilter: "",
  }),
  computed: {
    stashes() {
      return this.$store.state.myStashes;
    },
    stashCount() {
      return this.stashes?.length ?? 0;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    loaded() {
      return this.$store.state.stashesLoaded;
    },
    stashesList() {
      return (
        this.stashes?.filter((el) =>
          el.name?.includes(this.searchFilter.toLowerCase())
        ) ?? []
      );
    },
  },
  methods: {
    handleStashClick(id) {
      this.$router.push("/stash/" + id);
    },
    handleCreateStash() {
      this.$router.push("/create");
    },
  },
});
</script>

<style scoped>
#create-button {
  height: 10rem;
  width: 80%;

  max-width: 1012px;

  border: 0.4rem dashed #a9a9a9;
  border-radius: 0.8rem;
  background-color: lightgray;
}

.center-text {
  text-align: center;
}

.stash-button {
  margin-bottom: 1rem;
}
</style>
