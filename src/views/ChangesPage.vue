<template>
  <Main>
    <div v-if="newData.length === 0">{{ $t("message.nochanges") }}</div>
    <div v-else>WIP</div>
  </Main>
</template>

<script lang="ts">
import Vue from "vue";

import Main from "../layouts/Main.vue";

export default Vue.extend({
  components: { Main },
  data: () => ({}),
  computed: {
    diffs() {
      return this.$store.state.diffs;
    },
    newData() {
      return this.$store.state.newData;
    },
  },
  methods: {},
});
</script>

<style></style>
