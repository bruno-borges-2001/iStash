<template>
  <v-card style="margin-top: 0.5rem; position: relative" :disabled="updating">
    <v-card-title>{{ product.name }}</v-card-title>

    <div class="options-menu">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="handleEdit">
            <v-list-item-title> Editar </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="handleRemove">
            <v-list-item-title>Excluir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="editDialog" class="ma-2">
        <v-card class="dialog-card pa-4 d-flex flex-column space-between">
          <new-product-dialog ref="productDialog" />

          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="handleEditSubmit">
              {{ $t("button.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <counter
      :id="product.id"
      :value="product.quantity"
      :onChange="handleCounter"
      class="counter"
      ref="productCounter"
    />

    <v-card-actions>
      <v-card-text>
        {{ product.lastUpdatedBy }} -
        {{ product.formattedLastUpdatedAt }}
      </v-card-text>
    </v-card-actions>

    <v-progress-circular
      class="updating-indicator"
      size="20"
      v-if="updating"
      indeterminate
    ></v-progress-circular>
  </v-card>
</template>

<script>
import Counter from "../Counter.vue";
import NewProductDialog from "../Dialogs/NewProductDialog.vue";
export default {
  components: { Counter, NewProductDialog },
  name: "ProductCard",
  data: () => ({
    editDialog: false,
    updating: false,
  }),
  props: {
    product: Object,
    stashRef: Object,
  },
  computed: {
    quantity() {
      return this.product.quantity;
    },
    settings() {
      return [
        { title: "Editar", onClick: () => {} },
        { title: "Excluir", onClick: this.handleRemove },
      ];
    },
  },
  methods: {
    handleCounter(quantity) {
      const newData = {
        ...this.product,
        lastUpdatedBy: this.$store.state.currentUser.name,
        lastUpdatedAt: new Date(),
        quantity,
      };
      delete newData.formattedLastUpdatedAt;

      this.updating = true;
      this.stashRef
        .updateProduct(this.product.id, newData)
        .finally(() => (this.updating = false));
    },
    handleRemove() {
      this.stashRef.removeProduct(this.product.id);
    },
    handleEdit() {
      this.editDialog = true;
      this.$nextTick(() => this.$refs.productDialog.setEditData(this.product));
    },
    handleEditSubmit() {
      const value = this.$refs.productDialog.getData();

      if (!value) return false;
      this.updating = true;

      this.stashRef
        .updateProduct(this.product.id, value)
        .finally(() => (this.updating = false));

      this.$refs.productCounter.override(value.quantity);

      this.editDialog = false;
      return true;
    },
    clearDialogData() {
      if (this.$refs.productDialog) this.$refs.productDialog.clearData();
    },
  },
  watch: {
    editDialog(value) {
      if (!value) this.clearDialogData();
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

.options-menu {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.updating-indicator {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
