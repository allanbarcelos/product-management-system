<template>
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Login</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-floating mb-3">
                            <input v-model="email" class="form-control" id="inputEmail" type="email" placeholder="name@example.com" required/>
                            <label for="inputEmail">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input v-model="password" class="form-control" id="inputPassword" type="password" placeholder="Password" required/>
                            <label for="inputPassword">Password</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a class="small" href="password">Forgot Password?</a>
                            <button class="btn btn-primary" type="submit" :disabled="isLoading">Login</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-center py-3">
                    <div class="small"><a href="register">Need an account? Sign up!</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  axios  from "axios";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            error: ''
        }
    },
    methods: {
        async login() {
            this.isLoading = true;
            this.error = '';

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/login`,
                    {
                        email: this.email,
                        password: this.password
                    }
                );

                const token = response.data.token;
                const user = response?.data?.user;

                // We need role details from the server as on the frontend side i need to check based upon the role details.
                // assuming i get one object with two properties in it one toke and user details like role etc..

                localStorage.setItem('token', token);
                localStorage.setItem('user', user);

                this.$router.push('/');

            } catch (error) {
                
            }
        }
    }
}
</script>