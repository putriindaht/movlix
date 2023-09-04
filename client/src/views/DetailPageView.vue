<script>
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '../stores/movies';

export default {
    name: 'detail',
    methods: {
        ...mapActions(useMovieStore, ["fetchDetail"]),
    },
    computed: {
        ...mapState(useMovieStore, ['movie', 'qrCode'])
    },
    created() {
        this.fetchDetail(this.$route.params.id)
    }
}
</script>
<template>
    <div class="flex flex-col p-10">
        <div class="text-8xl mb-1 font-bold">{{ movie.title }}</div>
        <div class="flex mb-1 items-center">
            <div class="mr-5 border-2 rounded-lg px-2">{{ movie.Genre.name }}</div>
            <div class="font-semibold">★ {{ movie.rating }}/10</div>
        </div>
        <div class="flex w-full">
            <div class="flex gap-1 h-80">
                <img :src="movie.imgUrl" alt="">
                <iframe width="560" height="315" :src="movie.trailerUrl" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>

            </div>
            <div class="qrCode">
                <span class="w-full" v-html="qrCode"></span>
            </div>
        </div>
        <div>
            <div class="my-3 w-1/2">
                <div>{{ movie.synopsis }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.qrCode:deep(svg) {
    height: 300px !important;
    width: 300px !important;

}
</style>