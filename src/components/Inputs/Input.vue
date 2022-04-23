<template>
  <v-text-field
    class="flex-grow-0"
    v-model="modelVal"
    :placeholder="placeholder"
    :append-icon="icon"
    :type="type"
    :rules="rulesList"
    @input="onInput"
    @click:append="onIconClick"
    @keypress="onKeypress"
    @focus="error = false"
    @blur="onLostFocus"
    ref="text"
  ></v-text-field>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      error: true,
    };
  },
  computed: {
    modelVal: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    requiredRule() {
      return (value) => !this.error || !!value || this.$t("error.required");
    },
    emailRule() {
      return (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (
          !this.error || pattern.test(value) || this.$t("error.invalidemail")
        );
      };
    },

    rulesList() {
      var rules = [
        !this.required || this.requiredRule,
        !this.email || this.emailRule,
        ...this.rules,
      ];

      return rules;
    },
  },
  methods: {
    onLostFocus() {
      this.error = true;
      this.$refs.text.validate();
    },
  },
  props: {
    model: String,
    placeholder: { type: String, default: "" },
    icon: { type: String },
    type: { type: String, default: "text" },

    required: Boolean,
    email: Boolean,

    rules: { type: Array, default: () => [] },

    onInput: { type: Function, default: () => {} },
    onIconClick: { type: Function, default: () => {} },
    onKeypress: { type: Function, default: () => {} },
  },
};
</script>

<style></style>
