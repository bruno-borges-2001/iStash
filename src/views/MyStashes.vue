<template>
  <div
    class="d-flex flex-column flex-grow-1 justify-center align-center full-width full-height"
  >
    <div
      class="d-flex full-width align-center flex-column"
      v-if="stashCount > 0"
    >
      <s-button
        v-for="(el, i) in stashes"
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
</template>

<script>
import StashButton from "../components/StashButton.vue";

// import Stash from "../models/Stash";

export default {
  name: "MyStashes",
  data: () => ({
    new_stash_name: "",
    creating: false,
  }),
  components: {
    "s-button": StashButton,
  },
  computed: {
    stashes() {
      return this.$store.state.myStashes;
    },
    stashCount() {
      return this.stashes.length;
    },
    currentUser() {
      return this.$store.state.currentUser;
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
};
</script>

<style scoped>
#create-button {
  height: 10rem;
  width: 60%;

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
