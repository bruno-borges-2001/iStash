<template>
  <Main>
    <div v-if="loaded">
      <div v-if="invites.length === 0">{{ $t("message.noinvites") }}</div>
      <InviteCard
        v-for="item in invites"
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
import InviteCard from "@/components/InviteCard";
import LoadingIndicator from "@/components/LoadingIndicator";

import Main from "@/layouts/Main.vue";

export default {
  components: { Main, LoadingIndicator, InviteCard },
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
    removeInviteFromState(_id) {
      this.$store.commit(
        "setInvites",
        this.invites.filter((el) => el.id !== _id)
      );
    },
  },
};
</script>

<style></style>
