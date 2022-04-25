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
      fillrequiredfields: "Please, fill the all the fields",
      invitemessage:
        "User {user} invited you to participate in the Stash {stash}, do you accept the invite?",
      noinvites: "No invites",
      acceptsuccess: "Invite accepted successfully",
      rejectsuccess: "Invite rejected successfully",
      removesuccess: "Stash removed successfully",
      createdby: "by: {name}",
      fillrequiredfield: "Please, fill the required fields",
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
      product: "Products | Product | Products",
      controlledproduct:
        "Controlled Products | Controlled Product | Controlled Products",
      user: "User | Users",
      setting: "Setting | Settings",
      error: "Error",
      notifications: "Notifications",
      success: "Success",
      owner: "Owner",
    },
    error: {
      required: "Required field",
      invalidemail: "Invalid email",
      invalidpassword: "Invalid password",
      notmatch: "Password doesn't match",
      usernotfound: "User not found",
      badformat: "Badly formatted email",
      weakpassword: "Please, choose a stronger password",
      isrequired: "{param} is required",
      invalidvalue: "Invalid value",
      unity: "Unities must have integer values",
      internalerror: "Internal Error",
    },
    nolongershared:
      "The Stash owner disabled the shared Stash option, invitation has been canceled",
    lengtherror: "Field length exceeded permitted maximum",
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
      fillrequiredfields: "Por favor, preencha todos os campos",
      invitemessage:
        "O Usuário {user} convidou você para participar do Stash {stash}, você aceita o convite?",
      noinvites: "Sem convites",
      acceptsuccess: "Convite aceito com sucesso",
      rejectsuccess: "Convite rejeitado com sucesso",
      removesuccess: "Stash removido com sucesso",
      createdby: "por: {name}",
      fillrequiredfield: "Por favor, preencha os campos requeridos",
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
      product: "Produtos | Produto | Produtos",
      controlledproduct:
        "Produtos Controlados | Produto Controlado | Produtos Controlados",
      user: "Usuário | Usuários",
      setting: "Configuração | Configurações",
      error: "Erro",
      notifications: "Notificações",
      success: "Sucesso",
      owner: "Criador",
    },
    error: {
      required: "Campo obrigatório",
      invalidemail: "Email inválido",
      invalidpassword: "Senha inválida",
      notmatch: "Senhas não são iguais",
      usernotfound: "Usuário não encontrado",
      badformat: "Email mal formatado",
      weakpassword: "Por favor, insira uma senha mais forte",
      isrequired: "{param} é obrigatório",
      invalidvalue: "Valor inválido",
      unity: "Unidades devem possuir valores inteiros",
      internalerror: "Erro Interno",
      nolongershared:
        "O dono do Stash desabilitou a opção de Stash compartilhado, o convite foi anulado",
      lengtherror: "Tamanho do campo excedeu o máximo permitido",
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
