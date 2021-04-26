<template>
    <div>
        <v-form ref="activity_form" v-model="valid">
            <v-dialog persistent eager v-model="localShow" max-width="600px">
                <v-card>
                    <v-toolbar flat dense color="primary">

                        <v-toolbar-title> {{ dialogTitle }}</v-toolbar-title>

                    </v-toolbar>

                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col :cols="12" class="pt-0 pb-0">
                                    <v-text-field
                                        v-model="activity.name"
                                        label="Name"
                                        :rules="[rules.required]"
                                    ></v-text-field>

                                </v-col>

                                <v-col :cols="12" class="pt-0 pb-0">
                                    <v-textarea rows="1" auto-grow clearable v-model="activity.description"
                                                label="Description"></v-textarea>
                                </v-col>

                                <v-col :cols="12" class="pt-0 pb-0" v-if="isNew">
                                    <v-select item-text="text" item-value="value" v-model="activity.status"
                                              :items="activity_status"
                                              label="Status"></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click.stop="defaultOnDialogClose" text>Annulla</v-btn>
                        <v-btn @click="validateService" text class="mr-4" :disabled="valid == false">
                            {{ saveButtonTitle }}
                        </v-btn>


                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "ActivityForm",
    props: {
        activityData: {
            type: Object,
            default: () => ({}),

        },
        closeDialog: {
            type: Function,
            default: function () {
            }
        },
        onDialogClose: {

            type: Function,

            default: function () {
                this.defaultOnDialogClose();
            }
        },
        show: {
            type: Boolean,

            default: function () {
                return false
            },
        },
    },

    data() {
        return {

            localShow: false,

            activity: {},

            rules: {
                required: value => !!value || "Required"
            },

            valid: false,

            activity_status: [

                {'text': 'Completed', value: 1},
                {'text': 'To be Completed', value: 0}

            ],
            isNew: false,


        }
    },

    mounted() {

        if (this.activityData !== null) {
            this.activity = Object.assign({}, this.activityData)
            this.isNew = true;
        }

    },

    watch: {

        activityData: function () {
            if (this.activityData !== null) {
                this.activity = Object.assign({}, this.activityData)
                this.isNew = true;
            }
        },

        show: function () {
            this.localShow = this.show;

        },

        localShow: function () {

            if (this.localShow == false) {
                this.onDialogClose();

            }
        },
    },
    methods: {

        validateService: function () {
            if (this.$refs.activity_form.validate()) {
                if (this.activityData) {
                    this.editActivity('activities/editActivity',200)
                } else {
                    this.editActivity('activities/addActivity',201);
                }

            }
        },

        editActivity: async function (name,statusCode) {
            await this.$store.dispatch(name, this.activity)

            let status = this.$store.getters['activities/getStatus'];
            let message = this.$store.getters['activities/getMessage'];
            let type = status == statusCode ? 'success' : 'error';

            this.$notify({type: type, text: message})

            this.localShow = false;

            this.$refs.activity_form.reset();
        },


        defaultOnDialogClose: function () {
            this.localShow = false;
            this.$refs.activity_form.reset();
        },


    },

    computed: {

        /**
         *
         */
        dialogTitle() {

            return this.activityData !== null ? 'Edit activity' : 'Add activity';

        },

        saveButtonTitle() {

            return this.activityData !== null ? 'Edit' : 'Add';

        }
    },


}
</script>

<style scoped>

</style>
