<template>
  <v-card style="margin-top: 0.5rem">
    <v-card-title>{{ product.name }}</v-card-title>

    <counter
      :id="product.id"
      :value="product.quantity"
      :onChange="handleCounter"
      class="counter"
    />

    <v-card-actions>
      <v-card-text>
        {{ product.lastUpdatedBy }} -
        {{ product.formattedLastUpdatedAt }}
      </v-card-text>
      <v-btn icon><v-icon>mdi-trash-can</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Counter from "../Counter.vue";
export default {
  components: { Counter },
  name: "ProductCard",
  props: {
    product: Object,
    stashRef: Object,
  },
  computed: {
    quantity() {
      return this.product.quantity;
    },
  },
  methods: {
    handleCounter(quantity) {
      this.stashRef.updateProduct(this.product.id, {
        ...this.product,
        quantity,
      });
    },
  },
};
</script>

<style>
.counter {
  position: absolute;
  top: 50%;
  right: 5rem;
  transform: translateY(-50%);
}
</style>
