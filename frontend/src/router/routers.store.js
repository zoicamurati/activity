const routes = [
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue"),
        meta: {requiresAuth: false}
    },

    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "auth" */ "../views/auth/Register.vue"),
        meta: {requiresAuth: false}
    },

    {
        path: '/',
        component: () => import('../views/Layout.vue'),
        children: [
            {
                path: '/',
                component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
                meta: {requiresAuth: true}

            },
            {
                path: '/activities',
                component: () => import(/* webpackChunkName: "activities" */ "../views/activities/Activities.vue"),
                meta: {requiresAuth: true}

            }
            ],
        meta: {requiresAuth: true}


    }

];

export default routes;