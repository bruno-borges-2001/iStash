<template>
  <TextInput
    v-model="modelVal"
    :placeholder="$t('keys.password')"
    :icon="hidePasswordButton ? '' : showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    :onInput="onInput"
    :onIconClick="togglePassword"
    :onKeypress="onKeypress"
  ></TextInput>
</template>

<script>
import TextInput from "./Input.vue";

export default {
  data: () => ({
    showPassword: false,
  }),
  computed: {
    modelVal: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
  components: {
    TextInput,
  },
  props: {
    model: String,
    rules: { type: Array, default: () => [] },

    hidePasswordButton: { type: Boolean, default: false },

    onInput: { type: Function, default: () => {} },
    onKeypress: { type: Function, default: () => {} },
  },
};
</script>

<style></style>
