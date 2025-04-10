<template>
    <div>
        <Notification :message="notificationMessage" :type="notificationType" @clear="notificationMessage = ''" />
    <div class="row justify-content-center"> 
    <div class="col-lg-7">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
            <div class="card-header">
                <h3 class="text-center font-weight-light my-4">Create Account</h3>
            </div>
            <div class="card-body">
                <form @submit.prevent="register">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3 mb-md-0">
                                <input class="form-control" id="inputFirstName" type="text"
                                    placeholder="Enter your first name" />
                                <label for="inputFirstName">First name</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input class="form-control" id="inputLastName" type="text"
                                    placeholder="Enter your last name" />
                                <label for="inputLastName">Last name</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="email" class="form-control" id="inputEmail" type="email" placeholder="name@example.com" required/>
                        <label for="inputEmail">Email address</label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3 mb-md-0">
                                <input v-model="password" class="form-control" id="inputPassword" type="password"
                                    placeholder="Create a password" required/>
                                <label for="inputPassword">Password</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3 mb-md-0">
                                <input v-model="confirmPassword" class="form-control" id="inputPasswordConfirm" type="password"
                                    placeholder="Confirm password" required/>
                                <label for="inputPasswordConfirm">Confirm Password</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 mb-0">
                        <div class="d-grid"><button class="btn btn-primary btn-block" type="submit" :disabled="isLoading">Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-footer text-center py-3">
                <div class="small"><a href="login">Have an account? Go to login</a></div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>


<script>
import  axios  from "axios";
import Notification from "@/components/Notification.vue";

export default {
    components: {
        Notification
    },
    data() {
        return {
            // other fields
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            isLoading: false,
        }
    },
    methods: {
        async register() {
            this.isLoading = true;
            this.error = '';

            if (this.password !== this.confirmPassword) {
                this.notificationMessage = 'Passwords do not match.';
                this.notificationType = 'Error';
                this.isLoading = false;
                return;
            }

            if (this.password.length < 8 || this.password.search(/[!@#$%^&*(),.?":{}|<>]/) === -1) {
                this.notificationMessage = 'Password must be at least 8 characters long and contain at least one special character.';
                this.notificationType = 'Error';
                this.isLoading = false;
                return;
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/register`,
                    {
                        // other fields
                        email: this.email,
                        password: this.password
                    }
                );

                this.$router.push('/auth/login');

                this.notificationMessage = 'Registration Successful';
                this.notificationType = 'Success';

            } catch (error) {
                // add some exception
                this.notificationMessage = 'An error occurred during registration.';
                this.notificationType = 'Error';
                this.isLoading = false;
            }
        }
    }
}
</script>