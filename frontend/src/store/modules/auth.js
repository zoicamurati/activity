import apiClient from "../../services/Api";
import Token from "../../services/Token";

const auth = {

    namespaced: true,

    state: {
        me: {},
        authenticated: false,
        status: null,
        message: '',
    },

    getters: {
        getMessage: (state) => state.message,
        getStatus: (state) => state.status,
        getUser: (state) => state.me.name,
    },

    mutations: {
        AUTH_REQUEST(state) {
            state.me = {}
            state.authenticated = false
            state.status = 404
            state.message = ""
        },
        AUTH_USER_OK(state, data) {
            state.me = data.data.user
            state.authenticated = true
            state.status = data.status
            state.message = "You got logged in!"
        },
        LOGIN_ERROR(state, data) {
            state.me = {}
            state.authenticated = false
            state.status = data.status
            state.message = data.message
        },

        AUTH_USER_LOGOUT(state) {
            state.me = {}
            state.authenticated = false
        },

        REGISTER_OK(state, data) {
            state.status = data.status
            state.message = data.data.message
        }
    },
    /**
     *
     */
    actions: {
        /**
         *
         * @param commit
         */

        authRequest: async ({commit}, formData) => {

            commit("AUTH_REQUEST")

            await apiClient.post('login', formData)
                .then(response => {

                    if (response.status == 200) {

                        const token = response.data.access_token

                        commit("AUTH_USER_OK", response)


                        if (token) {
                            //Token.setToken(token,response.data.expires_in)
                            localStorage.setItem('user-token', token)
                            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        }
                    }

                })
                .catch(error => {

                    console.log(error.response)

                    commit('LOGIN_ERROR', error)

                })

        },

        logout: ({commit}) => {

            Token.removeToken();

            commit('AUTH_USER_LOGOUT')

        },

        authRequestRegister: async ({commit}, formData) => {

            commit("AUTH_REQUEST")

            await apiClient.post('register', formData)

                .then(response => {

                    commit('REGISTER_OK', response)
                })
                .catch(error => {

                    console.log(error.response)

                    commit('LOGIN_ERROR', error)

                })
        }
    }
}
export default auth;

