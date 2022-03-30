<template>
  <v-container>
    <v-form ref="form">
      <v-card class="section px-4 py-2" v-if="!isMobile || tab == 0">
        <v-card-title>Stash</v-card-title>
        <v-text-field v-model="name" :label="$t('keys.name')"></v-text-field>
        <v-checkbox
          v-model="shared"
          :label="$t('message.sharedstash')"
        ></v-checkbox>
      </v-card>
      <v-card
        class="section px-4 py-2"
        v-if="shared && (!isMobile || tab == 1)"
      >
        <v-card-title>{{ $t("message.inviteusers") }}</v-card-title>
      </v-card>
      <v-card class="section px-4 py-2" v-if="!isMobile || tab == 2">
        <v-card-title>{{ $tc("keys.product", 2) }}</v-card-title>
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
import Stash from "../models/Stash";

export default {
  name: "Create",
  data: () => ({
    tab: 0,

    width: window.innerWidth,

    name: "",
    shared: false,

    users: [],
    products: [],
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
</style>
