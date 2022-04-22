<template>
  <Main>
    <div v-if="loaded">
      <div v-if="invites.length === 0">Sem convites</div>
      <div v-for="item in invites" :key="item.id">{{ item.message }}</div>
    </div>
    <LoadingIndicator v-else />
  </Main>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator";

import Main from "@/layouts/Main.vue";

import { OWNER } from "@/helpers/UserStatus";

import firestore from "@/plugins/firebase/firestore";

import Stash from "@/models/Stash";

export default {
  components: { Main, LoadingIndicator },
  data: () => ({
    loaded: false,
    invites: [],
  }),
  created() {
    this.load();
  },
  computed: {
    stashes() {
      return firestore
        .collection("stashes")
        .where("invites", "array-contains", this.$store.state.userId);
    },
  },
  methods: {
    async load() {
      const stashes = await this.stashes.get();

      if (stashes) {
        this.invites = stashes.docs
          .filter((el) => el.shared)
          .map((el) => {
            const data = el.data();
            return {
              id: el.id,
              message: this.$t("message.invitemessage", {
                user: data.userInfo.find((el) => el.userStatus === OWNER),
                stash: data.name,
              }),
              stash: new Stash(
                el.id,
                data.name,
                data.shared,
                data.users,
                data.usersInfo,
                data.products,
                data.rules,
                data.date
              ),
            };
          });
      }

      this.loaded = true;

      setTimeout(this.load, 5000);
    },
  },

  acceptInvite(stash) {
    switch (stash.acceptInvite()) {
      case 1:
        this.$notify({
          group: "center",
          title: this.$t("keys.error"),
          text: this.$t("error.nolongershared"),
          type: "error",
        });
      case 999:
        this.$notify({
          group: "center",
          title: this.$t("keys.error"),
          text: this.$t("message.internalerror"),
          type: "error",
        });
      default:
        break;
    }
    this.invites = this.invites.filter((el) => el.id !== stash.id);
  },
};
</script>

<style></style>
