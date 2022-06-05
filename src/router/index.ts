import Vue from "vue";
import VueRouter from "vue-router";

import auth from "../plugins/firebase/auth";

import {
  Notification,
  Changes,
  Login,
  SignUp,
  StashesList,
  CreateStash,
  Stash,
  NotLogged,
} from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: StashesList,
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
    path: "/stash/:id",
    name: "stash",
    component: Stash,
    props: true,
    meta: {
      requiresAuth: true,
      backRoute: "/",
    },
  },
  {
    path: "/create",
    name: "create",
    component: CreateStash,
    meta: {
      requiresAuth: true,
      backRoute: "/",
    },
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notification,
    meta: {
      requiresAuth: true,
      backRoute: "$back",
    },
  },
  {
    path: "/changes",
    name: "changes",
    component: Changes,
    meta: {
      requiresAuth: true,
      backRoute: "$back",
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
  base: ".",
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
