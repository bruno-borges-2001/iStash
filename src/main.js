import Vue from "vue";

import App from "./App.vue";
import "./registerServiceWorker";

import store from "./store";
import router from "./router";

import i18n from "@/plugins/vueI18n";
import vuetify from "@/plugins/vuetify";
import auth from "@/plugins/firebase/auth";

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged((user) => {
  store.dispatch("login", user ? user.uid : null);

  if (!app) {
    app = new Vue({
      store,
      vuetify,
      router,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
