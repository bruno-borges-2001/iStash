<template>
  <v-btn class="stash-button">
    <div>{{ stash.name }}</div>
  </v-btn>
</template>

<script>
export default {
  name: "StashButton",
  props: {
    stash: Object,
  },
};
</script>

<style scoped>
.stash-button {
  height: 10rem !important;
  width: 60% !important;

  border-radius: 0.8rem;
  background-color: lightgray;
}
</style>
