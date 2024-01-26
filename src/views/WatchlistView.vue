<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import CardMovie from '@/components/CardMovie.vue'
import MovieService from '@/services/movie.service'
import TvSeriesService from '@/services/tv-series.service'
import { onMounted, reactive } from 'vue';
import ModalDetailMovie from '@/components/ModalDetailMovie.vue';
import { useWatchlist } from '@/stores/watchlist';
import { Icon } from '@iconify/vue'

const watchlist = useWatchlist();

const data = reactive({
  isPending: false,
  isDetail: false,
  movieList: [],
  tvList: [],
  movieGenre: [],
  tvGenre: [],
  detailData: {},
})

onMounted(async () => {
  data.isPending = true
  data.movieList = watchlist.movieList
  data.tvList = watchlist.tvList
  data.isPending = false
})

const getDetail = async ({id, type}) => {
  try {
    if(type === 'movie') {
      const res = await MovieService.getDetailMovie(id)
      data.detailData = res.data
      data.isDetail = true
    } else {
      const res = await TvSeriesService.getDetailTvSeries(id)
      data.detailData = res.data
      data.isDetail = true
    }
  } catch (error) {
    console.log(error)
  }
}

const addOrDeleteWatchList = (show, type) => {
  if(type === 'movie') {
    if(watchlist.movieList.find(el => el.id === show.id)) {
      watchlist.deleteMovie(show)
    } else {
      watchlist.addMovie(show)
    }
  } else {
    if(watchlist.tvList.find(el => el.id === show.id)) {
      watchlist.deleteTvSeries(show)
    } else {
      watchlist.addTvSeries(show)
    }
  }
}
</script>

<template>
    <div class="max-w-screen-xl mx-auto pt-10 pb-20 flex flex-col gap-10">
      <Transition>
        <ModalDetailMovie v-if="data.isDetail" :data="data.detailData" @close-modal="data.isDetail = false"/>
      </Transition>
      <div v-if="!data.isPending" class="text-white w-full mx-auto px-5">
        <h2 class="mb-5 text-2xl">
          Watchlist Film Kamu
        </h2>
        <div v-if="data.movieList.length > 0" class="grid grid-cols-3 justify-start gap-5">
          <CardMovie v-for="(i, index) in data.movieList" :key="index" :data="i" @get-id-detail="getDetail" @add-or-delete-watchlist="addOrDeleteWatchList"/>
        </div>
        <div v-else class="flex flex-col gap-5 justify-center items-center w-full text-white">
          <Icon icon="material-symbols:sentiment-sad" class="w-20 h-20" />
          <p>
            Data Tidak Ada!
          </p>
        </div>

      </div>
      <div v-if="!data.isPending" class="text-white w-full mx-auto px-5">
          <h2 class="mb-5 text-2xl">
            Watchlist TV Series Kamu
          </h2>
          <div v-if="data.tvList.length > 0" class="grid grid-cols-3 justify-start gap-5">
            <CardMovie v-for="(i, index) in data.tvList" :key="index" :data="i" @get-id-detail="getDetail" @add-or-delete-watchlist="addOrDeleteWatchList"/>
          </div>
          <div v-else class="flex flex-col gap-5 justify-center items-center w-full text-white">
            <Icon icon="material-symbols:sentiment-sad" class="w-20 h-20" />
            <p>
              Data Tidak Ada!
            </p>
          </div>
      </div>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
