<template>
  <Main>
    <m-btn :label="$t('message.mystashes')" :click="handleMyStashes">
      <v-icon size="100">mdi-archive-outline</v-icon>
    </m-btn>
  </Main>
</template>

<script lang="ts">
import Main from "../layouts/Main.vue";
import ModuleButton from "../components/Buttons/ModuleButton.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    Main,
    "m-btn": ModuleButton,
  },
  computed: {},
  methods: {
    handleMyStashes() {
      this.$router.push("/stashes");
    },
  },
});
</script>

<style scoped></style>
