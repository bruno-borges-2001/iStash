import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/plugins/firebase/auth";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import MyStashes from "@/views/MyStashes.vue";
import CreateStash from "@/views/CreateStash.vue";
import Stash from "@/views/Stash.vue";
import NotLogged from "@/views/NotLogged.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/index",
    name: "index",
    component: NotLogged,
  },
  {
    path: "/stashes",
    name: "stashes",
    component: MyStashes,
    meta: {
      requiresAuth: true,
      backRoute: "/",
    },
  },
  {
    path: "/stash/:id",
    name: "stash",
    component: Stash,
    props: true,
    meta: {
      requiresAuth: true,
      backRoute: "/stashes",
    },
  },
  {
    path: "/create",
    name: "create",
    component: CreateStash,
    meta: {
      requiresAuth: true,
      backRoute: "/stashes",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      backRoute: "/",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      backRoute: "/",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/index");
  } else {
    next();
  }
});

export default router;
