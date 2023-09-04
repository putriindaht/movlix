<script>
import { mapActions } from 'pinia';
import { useMovieStore } from '../stores/movies';
import { RouterLink } from 'vue-router';

export default {
    name: 'register',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useMovieStore, ['registerCustomer']),
        localRegis() {
            this.registerCustomer(this.email, this.password)
        }
    }
}
</script>
<template>
    <div class="flex items-center h-full bg-white dark:bg-gray-900">
        <div class="container mx-auto">
            <div class="max-w-md mx-auto my-10">
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign Up</h1>
                </div>
                <div class="m-7">
                    <form action="" @submit.prevent="localRegis()">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email
                                Address</label>
                            <input v-model="email" type="email" name="email" id="email" placeholder="you@mail.com"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <label for="password" class="text-sm text-gray-600 dark:text-gray-400 mb-2">Password</label>
                            <input v-model="password" type="password" name="password" id="password"
                                placeholder="Your Password"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <button type="submit"
                                class="w-full px-3 py-4 text-white bg-black rounded-md focus:bg-yellow-400 focus:outline-none">Sign
                                Up</button>
                        </div>
                        <p class="text-sm text-center text-gray-400">Already have an account?<RouterLink to="login"
                                class="text-indigo-400 focus:outline-none focus:underline dark:focus:border-indigo-800">Sign
                                in</RouterLink>.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>