<template>
  <v-card id="login-card" class="pa-5 d-flex flex-column" elevation="5">
    <!-- HEADER -->
    <v-btn
      v-if="forgotPasswordScreen"
      icon
      @click="handleBack"
      class="ml-n3 mt-n3"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <h1 class="mb-4">
      {{
        forgotPasswordScreen ? $t("button.forgotpassword") : $t("button.login")
      }}
    </h1>
    <!-- INPUT FIELDS -->
    <v-text-field
      v-model="email"
      placeholder="Email"
      class="flex-grow-0"
      :rules="[rules.required, rules.email, emailErrorMessage]"
      @input="error = null"
    ></v-text-field>
    <v-text-field
      v-if="!forgotPasswordScreen"
      v-model="password"
      :placeholder="$t('keys.password')"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      class="flex-grow-0"
      @click:append="showPassword = !showPassword"
      :rules="[rules.required, passwordErrorMessage]"
      @input="error = null"
      @keypress="({ keyCode }) => keyCode === 13 && handleLogin()"
    ></v-text-field>
    <!-- SECONDARY ACTIONS -->
    <span v-if="!forgotPasswordScreen"
      >{{ $t("message.signup") }}
      <a @click="handleSignUp">{{ $t("button.signupimp") }}</a>
    </span>
    <span v-if="!forgotPasswordScreen"
      >{{ $t("message.forgotpassword") }}
      <a @click="handleForgotPassword">{{ $t("button.clickhere") }}</a>
    </span>

    <span v-if="error">{{ error }} </span>
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
  </v-card>
</template>

<script>
import auth from "@/plugins/firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      error: null,
      emailError: null,
      passwordError: null,
      showPassword: false,
      forgotPasswordScreen: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
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
  methods: {
    handleSignUp() {
      this.$store.dispatch("pushRoute", "signup");
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
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        () => this.$store.dispatch("pushRoute", "/"),
        (error) => this.parseError(error)
      );
    },
    parseError({ code }) {
      switch (code) {
        case "auth/user-not-found":
          this.emailError = "User not found";
          break;
        case "auth/invalid-email":
          if (this.email.length === 0) this.emailError = "Email is required";
          else this.emailError = "Badly formatted email";
          break;
        case "auth/wrong-password":
          this.passwordError = "Wrong password";
          break;
        case "auth/too-many-requests":
          this.error = "Too many requests";
          break;
      }
    },
  },
};
</script>

<style>
#login-card {
  width: 25rem;
  margin: 0 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
