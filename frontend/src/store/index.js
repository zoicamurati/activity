import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activites: [],
    },
    getters: {
        getActivities: (state) => state.activites,
    }
    mutations: {
        SET_ACTIVITIES(state, activites) {
            state.activites = activites
        },
    },
    actions: {
        fetchActivities({commit}) {
            MovieService.getActivities()
                .then(data => commit('SET_ACTIVITIES', data.data))
        },
    },
    modules: {},
});
