<template>
    <div>Welcome {{ name }}</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Home",
    computed: {
        ...mapGetters({
            name: "auth/getUser",
        }),

    },

}
</script>

<style scoped>

</style>