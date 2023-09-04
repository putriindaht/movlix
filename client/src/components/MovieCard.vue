<script>
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/movies';


export default {
    props: ['movieData', 'isBookmark'],
    name: "movieCard",
    methods: {
        ...mapActions(useMovieStore, ['addBookmark', 'setIsLogin']),
    },
    computed: {
        ...mapState(useMovieStore, ['isLogin'])
    },
    created() {
        this.setIsLogin()
    }
}
</script>
<template>
    <div
        class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <img class="w-full h-45 rounded-t-xl" :src="movieData.imgUrl" alt="Image Description">
        <div class="p-4 md:p-5 grow">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                {{ movieData.title }}
            </h3>
            <p class="mt-1 text-gray-800 dark:text-gray-400 flex grow text-ellipsis truncate">
                {{ movieData.synopsis }}
            </p>
            <a @click="$router.push({ path: '/detail/' + movieData.id })"
                class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Detail
            </a>
            <a v-if="isLogin && !isBookmark" @click="addBookmark(movieData.id)"
                class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Add to Bookmark
            </a>
        </div>
    </div>
</template>