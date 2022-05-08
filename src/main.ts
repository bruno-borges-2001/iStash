import Vue from "vue";
import Notifications from "vue-notification";
import velocity from "velocity-animate";

import App from "./App.vue";

import store from "./store";
import router from "./router";

import i18n from "./plugins/vueI18n";
import vuetify from "./plugins/vuetify";
import auth from "./plugins/firebase/auth";

Vue.config.productionTip = false;

Vue.use(Notifications, { velocity });

let app: any;

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

    window.addEventListener("beforeunload", () => {
      app.$destroy();
    });
  }
});
