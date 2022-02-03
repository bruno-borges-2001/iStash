<template>
  <v-card>
    {{ stash }}
  </v-card>
</template>

<script>
export default {
  name: "Stash",
  props: {
    stash: Object,
  },
};
</script>

<style></style>
