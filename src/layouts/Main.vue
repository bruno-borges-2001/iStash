<template>
  <v-container
    class="d-flex flex-column flex-grow-1 justify-center align-center full-height"
  >
    <slot />
  </v-container>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>
