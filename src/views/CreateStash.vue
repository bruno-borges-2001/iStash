<template>
  <v-container>
    <v-form ref="form">
      <v-card class="section px-4 py-2" v-if="!isMobile || tab == 0">
        <v-card-title>Stash</v-card-title>
        <v-text-field
          v-model="name"
          :label="$t('keys.name')"
          :rules="[(value) => !showError || validateTab || 'Campo Obrigatório']"
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

        <v-card v-for="item in users" :key="item.uid" class="user-button">
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
        <v-dialog>
          <template v-slot:button>
            <v-icon left> mdi-plus </v-icon>
            {{ $t("message.addproduct") }}
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
      <v-icon>{{ "mdi-chevron-left" }}</v-icon>
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

<script>
import Dialog from "../components/Dialog.vue";
import InviteUserDialog from "../components/InviteUserDialog.vue";

import Stash from "../models/Stash";

export default {
  name: "Create",
  components: {
    "v-dialog": Dialog,
    InviteUserDialog,
  },
  data: () => ({
    tab: 0,

    width: window.innerWidth,

    name: "",
    shared: false,

    users: [],
    products: [],

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
    isMobile() {
      return this.width <= 760;
    },
    showBackButton() {
      return this.isMobile && this.tab > 0;
    },
    showSaveButton() {
      return !this.isMobile || this.tab === 2;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    validateTab() {
      switch (this.tab) {
        case 0:
          if (this.name.length === 0) {
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
        this.$refs.form.validate();
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
      const value = this.$refs.userDialog.selectedValue;

      this.users = [...this.users, value];
    },

    saveData() {
      const { uid, name } = this.currentUser;
      const { name: stashName, shared, users, products } = this;

      const newStash = new Stash(
        stashName,
        shared,
        [{ uid, name, userStatus: -1 }, ...users],
        products
      );

      console.log(newStash);

      this.$store.dispatch("addNewStash", newStash);
    },

    clearDialogData() {
      this.$refs.userDialog.clearData();
    },
  },
  watch: {
    name() {
      this.showError = false;
    },
  },
};
</script>

<style scoped>
.fab {
  position: absolute;
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

.user-button:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
