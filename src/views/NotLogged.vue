<template>
  <Main>
    <span class="headline text-center">{{ $t("message.welcome") }}</span>
    <v-btn x-large color="primary" class="button mt-2" @click="handleLogin">{{
      $t("button.login")
    }}</v-btn>
    <v-btn x-large color="primary" class="button mt-2" @click="handleSignUp">{{
      $t("button.signup")
    }}</v-btn>
  </Main>
</template>

<script>
import Main from "@/layouts/Main.vue";

export default {
  name: "NotLogged",
  components: { Main },
  methods: {
    handleLogin() {
      this.$store.dispatch("replaceRoute", "login");
    },
    handleSignUp() {
      this.$store.dispatch("replaceRoute", "signup");
    },
  },
};
</script>

<style></style>
