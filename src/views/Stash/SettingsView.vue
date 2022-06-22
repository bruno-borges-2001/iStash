<template>
  <div
    class="d-flex flex-column align-center flex-grow-1 full-width full-height pa-4"
  >
    <v-list class="full-width">
      <v-list-item
        class="d-flex flex-row full-width align-center"
        style="gap: 1rem"
      >
        <h3 style="font-size: 1rem">
          {{ $t("message.renamestash") }}
        </h3>
        <v-text-field
          :placeholder="stash.name"
          :rules="nameRules"
          v-model="newStashName"
        ></v-text-field>
        <v-btn @click="handleRename">{{ $t("button.rename") }}</v-btn>
      </v-list-item>

      <v-divider style="margin: 1rem 0"></v-divider>

      <v-list-item class="d-flex full-width">
        <v-btn
          class="flex-grow-1"
          @click="handleDelete"
          v-click-outside="cancelDelete"
        >
          {{
            deleteConfirm ? $t("message.areyousure") : $t("message.deletestash")
          }}
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SettingsView",
  props: {
    stash: Object,
  },
  data: () => ({
    newStashName: "",
    deleteConfirm: false,
  }),
  computed: {
    nameRules() {
      return [
        (value) => value.length <= 25 || "Tamanho máximo de 25 caracteres",
      ];
    },
  },
  methods: {
    handleRename() {
      if (!this.newStashName) {
        return this.$notify({
          group: "center",
          title: this.$t("keys.error"),
          text: this.$t("message.fillrequiredfields"),
          type: "error",
        });
      }

      if (this.newStashName.length > 25) return;

      this.stash.renameStash(this.newStashName);

      this.newStashName = "";
    },
    handleDelete() {
      if (this.deleteConfirm) {
        this.stash.remove();
        this.$router.replace("/");
      } else {
        this.deleteConfirm = true;
      }
    },
    cancelDelete() {
      this.deleteConfirm = false;
    },
  },
});
</script>

<style></style>
