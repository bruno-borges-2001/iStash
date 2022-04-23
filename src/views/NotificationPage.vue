<template>
  <Main>
    <div v-if="loaded">
      <div v-if="invites.length === 0">{{ $t("message.noinvites") }}</div>
      <div
        v-for="item in invites"
        :key="item.id"
        @click="acceptInvite(item.stash)"
      >
        {{ item.message }}
      </div>
    </div>
    <LoadingIndicator v-else />
  </Main>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator";

import Main from "@/layouts/Main.vue";

export default {
  components: { Main, LoadingIndicator },
  data: () => ({}),
  computed: {
    invites() {
      return this.$store.state.myInvites;
    },
    loaded() {
      return this.$store.state.invitesLoaded;
    },
  },
  methods: {
    acceptInvite(stash) {
      switch (stash.acceptInvite(this.$store.state.userId)) {
        case 0:
          this.$notify({
            group: "center",
            title: this.$t("keys.success"),
            text: this.$t("message.acceptsuccess"),
            type: "success",
          });
          break;
        case 1:
          this.$notify({
            group: "center",
            title: this.$t("keys.error"),
            text: this.$t("error.nolongershared"),
            type: "error",
          });
          break;
        case 999:
          this.$notify({
            group: "center",
            title: this.$t("keys.error"),
            text: this.$t("error.internalerror"),
            type: "error",
          });
          break;
        default:
          break;
      }
      this.$store.commit(
        "setInvites",
        this.invites.filter((el) => el.id !== stash.id)
      );
    },
  },
};
</script>

<style></style>
