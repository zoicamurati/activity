import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routers.store";
import Token from "../services/Token";

Vue.use(VueRouter);

const token = !!localStorage.getItem('user-token')
//const token =  !!Token.getToken();

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!token) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
