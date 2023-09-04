<script>
import { useMovieStore } from "../stores/movies"
import { mapActions, mapState } from 'pinia';
import MovieCard from '../components/MovieCard.vue';
export default {
    name: "home",
    computed: {
        ...mapState(useMovieStore, ["movies", "totalPage"])
    },
    methods: {
        ...mapActions(useMovieStore, ["fetchMovies", "handlePagination", "addBookmark"]),
        localFetch(page) {
            this.fetchMovies(page)
        }
    },
    async created() {
        await this.fetchMovies()
    },
    components: {
        MovieCard
    }
}
</script>
<template>
    <div class="grid grid-cols-5 gap-12 p-12">
        <MovieCard v-for="movie in movies" :key="movie.id" :movieData="movie" :isBookmark="false" />
    </div>

    <div class="flex justify-center gap-3">
        <div>Page:</div>
        <div v-for="i in totalPage">
            <a href="" :key="i" @click.prevent="localFetch(i)">{{ i }}</a>
        </div>
    </div>
</template>