<template>
  <div id="loading-container">
    <v-progress-circular
      :size="size"
      :indeterminate="active"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    size: { type: Number, default: 80 },
    active: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
#loading-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
