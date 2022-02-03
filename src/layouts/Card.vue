<template>
  <Main>
    <v-card class="pa-5 d-flex flex-column" elevation="5"><slot /></v-card>
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
