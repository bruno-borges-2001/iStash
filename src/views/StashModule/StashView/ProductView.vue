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

<script>
import Dialog from "../../../layouts/Dialog.vue";
import NewProductDialog from "@/components/Dialogs/NewProductDialog.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

import { formatDate } from "@/helpers/formatter";
import ProductCard from "@/components/Cards/ProductCard.vue";

export default {
  name: "ProductView",
  components: {
    "v-dialog": Dialog,
    NewProductDialog,
    LoadingIndicator,
    ProductCard,
  },
  props: {
    stash: Object,
  },
  data: () => ({
    searchFilter: "",
  }),
  computed: {
    productsList() {
      return this.stash?.products
        .filter((el) => el.name.includes(this.searchFilter.toLowerCase()))
        .map((el) => {
          return {
            ...el,
            formattedLastUpdatedAt: this.formatDate(el.lastUpdatedAt),
          };
        });
    },
  },
  methods: {
    clearDialogData() {
      if (this.$refs.userDialog) this.$refs.userDialog.clearData();
    },
    handleNewProduct() {
      const value = this.$refs.productDialog.getData();

      if (!value) return false;

      this.stash?.addProduct(value);

      return true;
    },
    formatDate(lastUpdatedAt) {
      let date;
      if ("seconds" in lastUpdatedAt)
        date = new Date(lastUpdatedAt.seconds * 1000);
      else date = new Date(lastUpdatedAt);

      const diffTime = Math.abs(new Date() - date);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      if (diffMinutes < 60)
        return this.$t("message.ago", { time: diffMinutes + "min" });

      const diffHours = Math.ceil(diffMinutes / 60);
      if (diffHours < 24)
        return this.$t("message.ago", { time: diffHours + "h" });

      const diffDays = Math.ceil(diffHours / 24);
      if (diffDays < 7) return this.$t("message.ago", { time: diffDays + "d" });

      return formatDate(date);
    },
  },
};
</script>

<style></style>
