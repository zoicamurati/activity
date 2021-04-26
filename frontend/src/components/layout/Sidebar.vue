<template>
    <v-navigation-drawer left app clipped v-model="localDrawer">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Subicom
                </v-list-item-title>
                <v-list-item-subtitle>
                    activity
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
                v-for="item in menu"
                :key="item.id"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                 <RouterLink :to="{ path: item.path }"><v-list-item-title >{{ item.title }}</v-list-item-title></RouterLink>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import {mapGetters} from 'vuex';
import {bus} from '../../main.js';

export default {
    name: "Sidebar",

    prop: {
        drawer: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            mini: true,
            localDrawer: false,
        }
    },
    created() {
        bus.$on('changeDrawer', (data) => {
            this.localDrawer = data;
        })
    },
    computed: {
        ...mapGetters({
            menu: "menu/getMenu"
        }),
    },
}
</script>

<style scoped>

</style>
