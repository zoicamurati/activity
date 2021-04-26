<template>
    <v-app>
        <notifications style="margin-top: 50px"/>

        <router-view :key="$route.fullPath"></router-view>
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
