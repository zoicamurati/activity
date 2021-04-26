const menu = {

    namespaced: true,

    state: {
        menu: [
            {
                id: 1,
                title: 'Home',
                path: '/',
                icon: 'mdi-home'
            },
            {
                id: 2,
                title: 'Activities',
                path: '/activities',
                icon: 'mdi-calendar-check-outline'
            },
        ],
    },

    getters: {
        getMenu: (state) => state.menu,
    },

};
export default menu;
