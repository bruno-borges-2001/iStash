<template>
  <Main>
    <div v-if="Object.entries(diffs).length === 0">
      {{ $t("message.nochanges") }}
    </div>
    <div v-else>
      <change-group-card
        v-for="[key, value] in Object.entries(diffs)"
        :key="key"
        :id="key"
        :diff="value"
        :stash="newData.find((el) => el.id === key)"
      ></change-group-card>
    </div>
  </Main>
</template>

<script lang="ts">
import Vue from "vue";
import ChangeGroupCard from "../components/Cards/ChangeGroupCard.vue";

import Main from "../layouts/Main.vue";
import Stash from "../models/Stash";

export default Vue.extend({
  components: { Main, ChangeGroupCard },
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
