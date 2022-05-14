<template>
  <div class="d-flex align-center justify-center">
    <v-btn icon @click="handleDecrement"><v-icon>mdi-minus</v-icon></v-btn>

    <div class="counter-input">{{ showValue }}</div>

    <v-btn icon @click="handleIncrement"><v-icon>mdi-plus</v-icon></v-btn>
  </div>
</template>

<script>
import { debounce } from "../helpers/timingFunctions";
export default {
  name: "CounterComponent",
  data: () => ({
    buffer: 0,
    overrideValue: null,
  }),
  props: {
    id: String,
    value: Number,
    onChange: Function,
  },
  computed: {
    showValue() {
      return this.overrideValue !== null
        ? this.overrideValue + this.buffer
        : this.value + this.buffer;
    },
  },
  methods: {
    handleIncrement() {
      if (this.showValue === 999) return;

      this.$store.commit("disableUpdateData");

      this.buffer += 1;

      debounce(
        () => {
          this.onChange(this.showValue);
          this.$store.commit("enableUpdateData");
        },
        500,
        `COUNTER-${this.id}`
      );
    },
    handleDecrement() {
      if (this.showValue === 0) return;

      this.$store.commit("disableUpdateData");

      this.buffer -= 1;

      debounce(
        () => {
          this.onChange(this.showValue);
          this.$store.commit("enableUpdateData");
        },
        500,
        `COUNTER-${this.id}`
      );
    },
    override(value) {
      this.overrideValue = value;
    },
  },
  watch: {
    value() {
      if (this.overrideValue !== null && this.buffer !== 0) {
        this.onChange(this.showValue);
      }
      this.buffer = 0;
      this.overrideValue = null;
    },
  },
};
</script>

<style>
.counter-input {
  flex-shrink: 1;
  display: inline-block;
  max-width: 3rem;
  padding: 0.25rem;
  text-align: center;
  width: 5rem;
  border: 1px solid #777;
  border-radius: 0.25rem;
}
</style>
