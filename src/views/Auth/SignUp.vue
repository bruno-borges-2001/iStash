<template>
  <Card>
    <!-- HEADER -->
    <h1 class="mb-4">{{ $t("button.signup") }}</h1>
    <!-- INPUT FIELDS -->
    <TextInput
      v-model="name"
      required
      :placeholder="$t('keys.name')"
      :onInput="() => (nameError = null)"
    ></TextInput>
    <TextInput
      v-model="email"
      placeholder="Email"
      required
      email
      :rules="[emailErrorMessage]"
      :onInput="() => (emailError = null)"
    ></TextInput>
    <PasswordInput
      v-model="password"
      required
      hidePasswordButton
      :placeholder="$t('keys.password')"
      :rules="[passwordErrorMessage]"
    ></PasswordInput>
    <PasswordInput
      v-model="confirmPassword"
      required
      :placeholder="$t('keys.confirmpassword')"
      :rules="[confirmedPassword]"
    ></PasswordInput>
    <!-- MAIN ACTIONS -->
    <v-btn class="align-self-end mt-2" color="primary" @click="handleSignUp">
      {{ $t("button.signupshort") }}
    </v-btn>
  </Card>
</template>

<script>
import auth from "@/plugins/firebase/auth";
import firestore from "@/plugins/firebase/firestore";
import Card from "@/layouts/Card";

import TextInput from "@/components/Inputs/Input";
import PasswordInput from "@/components/Inputs/PasswordInput";

export default {
  name: "SignUp",
  components: {
    Card,
    TextInput,
    PasswordInput,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      nameError: null,
      emailError: null,
      passwordError: null,
      showPassword: false,
      rules: {
        required: (value) => !!value || this.$t("error.required"),
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$t("error.invalidemail");
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
    confirmedPassword() {
      return (
        this.password === this.confirmPassword || this.$t("error.notmatch")
      );
    },
  },
  methods: {
    handleSignUp() {
      if (!this.name || !this.email || !this.password || !this.confirmPassword)
        return this.$notify({
          group: "center",
          title: this.$t("keys.error"),
          text: this.$t("message.fillrequiredfields"),
          type: "error",
        });

      auth
        .createUserWithEmailAndPassword(this.email.toLowerCase(), this.password)
        .then(
          (a) => this.handleSignUpSuccess(a.user),
          (error) => this.parseError(error)
        );
    },
    handleSignUpSuccess(userAuth) {
      const newUser = {
        name: this.name,
        email: userAuth.email,
        uid: userAuth.uid,
      };

      firestore.collection("users").doc(userAuth.uid).set(newUser);

      this.$router.replace("/");
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
        case "auth/weak-password":
          this.passwordError = this.$t("error.weakpassword");
      }
    },
  },
};
</script>
