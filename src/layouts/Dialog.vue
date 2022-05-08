<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :icon="iconButton" dense v-bind="attrs" v-on="on">
          <slot name="button">Click me</slot>
        </v-btn>
      </template>

      <v-card class="dialog-card pa-4 d-flex flex-column space-between">
        <slot></slot>

        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ $t("keys.cancel") }}
          </v-btn>
          <v-btn color="primary" text @click="handleSubmit">
            {{ submitMessage }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DialogLayout",
  model: {
    event: "onClose",
  },
  props: { onSubmit: Function, submitMessage: String, iconButton: Boolean },
  data: () => ({
    dialog: false,
  }),
  methods: {
    handleSubmit() {
      if (this.onSubmit()) {
        this.dialog = false;
      }
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$emit("close");
      }
    },
  },
});
</script>

<style>
.v-dialog {
  max-width: min(1000px, 80vh) !important;
}

.dialog-card {
  height: 100%;
  width: 100%;
  min-height: 80vh;
}
</style>
