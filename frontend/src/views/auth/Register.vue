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

                                    <v-col cols="12">

                                        <v-text-field outlined v-model="name"  :rules="[rules.required]"
                                                      label="Firstname"></v-text-field>

                                    </v-col>

                                    <v-col cols="12">

                                        <v-text-field outlined v-model="email"  type="email" :rules="[rules.required,rules.email]"
                                                      label="Email"></v-text-field>

                                    </v-col>

                                    <v-col cols="12">

                                        <v-text-field outlined v-model="password"
                                                      label="Password"  :rules="[rules.required,rules.min]"
                                                      :append-icon="show_password_1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                      @click:append="show_password_1 = !show_password_1"
                                                      :type="show_password_1 ? 'text' : 'password'"></v-text-field>

                                    </v-col>

                                    <v-col cols="12">

                                        <v-text-field outlined v-model="password_confirmation" :rules="[rules.required, rules.passwordConfirm]"
                                                      label="Password confirmation"
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

            name: '',

            email: '',

            password: '',

            password_confirmation: '',

            valid: false,

            loading: false,

            show_password_1: false,

            show_password_2: false,

            rules: {


                required: value => !!value || 'required',

                min: v => v.length >= 8 || 'at least 8 characters',

                email: value => {

                    let invalid = false;

                    if (value == '' || value == null) return true;

                    if (/.+@.+/.test(value) == false) {

                        invalid = true;
                    }

                    return !invalid || 'e-mail not valid';

                },


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

                this.doRegister();

            }
        },

        /**
         *
         */
        doRegister: async function () {

            this.loading = true;

            const {email, password,password_confirmation,name} = this

            await this.$root.$store.dispatch('auth/authRequestRegister',{ email, password,password_confirmation,name});

            let status = this.$root.$store.getters['auth/getStatus'];

            let message = this.$root.$store.getters['auth/getMessage'];

            let type = status == 201 ? "success" : 'error';

            if (status == 201) {

                await  this.$router.push("/login");
            }

            this.$notify({type: type, text: message})

            this.loading = true;

}
    },
}
</script>
<style>
.auth-form {
    margin: auto;
    width: 70%;
}
</style>