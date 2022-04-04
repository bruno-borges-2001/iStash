<template>
  <v-card>
    <v-card>
      <h1 v-for="item in stash.usersInfo" :key="item.id">{{ item.name }}</h1>
    </v-card>
    <v-card>
      <h1 v-for="item in stash.products" :key="item.id">{{ item.name }}</h1>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "Stash",
  props: ["id"],

  data: () => ({}),

  computed: {
    stash() {
      return this.$store.state.myStashes.find((el) => el.id === this.id);
    },
  },
};
</script>

<style></style>
