<script>
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/movies';
import MovieCard from '../components/MovieCard.vue'

export default {
    methods: {
        ...mapActions(useMovieStore, ['fetchBookmark'])
    },
    computed: {
        ...mapState(useMovieStore, ['bookmarks'])
    },
    components: {
        MovieCard
    },
    created() {
        this.fetchBookmark()
    }
}
</script>
<template>
    <div class="flex flex-col p-10">
        <h1 class="text-3xl mb-1 font-bold">My bookmarks</h1>
        <div class="grid grid-cols-5 gap-12 p-12">
            <MovieCard v-for="bookmark in bookmarks" :key="bookmark.id" :movieData="bookmark" :isBookmark="true" />
        </div>

    </div>
</template>