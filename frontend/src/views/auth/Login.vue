<template>

    <v-container fluid>

        <v-row align-center justify-center>

            <v-col align-self="center" cols="12" sm="6">

                <v-img class="mx-auto" width="50%" contain lazy-src="/logo.png"
                       src="/logo.png"></v-img>

            </v-col>

            <v-col cols="12" sm="6" class="fill-height" style="background: #f2f5f8">

                <div class="auth-container">

                    <v-form ref="form" v-model="valid" class="auth-form">

                        <v-card>

                            <v-card-title class="justify-center display-1 mb-2">{{ 'Welcome' }}</v-card-title>

                            <v-card-subtitle class="text-center"> {{ 'Sign in to your account' }}</v-card-subtitle>

                            <v-card-text>

                                <v-container>

                                    <v-row>

                                        <v-col cols="12">

                                            <v-text-field outlined v-model="email" name="email" type="email"
                                                          label="E-mail"></v-text-field>

                                        </v-col>

                                        <v-col cols="12">

                                            <v-text-field outlined v-model="password" name="password"
                                                          label="Password"
                                                          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                                          @click:append="show_password = !show_password"
                                                          :type="show_password ? 'text' : 'password'"></v-text-field>

                                        </v-col>

                                    </v-row>

                                    <v-btn color="primary" block :loading="loading" :disabled="valid == false"
                                           @click.stop="validate">{{ 'login' }}
                                    </v-btn>

                                    <v-row class="mt-4">

                                        <v-col cols="12" class="text-center">

                                            <!--                                        <router-link to="forgot-password"> {{ 'forgot_password'}}</router-link>-->

                                        </v-col>

                                    </v-row>

                                </v-container>

                            </v-card-text>

                        </v-card>


                        <div class="text-center mt-5">

                            Don't have an account?
                            <router-link to="register">Create one here</router-link>

                        </div>


                    </v-form>
                </div>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
export default {

    data() {

        return {

            email: '',

            password: '',

            valid: false,

            loading: false,

            show_password: false

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

            document.getElementById('form').submit();
        }

    },
}
</script>
<style>
.auth-container {
    display: grid;
    height: 100vh;
}

.auth-form {
    margin: auto
}
</style>