<template>

    <v-container fluid :loading="loading">

        <v-row>
            <v-col cols="12" md="12">

                <v-toolbar color="elevation-0 v-toolbar-transparent">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">

                            <v-btn v-on="on" icon :disabled="loading" @click.stop="openActivityModal()">

                                <v-icon class="colored">mdi-plus-circle-outline</v-icon>

                            </v-btn>

                        </template>

                        <span>{{ 'Create activity' }}</span>

                    </v-tooltip>

                    <v-tooltip bottom v-if="selected.length > 0">

                        <template v-slot:activator="{ on }" icon>

                            <!--                            <delete-modal
                                                            v-on="on" v-if="selectedIds !== null" :disabled="loading"
                                                            :show="delete_dialog"
                                                            :onDialogClose="deleteModalClose"
                                                            :action="delete_multiple+'/'+JSON.stringify(selectedIds)"
                                                            :title="$t('delete_tags')"
                                                            @callback="removeTags(selectedIds)"
                                                            @selected-ids="detachSelected($event)"
                                                            :text="$t('delete_this_tags')"
                                                            :version="'light'"
                                                            :custom_style="'margin-left: 15px;'"
                                                        ></delete-modal>-->
                        </template>

                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>

                </v-toolbar>

                <v-skeleton-loader :loading="loading" transition="fade-transition" type="table">

                    <v-data-table v-model="selected" :headers="headers" :search="local_search" :items="tags"
                                  class="elevation-1"
                                  show-select loading-text="Loading... Please wait" mobile-breakpoint="0">

                        <!--                        <template v-slot:item.relation_models="{ item }">
                                                    <p>{{ item.relation_models | modelRelations }}</p>
                                                </template>-->

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
                                        <v-list-item-title>&nbsp;&nbsp;{{ 'edit' }}</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item link @click="openDeleteModal(item)">
                                        <v-icon>mdi-delete-outline</v-icon>
                                        <v-list-item-title>&nbsp;{{ 'delete' }}</v-list-item-title>
                                    </v-list-item>

                                </v-list>
                            </v-menu>
                        </template>


                    </v-data-table>

                </v-skeleton-loader>

            </v-col>

        </v-row>

        <!-- tags modal !-->
        <!--        <tags-form
                    :show="tags_dialog"
                    :onDialogClose="tagFormClose"
                    @add-tag="getCurrentTag($event)"
                    :tag="selected_tag"
                    :onUpdateCallback="fetchTags"

                ></tags-form>-->
        <!-- tags modal end !-->

        <!-- delete modal !-->
        <!--        <delete-modal
                    :show="delete_dialog"
                    :onDialogClose="deleteModalClose"
                    :action="delete_endpoint + '/' + delete_item_id"
                    @callback="removeTags(delete_item_id)"
                    :title="$t('delete_tag')"
                    :text="$t('delete_this_tag')"
                    :version="'full'"
                ></delete-modal>-->


    </v-container>

</template>

<script>
export default {

    data() {

        return {

            loading: false,

            selected: [],

            selectedIds: [],

            local_search: '',

            activities: [],

            headers: [

                {text: 'name', value: 'name', sortable: false, width: '200'},
                {text: 'description', value: 'description', orderable: false, sortable: false},
                {text: 'status', value: 'status', orderable: false, sortable: false},
                {text: '', value: 'actions', orderable: false, sortable: false, width: 15, align: 'right'},

            ],

            delete_multiple: '/api/tags/delete-selected',

            delete_endpoint: '/api/activites/delete',

            activity_dialog: false,

            delete_dialog: false,

            delete_item_id: null,

            selected_activity: null,

        }

    },

    mounted() {

    },

    /**
     *
     */
    methods: {
        /**
         *
         */
        fetchActivity:function (){

        },
        /**
         *
         */
        openActivityModal: function () {

        },
        /**
         *
         */
        editActivity: function () {

        },
        /**
         *
         */
        openDeleteModal: function () {

        }
    },
}
</script>
<style>

</style>