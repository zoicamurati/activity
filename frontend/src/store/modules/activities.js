import apiClient from "../../services/Api";

const activities = {

        namespaced: true,

        state: {
            activities: [],
            status: '',
            message: '',
        },

        getters: {
            getActivities: (state) => state.activities,
            getMessage: (state) => state.message,
            getStatus: (state) => state.status,
        },
        /**
         *
         */
        mutations: {

            SET_ACTIVITIES(state, data) {
                state.activities = data;
            },

            DELETE_ACTIVITIES(state, data) {
                state.activities.splice(data.data.data.id)
            },
            ACTIVITIES_ERROR(state, data) {
                state.message = data.statusText;
                state.status = data.status;
            },
            ADD_ACTIVITY(state, data) {
                state.activities.push(data.data.data)
            },
            ACTIVITIES_SUCCESS(state, data) {
                state.message = data.data.message;
                state.status = data.status;
            }

        },
        /**
         *
         */
        actions: {

            fetchActivities({commit}) {
                apiClient.get('/activities/')
                    .then((data) => commit("SET_ACTIVITIES", data.data))
                    .catch((error) => {

                        commit('ACTIVITIES_ERROR', error.response)
                        console.log(error)
                    });
            },

            deleteActivity: async ({commit, dispatch}, endpoint) => {
                await apiClient.delete(endpoint)
                    .then((data) => {

                        if (data.status == 200) {

                            commit('DELETE_ACTIVITIES', data)
                            commit('ACTIVITIES_SUCCESS', data)
                            dispatch('fetchActivities')

                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        commit('ACTIVITIES_ERROR', error.response)
                    })

            },

            addActivity: async ({commit}, activity) => {
                await apiClient.post('/activities/', activity)
                    .then((data) => {

                            if (data.status == 201) {

                                commit('ADD_ACTIVITY', data)
                                commit('ACTIVITIES_SUCCESS', data)
                            }
                        }
                    )
                    .catch((error) => {
                        console.log(error.response)
                        commit('ACTIVITIES_ERROR', error)
                    });

            }
            ,
            editActivity: async ({commit, dispatch}, activity) => {
                await apiClient.put('/activities/' + activity.id, activity)
                    .then((data) => {

                        if (data.status == 200) {

                            commit('ACTIVITIES_SUCCESS', data)
                            dispatch("fetchActivities")
                        }

                    })
                    .catch((error) => {
                        console.log(error.response)
                        commit('ACTIVITIES_ERROR', error.response)
                    });

            },

            updateStatus: async ({commit, dispatch}, id) => {
                await apiClient.patch('/activities/' + id + '/status')
                    .then((data) => {

                        if (data.status == 200) {

                            commit('ACTIVITIES_SUCCESS', data)
                            dispatch("fetchActivities")
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        commit('ACTIVITIES_ERROR', error.response)
                    });
            }

        },
    }
;
export default activities;

