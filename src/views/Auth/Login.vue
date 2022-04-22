<template>
  <Card>
    <!-- HEADER -->
    <v-btn
      v-if="forgotPasswordScreen"
      icon
      @click="handleBack"
      class="ml-n3 mt-n3"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h1>
      {{
        forgotPasswordScreen ? $t("button.forgotpassword") : $t("button.login")
      }}
    </h1>
    <!-- INPUT FIELDS -->
    <TextInput
      placeholder="Email"
      required
      email
      v-model="email"
      :rules="[emailErrorMessage]"
    ></TextInput>
    <PasswordInput
      v-if="!forgotPasswordScreen"
      required
      v-model="password"
      :placeholder="$t('keys.password')"
      :rules="[passwordErrorMessage]"
      :onKeypress="({ keyCode }) => keyCode === 13 && handleLogin()"
    ></PasswordInput>
    <!-- SECONDARY ACTIONS -->
    <span v-if="!forgotPasswordScreen"
      >{{ $t("message.signup") }}
      <a @click="handleSignUp">{{ $t("button.signupimp") }}</a>
    </span>
    <span v-if="!forgotPasswordScreen"
      >{{ $t("message.forgotpassword") }}
      <a @click="handleForgotPassword">{{ $t("button.clickhere") }}</a>
    </span>
    <!-- MAIN ACTIONS -->
    <v-btn
      v-if="forgotPasswordScreen"
      class="align-self-end mt-2"
      color="primary"
      @click="handleForgotPasswordSubmit"
    >
      {{ $t("button.sendemail") }}
    </v-btn>
    <v-btn
      v-else
      class="align-self-end mt-2"
      color="primary"
      @click="handleLogin"
    >
      {{ $t("button.login") }}
    </v-btn>
  </Card>
</template>

<script>
import auth from "@/plugins/firebase/auth";
import Card from "@/layouts/Card";

import TextInput from "@/components/Inputs/Input";
import PasswordInput from "@/components/Inputs/PasswordInput";

export default {
  name: "LogIn",
  components: {
    Card,
    TextInput,
    PasswordInput,
  },
  data() {
    return {
      email: null,
      password: null,

      emailError: null,
      passwordError: null,

      forgotPasswordScreen: false,
    };
  },
  computed: {
    emailErrorMessage() {
      return this.emailError === null || this.emailError;
    },
    passwordErrorMessage() {
      return this.passwordError === null || this.passwordError;
    },
  },
  watch: {
    email() {
      this.emailError = null;
    },
    password() {
      this.passwordError = null;
    },
  },
  methods: {
    handleSignUp() {
      this.$router.push("/signup");
    },
    handleForgotPassword() {
      this.forgotPasswordScreen = true;
    },
    handleForgotPasswordSubmit() {
      auth
        .sendPasswordResetEmail(this.email)
        .catch((error) => this.parseError(error));
    },
    handleBack() {
      this.forgotPasswordScreen = false;
    },
    handleLogin() {
      if (!this.email || !this.password)
        return this.$notify({
          group: "center",
          title: this.$t("keys.error"),
          text: this.$t("message.fillrequiredfields"),
          type: "error",
        });

      auth
        .signInWithEmailAndPassword(this.email.toLowerCase(), this.password)
        .then(
          () => this.$router.push("/"),
          (error) => this.parseError(error)
        );
    },
    parseError({ code }) {
      switch (code) {
        case "auth/user-not-found":
          this.emailError = this.$t("error.usernotfound");
          break;
        case "auth/invalid-email":
          if (this.email.length === 0)
            this.emailError = this.$t("error.isrequired", { param: "Email" });
          else this.emailError = this.$t("error.badformat");
          break;
        case "auth/wrong-password":
          this.passwordError = this.$t("error.invalidpassword");
          break;
        case "auth/too-many-requests":
          break;
      }
    },
  },
};
</script>
