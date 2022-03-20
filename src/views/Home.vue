<template>
  <Main>
    <m-btn :label="$t('message.mystashes')" :click="handleMyStashes">
      <v-icon size="100">mdi-archive-outline</v-icon>
    </m-btn>
  </Main>
</template>

<script>
import Main from "@/layouts/Main.vue";
import ModuleButton from "../components/ModuleButton.vue";

export default {
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
};
</script>

<style scoped></style>
