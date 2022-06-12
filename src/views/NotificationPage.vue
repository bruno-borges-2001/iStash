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

<script lang="ts">
import Vue from "vue";
import InviteCard from "../components/InviteCard.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

import Main from "../layouts/Main.vue";
import { Invite } from "../types";

export default Vue.extend({
  components: { Main, LoadingIndicator, InviteCard },
  data: () => ({
    ignoreInvitesId: [] as string[],
  }),
  computed: {
    invites(): Invite[] {
      return this.$store.state.myInvites;
    },
    filteredInvites(): Invite[] {
      return this.invites.filter((el) => !this.ignoreInvitesId.includes(el.id));
    },
    loaded(): boolean {
      return this.$store.state.invitesLoaded;
    },
  },
  methods: {
    removeInviteFromState(_id: string) {
      this.$store.commit(
        "setInvites",
        this.invites.filter((el) => el.id !== _id)
      );
    },
  },
  watch: {
    invites(newVal: Invite[], oldVal: Invite[]) {
      if (newVal.length <= oldVal.length) {
        this.ignoreInvitesId = [];
      }
    },
  },
});
</script>

<style></style>
