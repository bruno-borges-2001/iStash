import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

Vuetify.config.silent = process.env.NODE_ENV === "production";

export default new Vuetify({
  icons: { iconfont: "mdi" },
  theme: {
    themes: {
      light: {
        primary: "#303F9F",
        secondary: "#448AFF",
        accent: "#3C6997",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
      dark: {
        primary: "#303F9F",
        secondary: "#448AFF",
        accent: "#3C6997",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
    dark: false,
  },
});
