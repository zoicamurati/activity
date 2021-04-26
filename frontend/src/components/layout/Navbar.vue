<template>
    <v-app-bar clipped-left color="primary" app elevate-on-scroll>
        <v-app-bar-nav-icon color="white" @click.stop="changeDrawer"/>
        <v-toolbar-title style="color: white;">{{ 'Sabicom' }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="white" dark elevation="0" v-bind="attrs" v-on="on" fab small>
                    <v-icon color="primary">mdi-account-details-outline</v-icon>
                </v-btn>
            </template>
            <v-list>

                <v-list-item dense @click="doLogout">
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import {bus} from '../../main.js';

export default {

    name: "Navbar",
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {}
    },
    methods: {
        changeDrawer: function () {
            bus.$emit('changeDrawer', !this.drawer);
        },
        doLogout:  function () {
             this.$root.$store.dispatch('auth/logout') .then(() => {
                 this.$router.push('/login')
             })


        }

    }

}
</script>

<style scoped>

</style>