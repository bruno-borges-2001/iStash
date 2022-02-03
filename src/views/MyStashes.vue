<template>
  <div
    class="
        d-flex
        flex-column 
        flex-grow-1
        justify-center
        align-center
        full-width
        full-height"
  >
    <div
      class="d-flex full-width align-center flex-column"
      v-if="stashCount > 0"
    >
      <s-button v-for="(el, i) in stashes" :key="i" :stash="el"></s-button>
    </div>
    <div v-else>
      It appears that you don't have any stashes, why don't you create one?
    </div>
    <v-btn class="mt-4" id="create-button" @click="handleCreateStash">
      <v-icon size="60" color="#A9A9A9">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import StashButton from "../components/StashButton.vue";

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
  },
  methods: {
    handleCreateStash() {},
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
</style>
