<template>
  <v-btn id="custom-button" color="primary" @click="click">
    <div class="d-flex flex-column">
      <slot></slot>
      <span class="label">{{ label }}</span>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "ModuleButton",
  props: {
    label: String,
    click: Function,
  },
};
</script>

<style scoped>
#custom-button {
  height: unset;
  padding: 1.5rem;
  font-size: 110%;
}
</style>
