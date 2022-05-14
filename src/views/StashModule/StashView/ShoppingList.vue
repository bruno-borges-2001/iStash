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
      <v-btn
        icon
        v-if="ignoreProductList.length > 0"
        @click="ignoreProductList = []"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn icon v-if="shoppingList.length > 0" @click="createPDF">
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </header>
    <div
      style="max-height: 75vh; max-width: 1000px"
      class="full-height full-width"
    >
      <div
        style="max-height: 75vh; overflow: auto"
        class="full-height"
        v-if="shoppingList.length > 0"
      >
        <v-data-table :headers="headers" :items="shoppingList">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="ignoreProductList.push(item.id)">
              mdi-close
            </v-icon>
          </template>
        </v-data-table>
      </div>
      <div class="full-height d-flex justify-center align-center" v-else>
        <loading-indicator v-if="!stash"> </loading-indicator>
        <div v-else>
          {{
            searchFilter.length > 0
              ? $t("message.nosearchproduct")
              : $t("message.noshoppingproducts")
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Dialog from "../../../layouts/Dialog.vue";
import NewProductDialog from "../../../components/Dialogs/NewProductDialog.vue";
import LoadingIndicator from "../../../components/LoadingIndicator.vue";

import ProductCard from "../../../components/Cards/ProductCard.vue";

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
    ignoreProductList: [],
  }),
  computed: {
    shoppingList() {
      return this.stash?.products.filter(
        (el) =>
          !isNaN(el.rule) &&
          el.quantity <= el.rule &&
          el.name.includes(this.searchFilter.toLowerCase()) &&
          !this.ignoreProductList.includes(el.id)
      );
    },
    headers() {
      return [
        { text: this.$tc("keys.product", 1), value: "name" },
        { text: this.$t("keys.quantity"), value: "quantity" },
        { text: this.$t("keys.expected"), value: "rule" },
        { text: this.$t("keys.unit"), value: "unit" },
        { text: "", value: "actions", sortable: false },
      ];
    },
  },
  methods: {
    createPDF() {
      const pdfName = this.$t("keys.shoppinglist");
      const head = [this.headers.map((el) => el.text)];
      const body = this.shoppingList.map((el) => [
        el.name,
        el.quantity,
        el.rule,
        el.unit,
      ]);
      var doc = new jsPDF();
      autoTable(doc, {
        head,
        body,
        startY: 10,
        styles: { fontSize: 14, cellPadding: 4 },
      });
      doc.save(pdfName + ".pdf");
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;
  position: relative;
  .v-data-table__wrapper {
    height: calc(100% - 70px);
  }
}
</style>
