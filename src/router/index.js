import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/plugins/firebase/auth";

import {
  Home,
  Notification,
  Login,
  SignUp,
  StashesList,
  CreateStash,
  Stash,
  NotLogged,
} from "@/views";

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
    component: StashesList,
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
    path: "/notifications",
    name: "notifications",
    component: Notification,
    meta: {
      requiresAuth: true,
      backRoute: "$back",
      drawerPage: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      backRoute: "/index",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      backRoute: "/index",
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
