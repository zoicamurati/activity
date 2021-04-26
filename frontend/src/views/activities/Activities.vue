<template>

    <v-container fluid :loading="loading">

        <v-row>
            <v-col cols="12" md="12">

                <v-toolbar color="elevation-0 v-toolbar-transparent">

                    <v-toolbar-title class="header-title">
                        {{ 'Activities' }}
                    </v-toolbar-title>

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">

                            <v-btn v-on="on" icon :disabled="loading" @click.stop="openActivityModal()">

                                <v-icon>mdi-plus-circle-outline</v-icon>

                            </v-btn>

                        </template>

                        <span>{{ 'Create activity' }}</span>

                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>

                </v-toolbar>
                <v-skeleton-loader :loading="loading" transition="fade-transition" type="table">

                    <v-data-table :headers="headers" :search="search" :items="activities"
                                  loading-text="Loading... Please wait" mobile-breakpoint="0">

                        <template v-slot:item.description="{ item }">

                            <v-tooltip top>

                                <template v-slot:activator="{ on }">

                                <span v-on="on" style="width:300px"
                                      class="d-inline-block text-truncate">{{ item.description }}</span>

                                </template>
                                <span>{{ item.description }}</span>

                            </v-tooltip>
                        </template>

                        <template v-slot:item.status="{ item }">
                            <p>{{ item.status | statusName }}</p>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-menu transition="slide-y-transition" bottom left offset-y>

                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item @click.stop="editActivity(item)">
                                        <v-icon>mdi-pencil-outline</v-icon>
                                        <v-list-item-title>&nbsp;&nbsp;{{ 'Edit' }}</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item link @click="openDeleteModal(item)">
                                        <v-icon>mdi-delete-outline</v-icon>
                                        <v-list-item-title>&nbsp;{{ 'Delete' }}</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link @click="openChangeModal(item)">
                                        <v-icon>mdi-pencil-outline</v-icon>
                                        <v-list-item-title>&nbsp;{{ 'Change status' }}</v-list-item-title>
                                    </v-list-item>

                                </v-list>
                            </v-menu>
                        </template>


                    </v-data-table>

                </v-skeleton-loader>

                <v-dialog v-model="show_status" max-width="500px">

                    <v-card>

                        <v-card-title>

                            <span class="title">Are you sure you want to complete this activity? </span>

                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>

                            <v-spacer></v-spacer>

                            <v-btn text @click="show_status = false"> Cancel</v-btn>

                            <v-btn text @click="updateActivityStatus"> Confirm</v-btn>

                        </v-card-actions>

                    </v-card>

                </v-dialog>


            </v-col>

        </v-row>

        <!-- activity modal !-->
        <activity-form
            :show="activity_dialog"
            :activity-data="selected_activity"
            :onDialogClose="activityFormClose"
        ></activity-form>
        <!-- activity modal end !-->


        <!-- delete modal !-->
        <delete-dialog
            :show="delete_dialog"
            :onDialogClose="deleteModalClose"
            :action="delete_endpoint + '/' + delete_item_id"
            title="Delete Activity"
            text="Are you sure you want to delete this activity!"
            :version="'full'"
        ></delete-dialog>
        <!-- end delete modal !-->

    </v-container>

</template>

<script>
import {mapGetters} from "vuex";
import ActivityForm from "../../components/activities/ActivityForm";
import DeleteDialog from "../../components/utils/DeleteDialog";

export default {
    name: "Activities",
    components: {DeleteDialog, ActivityForm},
    data() {

        return {

            loading: false,

            selected: [],

            search: '',

            headers: [

                {text: 'name', value: 'name', sortable: false, width: '300'},
                {text: 'description', value: 'description', orderable: false, sortable: false, width: '500'},
                {text: 'status', value: 'status', orderable: false, sortable: false},
                {text: '', value: 'actions', orderable: false, sortable: false, width: 15, align: 'right'},

            ],

            delete_endpoint: '/activities',

            delete_item_id: null,

            activity_dialog: false,

            delete_dialog: false,

            selected_activity: null,

            selected_id_to_update: null,

            show_status: false

        }

    },
    computed: {
        ...mapGetters({
            activities: "activities/getActivities",
        }),

    },
    filters: {
        statusName(item) {
            return item == 1 ? "Completed" : "To be completed";
        }
    },
    mounted() {
        this.fetchActivity();
    },

    /**
     *
     */
    methods: {
        /**
         *
         */
        fetchActivity: function () {
            this.$store.dispatch('activities/fetchActivities')
        },
        /**
         *
         */
        openActivityModal: function () {
            this.activity_dialog = true;
        },
        /**
         *
         */
        editActivity: function (item) {
            this.activity_dialog = true;
            this.selected_activity = item
        },
        /**
         *
         */
        activityFormClose: function () {
            this.activity_dialog = false;
            this.selected_activity = null;
        },
        /**
         *
         */
        openDeleteModal: function (item) {
            this.delete_dialog = true;
            this.delete_item_id = item.id;
        },
        /**
         *
         */
        deleteModalClose: function () {
            this.delete_dialog = false;
            this.delete_item_id = null;
        },
        /**
         *
         */
        openChangeModal: function (item) {

            this.show_status = true;
            this.selected_id_to_update = item.id;
        },
        /**
         *
         */
        updateActivityStatus: async function () {
            await this.$store.dispatch('activities/updateStatus', this.selected_id_to_update)

            let status = this.$store.getters['activities/getStatus'];
            let message = this.$store.getters['activities/getMessage'];

            let type = status == 200 ? 'success' : 'error';

            this.$notify({type: type, text: message})
            this.show_status = false;
        }
    },
}
</script>
<style>


</style>