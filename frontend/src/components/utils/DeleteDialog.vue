<template>

    <v-dialog v-model="dialog" persistent :width="width">

        <v-card>

            <v-card-title class="headline"> {{ modalTitle }}</v-card-title>

            <v-card-text> {{ bodyText }}</v-card-text>

            <v-card-actions>

                <v-spacer></v-spacer>

                <v-btn text @click="dialog = false"> {{ 'cancel' }}</v-btn>

                <v-btn color="red" text @click="doAction"> {{ 'delete' }}</v-btn>

            </v-card-actions>

        </v-card>

    </v-dialog>

</template>


<script>

export default {


    props: {
        /**
         *
         */
        show: {

            type: Boolean,
            default: function () {
                return true
            },
        },
        title: {

            type: String,
            default: 'delete'
        },

        /**
         *
         */
        text: {
            type: String,
            default: "Are you sure you want to delete?"
        },

        /**
         *
         */
        actionResponseMessage: {
            type: String,
            default: 'Entity deleted'
        },

        /**
         *
         */
        width: {
            type: String,
            default: '400'
        },

        /**
         *
         */
        tooltip: {
            type: String,
            default: ''
        },

        /**
         *
         */
        action: {
            type: String,
            default: '/'
        },

        /**
         *
         */
        method: {
            type: String,
            default: 'delete',
        },
        /**
         *
         */
        onDialogClose: {

            type: Function,

            default: function () {
                this.defaultOnDialogClose();
            }
        },

    },


    /**
     *
     */
    data() {

        return {

            dialog: false,

        }
    },

    /**
     *
     */
    mounted() {


    },

    /**
     *
     */


    watch: {

        /**
         *
         */
        show: function () {
            this.dialog = this.show;
        },

        /**
         *
         */
        dialog: function () {

            if (this.dialog == false) {
                this.onDialogClose();
            }
        },

    },

    /**
     *
     */
    computed: {

        /**
         *
         */
        tooltipLabel: function () {
            return this.tooltip == '' ? 'delete' : this.tooltip;
        },

        /**
         *
         */
        modalTitle: function () {
            return this.title == 'delete' ? 'delete' : this.title;
        },

        /**
         *
         */
        bodyText: function () {
            return this.text == 'Are you sure you want to delete?' ? 'Are you sure want to delete' : this.text;
        }
    },

    /**
     *
     */
    methods: {

        /**
         *
         */
        doAction: async function () {

            await this.$store.dispatch('activities/deleteActivity', this.action)

            let status = this.$store.getters['activities/getStatus'];
            let message = this.$store.getters['activities/getMessage'];
            let type = status == 200 ? 'success' : 'error';

            this.$notify({type: type, text: message})

            this.dialog = false

        },


    }

}
</script>