<template>
  <v-card>
    {{ id }}
  </v-card>
</template>

<script>
export default {
  name: "Stash",
  props: ["id"],

  created() {
    console.log(this.id);
  },
};
</script>

<style></style>
