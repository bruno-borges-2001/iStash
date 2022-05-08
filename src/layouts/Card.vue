<template>
  <Main class="pa-5 d-flex flex-column">
    <v-card id="card" class="pa-5 d-flex flex-column" elevation="5"
      ><slot
    /></v-card>
  </Main>
</template>

<script lang="ts">
import Vue from "vue";
import Main from "./Main.vue";

export default Vue.extend({
  components: {
    Main,
  },
});
</script>

<style scoped>
#card {
  max-width: 25rem;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
