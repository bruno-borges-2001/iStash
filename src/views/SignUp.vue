<template>
  <Card class="pa-5 d-flex flex-column" elevation="5">
    <!-- HEADER -->
    <h1 class="mb-4">{{ $t("button.signup") }}</h1>
    <!-- INPUT FIELDS -->
    <v-text-field
      v-model="name"
      :placeholder="$t('keys.name')"
      class="flex-grow-0"
      :rules="[rules.required]"
      @input="nameError = null"
    ></v-text-field>
    <v-text-field
      v-model="email"
      placeholder="Email"
      class="flex-grow-0"
      :rules="[rules.required, rules.email]"
      @input="emailError = null"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :placeholder="$t('keys.password')"
      class="flex-grow-0"
      type="password"
      :rules="[rules.required, passwordErrorMessage]"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :placeholder="$t('keys.confirmpassword')"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="[rules.required, confirmedPassword]"
      class="flex-grow-0"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
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

export default {
  name: "Login",
  components: {
    Card,
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
      auth.createUserWithEmailAndPassword(this.email, this.password).then(
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

      firestore.collections.users.doc(userAuth.uid).set(newUser);

      this.$store.dispatch("goBack", true);
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
