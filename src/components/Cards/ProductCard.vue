<template>
  <v-card
    class="product-card"
    style="margin-top: 0.5rem; position: relative"
    :disabled="updating"
  >
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle class="rule-wrapper">
      <div class="rule-container">
        <v-icon>mdi-archive</v-icon>
        <span>{{ quantity }} {{ unit }}</span>
      </div>
    </v-card-subtitle>
    <v-card-subtitle class="rule-wrapper">
      <div class="rule-container" v-if="rule !== null">
        <v-icon>mdi-basket</v-icon>
        <span>{{ rule }} {{ unit }}</span>
      </div>
    </v-card-subtitle>

    <div class="button-container">
      <v-btn @click="handleOpenDialog('registerin')">{{ 
        $t('button.registerinshort') 
      }}</v-btn>
      <v-btn @click="handleOpenDialog('registerout')">{{ 
        $t('button.registeroutshort')
      }}</v-btn>
      <v-dialog v-model="registerDialog">
        <v-card class="px-4">
          <v-card-title v-if="registerDialogTitle">{{ $t(`button.${registerDialogTitle}`) }}</v-card-title>
            <v-text-field
              v-model="registerDialogAmount"
              :placeholder="$t('keys.quantity')"
              type="number"
              required
            ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="registerDialog = false">{{ $t('keys.cancel') }}</v-btn>
            <v-btn text @click="handleRegister">{{ $t('button.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="options-menu">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="handleEdit">
            <v-list-item-title> {{ $t('button.edit') }} </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="handleRemove">
            <v-list-item-title>{{ $t('button.delete') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="editDialog" class="ma-2">
        <v-card class="dialog-card pa-4 d-flex flex-column space-between">
          <new-product-dialog ref="productDialog" />

          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="editDialog = false">
              {{ $t('keys.cancel') }}
            </v-btn>
            <v-btn color="primary" text @click="handleEditSubmit">
              {{ $t('button.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- <counter
      :id="product.id"
      :value="quantity"
      :onChange="handleCounter"
      v-if="unit === 'Un'"
      class="counter"
      ref="productCounter"
    /> -->

    <v-card-actions style="padding: 0">
      <v-spacer></v-spacer>

      <span style="padding: 1rem">
        {{ product.lastUpdatedBy }} -
        {{ formattedLastUpdatedAt }}
      </span>
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
import { formatDate } from '../../helpers/formatter';
import NewProductDialog from '../Dialogs/NewProductDialog.vue';
export default {
  components: { NewProductDialog },
  name: 'ProductCard',
  data: () => ({
    registerDialog: false,
    registerDialogTitle: '',
    registerDialogAmount: 0,
    editDialog: false,
    updating: false,
    overrideData: {},
  }),
  props: {
    product: Object,
    stashRef: Object,
  },
  computed: {
    name() {
      if ('name' in this.overrideData) return this.overrideData.name;

      return this.product.name;
    },
    quantity() {
      if ('quantity' in this.overrideData) return this.overrideData.quantity;

      return this.product.quantity;
    },
    unit() {
      if ('unit' in this.overrideData) return this.overrideData.unit;

      return this.product.unit;
    },
    rule() {
      if ('rule' in this.overrideData) return this.overrideData.rule;

      return this.product.rule;
    },
    formattedLastUpdatedAt() {
      if ('date' in this.overrideData) return this.overrideData.date;

      let date;
      if ('seconds' in this.product.lastUpdatedAt)
        date = new Date(this.product.lastUpdatedAt.seconds * 1000);
      else date = new Date(this.product.lastUpdatedAt);

      const diffTime = Math.abs(new Date() - date);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      if (diffMinutes < 2) return this.$t('message.now');

      if (diffMinutes < 60)
        return this.$t('message.ago', { time: diffMinutes + 'min' });

      const diffHours = Math.ceil(diffMinutes / 60);
      if (diffHours < 24)
        return this.$t('message.ago', { time: diffHours + 'h' });

      const diffDays = Math.ceil(diffHours / 24);
      if (diffDays < 7) return this.$t('message.ago', { time: diffDays + 'd' });

      return formatDate(date);
    },
  },
  methods: {
    handleOpenDialog(title) {
      this.registerDialogTitle = title;
      this.registerDialog = true;
    },
    handleRegister() {
      if (this.registerDialogTitle === '') return;
      const newData = {
        ...this.product,
        lastUpdatedBy: this.$store.state.currentUser.name,
        lastUpdatedAt: new Date(),
      };
      delete newData.formattedLastUpdatedAt;

      if (this.registerDialogTitle === 'registerin') {
        newData.quantity += Number(this.registerDialogAmount);
      } else {
        newData.quantity = Math.max(0, newData.quantity - Number(this.registerDialogAmount));
      }

      this.updating = true;
      this.stashRef.updateProduct(this.product.id, newData);
      this.registerDialog = false;
      this.registerDialogTitle = '';
    },
    // handleCounter(quantity) {
    //   const newData = {
    //     ...this.product,
    //     lastUpdatedBy: this.$store.state.currentUser.name,
    //     lastUpdatedAt: new Date(),
    //     quantity,
    //   };
    //   delete newData.formattedLastUpdatedAt;

    //   this.updating = true;
    //   this.stashRef.updateProduct(this.product.id, newData);
    // },
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
      this.overrideData = {
        ...this.overrideData,
        ...value,
        lastUpdatedAt: new Date(),
      };

      this.stashRef.updateProduct(this.product.id, value);

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
    updating(value) {
      if (value) {
        this.overrideData['date'] = this.$t('message.now');
      }
    },
    product() {
      this.overrideData = {};
    },
    overrideData(value) {
      if (Object.keys(value).length >= 1) this.updating = true;
      else this.updating = false;
    },
  },
};
</script>

<style lang="scss">
.counter {
  position: absolute;
  top: 50%;
  right: 20%;
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

.rule-wrapper {
  padding-bottom: 0 !important;
  height: 2rem;
  display: flex;
  align-items: center;

  .rule-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.product-card:last-child {
  margin-bottom: 1rem;
}

.button-container {
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: .75rem;
  height: 100%;

  button {
    width: 100%;
  }

}
</style>
