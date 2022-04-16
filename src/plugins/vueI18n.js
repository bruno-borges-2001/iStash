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
      initialquantity: "Initial amount",
      controlshoppinglist: "Control: Add to Shopping List",
      controlhint:
        "Controls the amount needed for this product to be added to the Shopping List",
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
      user: "User | Users",
      setting: "Setting | Settings",
    },
    error: {
      required: "Required field",
      invalidemail: "Invalid email",
      notmatch: "Password doesn't match",
      usernotfound: "User not found",
      badformat: "Badly formatted email",
      weakpassword: "Please, choose a stronger password",
      isrequired: "{param} is required",
      invalidvalue: "Invalid value",
      unity: "Unities must have integer values",
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
      initialquantity: "Quantidade inicial",
      controlshoppinglist: "Controle: Adicionar à Lista de Compras",
      controlhint:
        "Controla a quantidade necessária para um produto ser adicionado à lista de compras",
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
      user: "Usuário | Usuários",
      setting: "Configuração | Configurações",
    },
    error: {
      required: "Campo obrigatório",
      invalidemail: "Email inválido",
      notmatch: "Senhas não são iguais",
      usernotfound: "Usuário não encontrado",
      badformat: "Email mal formatado",
      weakpassword: "Por favor, insira uma senha mais forte",
      isrequired: "{param} é obrigatório",
      invalidvalue: "Valor inválido",
      unity: "Unidades devem possuir valores inteiros",
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
