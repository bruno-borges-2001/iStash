import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  "en-US": {
    message: {
      welcome: "Please, log in or create an account to start using iStash",
      signup: "Don't have an account?",
      forgotpassword: "Forgot your password?",
      mystashes: "My Stashes",
      sharedstash: "Shared Stash",
      inviteusers: "Invite Users",
      nostashes:
        "It appears that you don't have any stashes, why don't you create one?",
      adduser: "Add User",
      addproduct: "Add Product",
    },
    button: {
      login: "Log In",
      logout: "Logout",
      save: "Save",
      signup: "Sign Up",
      signupimp: "Sign Up",
      signupshort: "Sign Up",
      forgotpassword: "Forgot Password",
      clickhere: "Click Here",
      sendemail: "Send email",
    },
    keys: {
      name: "Name",
      password: "Password",
      confirmpassword: "Confirm Password",
      product: "Product | Products",
    },
    error: {
      required: "Required field",
      invalidemail: "Invalid email",
      notmatch: "Password doesn't match",
      usernotfound: "User not found",
      badformat: "Badly formatted email",
      weakpassword: "Please, choose a stronger password",
      isrequired: "{param} is required",
    },
  },
  "pt-BR": {
    message: {
      welcome:
        "Por favor, conecte-se em sua conta ou crie uma para começar a usar o iStash",
      signup: "Não possui uma conta?",
      forgotpassword: "Esqueceu sua senha?",
      mystashes: "Meus Stashes",
      sharedstash: "Stash Compartilhado",
      inviteusers: "Convidar Usuários",
      nostashes:
        "Parece que você não possui nenhum Stash, você gostaria de criar um?",
      adduser: "Adicionar Usuário",
      addproduct: "Adicionar Produto",
    },
    button: {
      login: "Entrar",
      logout: "Sair",
      save: "Salvar",
      signup: "Criar uma conta",
      signupimp: "Crie uma conta",
      signupshort: "Criar conta",
      forgotpassword: "Esqueci a senha",
      clickhere: "Clique aqui",
      sendemail: "Enviar email",
    },
    keys: {
      name: "Nome",
      password: "Senha",
      confirmpassword: "Confirmar Senha",
      product: "Produto | Produtos",
    },
    error: {
      required: "Campo obrigatório",
      invalidemail: "Email inválido",
      notmatch: "Senhas não são iguais",
      usernotfound: "Usuário não encontrado",
      badformat: "Email mal formatado",
      weakpassword: "Por favor, insira uma senha mais forte",
      isrequired: "{param} é obrigatório",
    },
  },
};

const dateTimeFormats = {
  "en-US": {
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  },
  "pt-BR": {
    long: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  },
};

const numberFormats = {
  "en-US": {
    unit: {
      style: "unit",
      unit: "mile-per-hour",
    },
  },
  "pt-BR": {
    unit: {
      style: "unit",
      unit: "kilometer-per-hour",
    },
  },
};

const i18n = new VueI18n({
  locale: window.navigator.language,
  fallbackLocale: "en-US",
  messages,
  dateTimeFormats,
  numberFormats,
});

export default i18n;

export function changeLocale(newLocale) {
  i18n.locale = newLocale;
}

export function getLocale() {
  return i18n.locale;
}
