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
      <v-layout v-resize="onResize" column v-if="shoppingList.length > 0">
        <div style="max-height: 75vh; overflow: auto" class="full-height">
          <v-data-table
            :headers="headers"
            :items="shoppingList"
            :hide-default-headers="isMobile"
            :hide-default-footer="isMobile"
            :disable-pagination="isMobile"
            :footer-props="footerProps"
            :class="{ mobile: isMobile }"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                class="text-xs-right"
                small
                @click="ignoreProductList.push(item.id)"
              >
                mdi-close
              </v-icon>
            </template>
            <template v-slot:[`footer.page-text`]="items">
              {{ items.pageStart }} - {{ items.pageStop }} {{ $t("keys.of") }}
              {{ items.itemsLength }}
            </template>
          </v-data-table>
        </div>
      </v-layout>
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
    isMobile: false,
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
    footerProps() {
      return {
        itemsPerPageText: this.$t("message.itemsperpage"),
      };
    },
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
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
.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}
</style>
