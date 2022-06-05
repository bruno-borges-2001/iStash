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
      nousers: "No users sharing this Stash",
      noproducts: "No products in this Stash",
      noshoppingproducts: "No products in this Stash's shopping list",
      nosearchuser: "No user fits the search",
      nosearchproduct: "No product fits the search",
      adduser: "Add User",
      addproduct: "Add Product",
      initialquantity: "Initial amount",
      controlshoppinglist: "Control: Add to Shopping List",
      controlhint:
        "Controls the amount needed for this product to be added to the Shopping List",
      fillrequiredfields: "Please, fill the required fields",
      invitemessage:
        "User {user} invited you to participate in the Stash {stash}, do you accept the invite?",
      noinvites: "No invites",
      nochanges: "No changes",
      acceptsuccess: "Invite accepted successfully",
      rejectsuccess: "Invite rejected successfully",
      removesuccess: "Stash removed successfully",
      createdby: "by: {name}",
      by: "by",
      fillrequiredfield: "Please, fill the required fields",
      searchuser: "Search user",
      searchstash: "Search Stash",
      ago: "{time} ago",
      now: "now",
      itemsperpage: "Products per page",
      renamestash: "Rename Stash",
      deletestash: "Delete Stash",
      areyousure: "Are you sure?",
      newproduct: "New product added",
      removedproduct: "Produto removed",
      pendingchanges: "Pending Changes! Access changes screen to manage them",
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
      rename: "Rename",
      overridechange: "Override change",
      acceptchange: "Accept change",
      override: "Override",
      accept: "Accept",
    },
    keys: {
      name: "Name",
      password: "Password",
      confirmpassword: "Confirm Password",
      product: "Products | Product | Products",
      quantity: "Amount",
      expected: "Expected",
      unit: "Unit",
      shoppinglist: "Shopping List",
      shoppinglistshort: "Shopping",
      controlledproduct:
        "Controlled Products | Controlled Product | Controlled Products",
      user: "User | Users",
      setting: "Setting | Settings",
      error: "Error",
      notifications: "Notifications",
      success: "Success",
      owner: "Owner",
      invited: "Invited",
      cancel: "Cancel",
      of: "of",
      changes: "Changes",
      language: "Language",
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
      unit: "Unities must have integer values",
      internalerror: "Internal Error",
      nolongershared:
        "The Stash owner disabled the shared Stash option, invitation has been canceled",
      lengtherror: "Field length exceeded permitted maximum",
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
      nousers: "Sem usuários compartilhando esse Stash",
      noproducts: "Sem produtos nesse Stash",
      noshoppingproducts: "Sem produtos na lista de compras desse Stash",
      nosearchuser: "Nenhum usuário corresponde com a busca",
      nosearchproduct: "Nenhum produto corresponde com a busca",
      adduser: "Adicionar Usuário",
      addproduct: "Adicionar Produto",
      initialquantity: "Quantidade inicial",
      controlshoppinglist: "Controle: Adicionar à Lista de Compras",
      controlhint:
        "Controla a quantidade necessária para um produto ser adicionado à lista de compras",
      fillrequiredfields: "Por favor, preencha os campos requeridos",
      invitemessage:
        "O Usuário {user} convidou você para participar do Stash {stash}, você aceita o convite?",
      noinvites: "Sem convites",
      nochanges: "Sem mudanças",
      acceptsuccess: "Convite aceito com sucesso",
      rejectsuccess: "Convite rejeitado com sucesso",
      removesuccess: "Stash removido com sucesso",
      createdby: "por: {name}",
      by: "por",
      fillrequiredfield: "Por favor, preencha os campos requeridos",
      searchuser: "Procurar usuário",
      searchstash: "Procurar Stash",
      mismatchversion: "Versão atual diferente da do banco de dados",
      ago: "há {time}",
      now: "agora",
      itemsperpage: "Produtos por página",
      renamestash: "Renomear o Stash",
      deletestash: "Apagar o Stash",
      areyousure: "Você tem certeza?",
      newproduct: "Novo produto adicionado",
      removedproduct: "Produto removido",
      pendingchanges:
        "Mudanças pendentes! acesse a página de mudanças para gerenciá-las",
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
      rename: "Renomear",
      overridechange: "Sobrescrever mudança",
      acceptchange: "Aceitar mudança",
      override: "Sobrescrever",
      accept: "Aceitar",
    },
    keys: {
      name: "Nome",
      password: "Senha",
      confirmpassword: "Confirmar Senha",
      product: "Produtos | Produto | Produtos",
      quantity: "Quantidade",
      expected: "Esperado",
      unit: "Unidade",
      shoppinglist: "Lista de compras",
      shoppinglistshort: "Compras",
      controlledproduct:
        "Produtos Controlados | Produto Controlado | Produtos Controlados",
      user: "Usuário | Usuários",
      setting: "Configuração | Configurações",
      error: "Erro",
      warning: "Aviso",
      notifications: "Notificações",
      success: "Sucesso",
      owner: "Criador",
      invited: "Convidado",
      cancel: "Cancelar",
      of: "de",
      changes: "Mudanças",
      language: "Idioma",
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
      unit: "Unidades devem possuir valores inteiros",
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
  dateTimeFormats: dateTimeFormats as VueI18n.DateTimeFormats,
  numberFormats,
});

export default i18n;

export function changeLocale(newLocale: "pt-BR" | "en-US") {
  console.log(newLocale);
  i18n.locale = newLocale;
}

export function getLocale() {
  return i18n.locale;
}
