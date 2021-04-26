<template>

    <v-app>
        <v-main class="grey lighten-3">

            <v-container>

                <v-row>

                    <v-col>
                        <Navbar :drawer="drawer"></Navbar>

                        <Sidebar :drawer="drawer"></Sidebar>

                        <v-fade-transition leave-absolute>

                            <router-view :key="$route.fullPath"></router-view>

                        </v-fade-transition>

                        <Footer></Footer>

                    </v-col>
                </v-row>

            </v-container>

        </v-main>

    </v-app>

</template>

<script>

import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import {bus} from "../main";


export default {
    name: "Layout",
    components: {Navbar, Sidebar, Footer},
    data: () => ({
        drawer: false,
    }),

    created() {
        bus.$on('changeDrawer', (data) => {
            console.log(data)
            this.drawer = data;
        })
    }
}
</script>

<style scoped>

</style>
