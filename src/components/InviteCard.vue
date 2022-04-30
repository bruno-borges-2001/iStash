<template>
  <v-card class="my-2" elevation="9">
    <v-card-text class="text--primary">{{ message }}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex full-width">
      <v-btn class="d-flex flex-grow-1" text @click="rejectInvite">
        <v-icon color="red">mdi-close</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn class="d-flex flex-grow-1" text @click="acceptInvite">
        <v-icon color="green">mdi-check</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "InviteCard",
  props: {
    stashRef: Object,
    message: String,
    onSubmit: Function,
  },
  methods: {
    acceptInvite() {
      switch (this.stashRef.acceptInvite(this.$store.state.userId)) {
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

      this.onSubmit(this.stashRef.id);
    },
    rejectInvite() {
      switch (this.stashRef.rejectInvite(this.$store.state.userId)) {
        case 0:
          this.$notify({
            group: "center",
            title: this.$t("keys.success"),
            text: this.$t("message.rejectsuccess"),
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

      this.onSubmit(this.stashRef.id);
    },
  },
};
</script>

<style></style>
