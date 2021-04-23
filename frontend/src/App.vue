<template>
    <v-app>
        <v-app>
            <v-fade-transition hide-on-leave="true">
                <router-view></router-view>
            </v-fade-transition>
        </v-app>
    </v-app>
</template>

<script>


export default {
    name: "App",

    data: () => ({
        //
    }),
};
</script>
