<template>
  <div
    class="d-flex flex-column align-center flex-grow-1 full-width full-height pa-4"
  >
    <header class="full-width d-flex align-center">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        :placeholder="$t('message.searchuser')"
        v-model="searchFilter"
      ></v-text-field>
      <v-dialog
        :submitMessage="$t('button.save')"
        :onSubmit="handleNewProduct"
        @close="clearDialogData"
        class="ma-2"
        iconButton
      >
        <template v-slot:button>
          <v-icon> mdi-plus </v-icon>
        </template>
        <template v-slot:default>
          <NewProductDialog ref="productDialog" />
        </template>
      </v-dialog>
    </header>
    <div
      style="max-height: 75vh; max-width: 1000px"
      class="full-height full-width"
    >
      <div
        style="max-height: 75vh; overflow: auto"
        class="full-height"
        v-if="productsList.length > 0"
      >
        <product-card
          v-for="(item, index) in productsList"
          :key="index"
          :product="item"
          :stashRef="stash"
        />
      </div>
      <div class="full-height d-flex justify-center align-center" v-else>
        <loading-indicator v-if="!stash"> </loading-indicator>
        <div v-else>
          {{
            searchFilter.length > 0
              ? $t("message.nosearchproduct")
              : $t("message.noproducts")
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Dialog from "../../../layouts/Dialog.vue";
import NewProductDialog from "../../../components/Dialogs/NewProductDialog.vue";
import LoadingIndicator from "../../../components/LoadingIndicator.vue";

import ProductCard from "../../../components/Cards/ProductCard.vue";
import Vue from "vue";
import { Product } from "../../../types";
import Stash from "../../../models/Stash";

export default Vue.extend({
  name: "ProductView",
  components: {
    "v-dialog": Dialog,
    NewProductDialog,
    LoadingIndicator,
    ProductCard,
  },
  props: {
    stash: Object as () => Stash,
  },
  data: () => ({
    searchFilter: "",
  }),
  computed: {
    productsList(): Product[] {
      return this.stash?.products.filter((el) =>
        el.name.includes(this.searchFilter.toLowerCase())
      );
    },
  },
  methods: {
    clearDialogData() {
      if (this.$refs.productDialog)
        (this.$refs.productDialog as any).clearData();
    },
    handleOpenDialog() {
      this.$store.commit("disableUpdateData");
    },
    handleNewProduct() {
      const value = (this.$refs.productDialog as any).getData();

      if (!value) return false;

      this.stash?.addProduct(value);

      this.$store.commit("enableUpdateData");

      return true;
    },
  },
});
</script>

<style></style>
