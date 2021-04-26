import Vue from "vue";
import Vuex from "vuex";
import activities from "./modules/activities.js";
import menu from "./modules/menu.js"
import auth from "./modules/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        menu,
        activities,
        auth,
    },
});
