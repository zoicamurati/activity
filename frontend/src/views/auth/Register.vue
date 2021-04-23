<template>

    <v-container fluid>

        <v-row align-center justify-center>

            <v-col align-self="center" cols="12" sm="6">

                <v-img class="mx-auto" width="50%" contain lazy-src="/logo.png"
                       src="/logo.png"></v-img>

            </v-col>

            <v-col cols="12" sm="6" class="fill-height" style="background: #f2f5f8">

                    <v-form class="auth-form" ref="form" v-model="valid">

                        <v-card>

                            <v-card-title class="justify-center display-1 mb-2">{{
                                    'Create account'
                                }}
                            </v-card-title>

                            <v-card-text>

                                <v-container>

                                    <v-row>

                                        <v-col cols="8" sm="6">
                                            <!--                                        :rules="[$root.rules.required]"-->
                                            <v-text-field outlined v-model="first_name" name="first_name"
                                                          label="Firstname"></v-text-field>

                                        </v-col>

                                        <v-col cols="12" :sm="6">

                                            <v-text-field outlined v-model="last_name" name="last_name"
                                                          label="Last name"></v-text-field>

                                        </v-col>

                                        <v-col cols="12">

                                            <v-text-field outlined v-model="email" name="email" type="email"
                                                          label="Email"></v-text-field>

                                        </v-col>

                                        <v-col cols="12">

                                            <v-text-field outlined v-model="password" name="password"
                                                          label="Password"
                                                          :append-icon="show_password_1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                          @click:append="show_password_1 = !show_password_1"
                                                          :type="show_password_1 ? 'text' : 'password'"></v-text-field>

                                        </v-col>

                                        <v-col cols="12">

                                            <v-text-field outlined v-model="password_confirmation"
                                                          name="password_confirmation" label="Password confirmation"
                                                          :append-icon="show_password_2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                          @click:append="show_password_2 = !show_password_2"
                                                          :type="show_password_2 ? 'text' : 'password'"></v-text-field>

                                        </v-col>

                                    </v-row>

                                    <v-btn block :loading="loading" color="primary" :disabled="valid == false"
                                           @click.stop="validate"> Register
                                    </v-btn>

                                </v-container>
                            </v-card-text>


                        </v-card>

                        <div class="text-center mt-5">

                            Already have an account?
                            <router-link to="login">Sign in</router-link>

                        </div>

                    </v-form>

            </v-col>

        </v-row>

    </v-container>
</template>

<script>
export default {

    data() {

        return {

            first_name: '',

            last_name: '',

            email: '',

            password: '',

            password_confirmation: '',

            valid: false,

            loading: false,

            show_password_1: false,

            show_password_2: false,

            rules: {

                passwordConfirm: value => value == this.password || 'passwords must match',

            }

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
        validate: function () {
            if (this.$refs.form.validate()) {

                this.doLogin();

            }
        },

        /**
         *
         */
        doLogin: function () {
            this.loading = true;

            document.getElementById("form").submit();
        }

    },
}
</script>
<style>
.auth-form {
    margin: auto;
    width:70%;
}
</style>