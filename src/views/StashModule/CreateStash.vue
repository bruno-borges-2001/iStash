<template>
  <v-container>
    <v-form ref="form">
      <v-card class="section px-4 py-2" v-if="!isMobile || tab == 0">
        <v-card-title>Stash</v-card-title>
        <v-text-field
          v-model="name"
          counter
          :label="$t('keys.name')"
          :rules="[
            (value) => value.length <= 25 || $t('error.lengtherror'),
            (value) => !showError || validateTab || $t('error.required'),
          ]"
        ></v-text-field>
        <v-switch
          v-model="shared"
          :label="$t('message.sharedstash')"
        ></v-switch>
      </v-card>
      <v-card
        class="section px-4 py-2"
        v-if="shared && (!isMobile || tab == 1)"
      >
        <v-card-title>{{ $t("message.inviteusers") }}</v-card-title>

        <v-card v-for="item in users" :key="item.uid" class="card-button">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.email }}</v-card-subtitle>
          <v-btn
            style="position: absolute; right: 10px; top: 10px"
            icon
            @click="users = users.filter((el) => el.uid !== item.uid)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>

        <v-dialog
          :submitMessage="$t('button.save')"
          :onSubmit="handleAddUser"
          @close="clearDialogData"
          class="ma-2"
        >
          <template v-slot:button>
            <v-icon left> mdi-plus </v-icon>
            {{ $t("message.adduser") }}
          </template>
          <template v-slot:default>
            <InviteUserDialog :usersList="users" ref="userDialog" />
          </template>
        </v-dialog>
      </v-card>
      <v-card class="section px-4 py-2" v-if="!isMobile || tab == 2">
        <v-card-title>{{ $tc("keys.product", 2) }}</v-card-title>
        <v-card
          v-for="(item, index) in products"
          :key="index"
          class="card-button"
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <v-icon>mdi-archive</v-icon>
            <span class="pl-2">{{ `${item.quantity} ${item.unit}` }}</span>
          </v-card-text>
          <v-card-text v-if="item.rule !== null">
            <v-icon>mdi-basket</v-icon>
            <span class="pl-2">{{ `${item.rule} ${item.unit}` }}</span>
          </v-card-text>
          <v-btn
            style="position: absolute; right: 10px; top: 10px"
            icon
            @click="products = products.filter((_, i) => i !== index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
        <v-dialog
          :submitMessage="$t('button.save')"
          :onSubmit="handleNewProduct"
          @close="clearDialogData"
          class="ma-2"
        >
          <template v-slot:button>
            <v-icon left> mdi-plus </v-icon>
            {{ $t("message.addproduct") }}
          </template>
          <template v-slot:default>
            <NewProductDialog ref="productDialog" />
          </template>
        </v-dialog>
      </v-card>
    </v-form>

    <v-btn
      class="fab secondary"
      small
      elevation="2"
      fab
      color="secondary"
      @click="handleBackButton"
      v-if="showBackButton"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn
      class="fab"
      elevation="2"
      fab
      color="primary"
      @click="handleNextButton"
    >
      <v-icon>{{
        showSaveButton ? "mdi-archive-arrow-down" : "mdi-chevron-right"
      }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Dialog from "../../layouts/Dialog.vue";
import InviteUserDialog from "../../components/Dialogs/InviteUserDialog.vue";
import NewProductDialog from "../../components/Dialogs/NewProductDialog.vue";

import Stash from "../../models/Stash";
import Vue from "vue";
import { Product, User } from "../../types";

export default Vue.extend({
  name: "CreateStash",
  components: {
    "v-dialog": Dialog,
    InviteUserDialog,
    NewProductDialog,
  },
  data: () => ({
    tab: 0,

    width: window.innerWidth,

    name: "",
    shared: false,

    users: [] as User[],
    products: [] as Product[],

    showError: false,
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    isMobile(): boolean {
      return this.width <= 760;
    },
    showBackButton(): boolean {
      return this.isMobile && this.tab > 0;
    },
    showSaveButton(): boolean {
      return !this.isMobile || this.tab === 2;
    },
    currentUser(): any {
      return this.$store.state.currentUser;
    },
    validateTab() {
      switch (this.tab) {
        case 0:
          if (this.name.length === 0) {
            this.$notify({
              group: "center",
              title: this.$t("keys.error") as string,
              text: this.$t("message.fillrequiredfields") as string,
              type: "error",
            });
            return false;
          }

          if (this.name.length > 25) {
            this.$notify({
              group: "center",
              title: this.$t("keys.error") as string,
              text: this.$t("error.lengtherror") as string,
              type: "error",
            });
            return false;
          }
        case 1:
        case 2:
        default:
          return true;
      }
    },
  },
  methods: {
    handleBackButton() {
      if (this.tab > 0) {
        this.tab -= 1;

        if (!this.shared && this.tab == 1) {
          this.tab -= 1;
        }
      }
    },
    handleNextButton() {
      if (!this.validateTab) {
        this.showError = true;
        (this.$refs.form as any).validate();
        return;
      }

      this.showError = false;

      if (!this.showSaveButton) {
        this.tab += 1;

        if (!this.shared && this.tab == 1) {
          this.tab += 1;
        }
      } else {
        this.saveData();
      }
    },

    onResize() {
      this.width = window.innerWidth;
    },
    handleAddUser() {
      const value = (this.$refs.userDialog as any).getData;

      if (!value) return false;

      this.users = [...this.users, value];

      return true;
    },

    handleNewProduct() {
      const value = (this.$refs.productDialog as any).getData();

      if (!value) return false;

      this.products = [...this.products, value];

      return true;
    },

    saveData() {
      const { uid, name } = this.currentUser;
      const { name: stashName, shared, users, products } = this;

      const newStash = new Stash();
      newStash.setValues(
        stashName,
        shared,
        [{ uid, name, userStatus: -1 }, ...users],
        products
      );

      this.$store.dispatch("addNewStash", newStash);
    },

    clearDialogData() {
      if (this.$refs.userDialog) (this.$refs.userDialog as any).clearData();
      if (this.$refs.productDialog)
        (this.$refs.productDialog as any).clearData();
    },
  },
  watch: {
    name() {
      this.showError = false;
    },
  },
});
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.secondary {
  right: unset;
  left: 20px;
}

.section:not(:last-child) {
  margin-bottom: 1rem;
}

.card-button:not(:last-child) {
  margin-bottom: 1rem;
}

.v-card__text + .v-card__text {
  padding-top: 0;
}
</style>
