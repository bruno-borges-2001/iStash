<template>
  <v-card class="v-btn stash-button" @click="onclick">
    <v-card-title class="pb-0">{{ stash.name }}</v-card-title>
    <div class="top-right">
      <v-btn icon v-on:click.stop v-if="showWarning">
        <v-icon color="yellow">mdi-alert</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on:click.stop v-on="on" v-bind="attrs">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item @click="handleRemove">Excluir</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="bottom-right" v-if="stash.shared">
      <v-btn icon v-on:click.stop @click="handleShowUsers">
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
    </div>

    <v-card-subtitle
      class="pt-0 text-capitalize"
      :style="!showCreator && 'visibility: hidden'"
    >
      {{ $t("message.createdby", { name: owner.name }) }}
    </v-card-subtitle>

    <v-card-text class="pb-2 text-lowercase product-label">
      <v-icon>mdi-archive</v-icon>
      {{ stash.products.length }}
      {{ $tc("keys.product", stash.products.length) }}
    </v-card-text>
    <v-card-text class="pt-1 text-lowercase product-label">
      <v-icon>mdi-basket</v-icon>
      {{ controlledProducts.length }}
      {{ $tc("keys.controlledproduct", controlledProducts.length) }}
    </v-card-text>
  </v-card>
</template>

<script>
import { OWNER, INVITED, REJECTED } from "../../helpers/UserStatus";
export default {
  name: "StashButton",
  props: {
    stash: Object,
    onclick: Function,
  },
  computed: {
    controlledProducts() {
      return this.stash.products.filter(
        (el) => el.rule !== null && el.rule >= 0
      );
    },
    showWarning() {
      return (
        this.stash.products.filter(
          (el) => el.rule !== null && el.rule >= 0 && el.quantity <= el.rule
        ).length > 0
      );
    },

    owner() {
      return this.stash.usersInfo.find(
        (el) => el.uid === this.$store.state.userId
      );
    },

    showCreator() {
      return this.stash.shared && this.owner.userStatus !== OWNER;
    },
  },
  methods: {
    handleRemove() {
      this.$store.dispatch("removeStash", this.stash.id);
      this.$notify({
        group: "center",
        title: this.$t("keys.success"),
        text: this.$t("message.removesuccess"),
        type: "success",
      });
    },
    handleShowUsers() {
      this.$notify({
        group: "center",
        title: this.$tc("keys.user", 2),
        text: this.stash.usersInfo
          .filter(
            (el) => el.userStatus !== INVITED && el.userStatus !== REJECTED
          )
          .map((el) =>
            el.userStatus === OWNER
              ? `${el.name} - ${this.$t("keys.owner")}`
              : el.name
          )
          .join("<br>"),
        type: "info",
      });
    },
  },
};
</script>

<style scoped>
.stash-button {
  height: 10rem !important;
  width: 60% !important;

  border-radius: 0.8rem !important;
  background-color: lightgray;

  position: relative;
}

.top-right {
  position: absolute !important;
  top: 16px;
  right: 16px;
}

.top-right > * + * {
  margin-left: 0.5em;
}

.bottom-right {
  position: absolute !important;
  bottom: 16px;
  right: 16px;
}

.product-label > i {
  margin-right: 6px;
}
</style>
