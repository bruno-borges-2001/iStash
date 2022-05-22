<template>
  <v-layout v-resize="onResize">
    <v-card class="change-card" style="width: 80vw">
      <v-card-title>Stash: {{ title }}</v-card-title>
      <v-card class="change-card" v-for="item in diff" :key="item.id">
        <v-card-title v-if="typeof item.name === 'string'">
          {{ $tc("keys.product", 1) }}: {{ item.name }}
        </v-card-title>

        <v-card-title v-else>
          {{ $tc("keys.product", 1) }}: {{ item.name.oldValue }} ►
          {{ item.name.newValue }}
        </v-card-title>

        <v-card-text v-if="'message' in item">
          {{ $t(`message.${item.message}`) }}
        </v-card-text>

        <v-card-text
          v-for="key in ['quantity', 'rule', 'unity'].filter(
            (el) => el in item
          )"
          :key="key"
          style="text-transform: capitalize"
        >
          {{ key }}:
          {{ item[key].oldValue === null ? "X" : item[key].oldValue }} ►
          {{ item[key].newValue }}
        </v-card-text>
      </v-card>

      <v-card-actions v-if="showActionsAll">
        <v-spacer></v-spacer>
        <v-btn
          @click="handleOverride"
          class="change-card-button"
          text
          :icon="isMobile === 'sm'"
        >
          <v-icon>mdi-upload</v-icon>
          <span v-if="isMobile === 'lg'">{{
            $t("button.overridechange")
          }}</span>
          <span v-else-if="isMobile === 'md'">{{ $t("button.override") }}</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="handleSave"
          class="change-card-button"
          text
          :icon="isMobile === 'sm'"
        >
          <v-icon>mdi-download</v-icon>
          <span v-if="isMobile === 'lg'">{{ $t("button.acceptchange") }}</span>
          <span v-else-if="isMobile === 'md'">{{ $t("button.accept") }}</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Stash from "../../models/Stash";

export default Vue.extend({
  name: "ChangeGroup",
  props: {
    id: String,
    diff: Object,
    stash: Object as () => Stash,
  },
  data: () => ({
    isMobile: "lg",
  }),
  computed: {
    title(): string {
      return this.stash.name!;
    },
    showActionsAll(): boolean {
      return Object.values(this.diff).some(
        (el: any) =>
          ("name" in el && typeof el.name !== "string") ||
          "quantity" in el ||
          "unit" in el ||
          "rule" in el
      );
    },
  },
  methods: {
    onResize() {
      if (window.innerWidth < 475) this.isMobile = "sm";
      else if (window.innerWidth < 750) this.isMobile = "md";
      else this.isMobile = "lg";
    },

    handleOverride() {
      const newData = { ...this.$store.getters.getStash(this.id) };
      newData.version = this.stash.version + 1;

      this.$store.commit("updateStash", { id: this.id, value: newData });
      this.clearChange();
    },

    handleSave() {
      this.$store.commit("updateStash", { id: this.id, value: this.stash });
      this.clearChange();
    },

    clearChange() {
      this.$store.commit("clearChange", this.id);
    },
  },
});
</script>

<style>
.change-card {
  padding: 0 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
}

.change-card-button {
  font-size: 0.8rem !important;
}
</style>
