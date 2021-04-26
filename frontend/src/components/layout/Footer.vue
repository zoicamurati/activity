<template>
    <v-footer fixed color="primary" >
        <v-row
            justify="center"
            padless
            color="primary"
        >
            <v-col class="text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Activity</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>

</style>