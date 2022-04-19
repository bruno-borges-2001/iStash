<template>
  <Main class="pa-5 d-flex flex-column">
    <v-card id="card" class="pa-5 d-flex flex-column" elevation="5"
      ><slot
    /></v-card>
  </Main>
</template>

<script>
import Main from "./Main.vue";

export default {
  components: {
    Main,
  },
};
</script>

<style scoped>
#card {
  width: 25rem;
  position: relative;
  margin: 0 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
