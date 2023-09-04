<script>
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/movies';
import { RouterLink, RouterView } from 'vue-router'
export default {
    methods: {
        ...mapActions(useMovieStore, ["handleLogout", "setIsLogin", "fetchMovies"]),
        localLogout() {
            this.handleLogout()
            this.$router.push('/login')
        }
    },
    computed: {
        ...mapState(useMovieStore, ['isLogin'])
    },
    data() {
        return {
            title: ''
        }
    },
    created() {
        this.setIsLogin()
    }
}

</script>

<template>
    <header class="bg-black" style="position: fixed; width: 100%;">
        <nav class="flex text-white justify-between items-center h-12">
            <div class="p-10 font-bold flex-1">Movflix</div>
            <div class="flex-2">
                <ul class="flex justify-between">
                    <li class="p-3">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink to="/bookmark">Bookmark</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="flex-1 ml-10 mr-10">
                <form class="flex gap-3" @submit.prevent="fetchMovies(undefined, this.title)"
                    v-if="$route.name !== 'bookmark'">
                    <input class="bg-gray-500 text-white rounded-md px-3" type="text" placeholder="search by title...."
                        v-model="title">
                    <button class="bg-gray-700 text-white rounded-md px-5">Search</button>
                </form>
            </div>
            <div class=" mr-10">
                <RouterLink class="bg-black text-yellow-400 rounded-md w-100" v-if="isLogin === false" to="/login">Sign In
                </RouterLink>
                <button class="bg-black text-yellow-400 rounded-md w-full" v-if="isLogin" @click="localLogout">Sign
                    Out</button>
            </div>
        </nav>
    </header>
</template>
