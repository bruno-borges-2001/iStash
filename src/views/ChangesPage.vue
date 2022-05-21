<template>
  <Main>
    <div v-if="newData.length === 0">{{ $t("message.nochanges") }}</div>
    <div v-else>WIP</div>
  </Main>
</template>

<script lang="ts">
import Vue from "vue";

import Main from "../layouts/Main.vue";
import Stash from "../models/Stash";

export default Vue.extend({
  components: { Main },
  data: () => ({}),
  computed: {
    diffs(): any {
      return this.$store.state.diffs;
    },
    newData(): Stash[] {
      return this.$store.state.newData;
    },
  },
  methods: {},
});
</script>

<style></style>
