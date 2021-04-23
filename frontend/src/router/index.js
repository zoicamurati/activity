import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
        import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue")
  },

{
    path: "/login",
    name: "Login",
    component: () =>
        import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue")
  },

  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/auth/Register.vue")

  },
  {
    path: "/activites",
    name: "Activites",
    component: () =>
      import(/* webpackChunkName: "activites" */ "../views/activities/Activities.vue")

  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
