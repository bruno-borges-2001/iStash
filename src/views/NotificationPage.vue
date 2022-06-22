<template>
  <Main>
    <div v-if="loaded">
      <div v-if="filteredInvites.length === 0">{{ $t("message.noinvites") }}</div>
      <InviteCard
        v-for="item in filteredInvites"
        :key="item.id"
        :stashRef="item.stash"
        :message="item.message"
        :onSubmit="removeInviteFromState"
      >
      </InviteCard>
    </div>
    <LoadingIndicator v-else />
  </Main>
</template>

<script>
import Vue from "vue";
import InviteCard from "../components/InviteCard.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

import Main from "../layouts/Main.vue";

export default Vue.extend({
  components: { Main, LoadingIndicator, InviteCard },
  data: () => ({
    ignoreInvitesId: [],
  }),
  computed: {
    invites() {
      return this.$store.state.myInvites;
    },
    filteredInvites() {
      return this.invites.filter((el) => !this.ignoreInvitesId.includes(el.id));
    },
    loaded() {
      return this.$store.state.invitesLoaded;
    },
  },
  methods: {
    removeInviteFromState(_id) {
      this.$store.commit(
        "setInvites",
        this.invites.filter((el) => el.id !== _id)
      );
    },
  },
  watch: {
    invites(newVal, oldVal) {
      if (newVal.length <= oldVal.length) {
        this.ignoreInvitesId = [];
      }
    },
  },
});
</script>

<style></style>
