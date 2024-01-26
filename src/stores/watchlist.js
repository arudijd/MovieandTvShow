import { defineStore } from "pinia";

export const useWatchlist = defineStore("watchlist", {
    state: () => ({
        movieList: [],
        tvList: []
    }),
    persist: true,
    actions: {
        addMovie (data) {
            this.movieList.push(data);
        },
        deleteMovie (data) {
            let index = 0
            this.movieList.forEach((movie, i) => {
                if (movie.id === data.id) {
                    index = i
                } 
            })
            this.movieList.splice(index, 1)
        },
        addTvSeries (data) {
            this.tvList.push(data);
        },
        deleteTvSeries (data) {
            let index = 0
            this.tvList.forEach((movie, i) => {
                if (movie.id === data.id) {
                    index = i
                } 
            })
            this.tvList.splice(index, 1)
        }
    }
})