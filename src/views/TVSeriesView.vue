<script setup>
import CardMovie from '@/components/CardMovie.vue'
import TvSeriesService from '@/services/tv-series.service'
import GenreService from '@/services/genre.service'
import { onMounted, reactive } from 'vue';
import ModalDetailMovie from '@/components/ModalDetailMovie.vue';
import { useWatchlist } from '@/stores/watchlist';

const watchlist = useWatchlist();

const data = reactive({
  isPending: false,
  isDetail: false,
  popularList: [],
  onTheAirList: [],
  tvGenre: [],
  detailData: {},
})

onMounted(async () => {
  data.isPending = true
  const resPopular = await TvSeriesService.getPopular();
  const resOnTheAir = await TvSeriesService.getOnTheAir();
  const resTvSeriesGenre = await GenreService.getAllTvSeriesGenre();

  data.popularList = resPopular.data.results.splice(0, 12);
  data.onTheAirList = resOnTheAir.data.results.splice(0, 12);
  data.tvGenre = resTvSeriesGenre.data.genres;

  data.popularList.map((d) => {
    if (watchlist.tvList.find(el => el.id === d.id)) {
      d.isWatchlist = true
    } else {
      d.isWatchlist = false
    }
    const tempGenre = []
    d.genre_ids.forEach((id) => {
      data.tvGenre.forEach((genre) => {
        if (id === genre.id) {
          tempGenre.push(genre.name)
        }
      })
    })
    d.genre_ids = tempGenre
  })

  data.onTheAirList.map((d) => {
    if (watchlist.tvList.find(el => el.id === d.id)) {
      d.isWatchlist = true
    } else {
      d.isWatchlist = false
    }
    const tempGenre = []
    d.genre_ids.forEach((id) => {
      data.tvGenre.forEach((genre) => {
        if (id === genre.id) {
          tempGenre.push(genre.name)
        }
      })
    })
    d.genre_ids = tempGenre
  })
  data.isPending = false
})

const getDetail = async ({id}) => {
  try {    
      const res = await TvSeriesService.getDetailTvSeries(id)
      data.detailData = res.data
      if (watchlist.tvList.find(el => el.id === data.detailData.id)) {
        data.detailData.isWatchlist = true
      } else {
        data.detailData.isWatchlist = false
      }
      data.isDetail = true
    
  } catch (error) {
    console.log(error)
  }
}

const addOrDeleteWatchList = (show) => {
  if(watchlist.tvList.find(el => el.id === show.id)) {
    data.detailData.isWatchlist = false
    data.popularList.forEach(el => {
      if(el.id === show.id) {
        el.isWatchlist = false
      } 
    })
    data.onTheAirList.forEach(el => {
      if(el.id === show.id) {
        el.isWatchlist = false
      } 
    })
    watchlist.deleteTvSeries(show)
  } else {
    data.detailData.isWatchlist = true
    show.isWatchlist = true
    data.popularList.forEach(el => {
     if(el.id === show.id) {
      el.isWatchlist = true
     } 
    })
    data.onTheAirList.forEach(el => {
     if(el.id === show.id) {
      el.isWatchlist = true
     } 
    })
    watchlist.addTvSeries(show)
  }
}
</script>

<template>
    <div class="max-w-screen-xl mx-auto pt-10 pb-20 flex flex-col gap-10">
      <Transition>
        <ModalDetailMovie v-if="data.isDetail" :data="data.detailData" @close-modal="data.isDetail = false" @add-or-delete-watchlist="addOrDeleteWatchList"/>
      </Transition>
      <div v-if="!data.isPending" class="text-white w-full mx-auto px-5">
          <h2 class="mb-5 text-2xl">
            TV Series Terpopuler
          </h2>
          <div class="grid grid-cols-3 justify-start gap-5">
            <CardMovie v-for="(i, index) in data.popularList" :key="index" :data="i" @get-id-detail="getDetail" @add-or-delete-watchlist="addOrDeleteWatchList"/>
          </div>
      </div>
      <div v-if="!data.isPending" class="text-white w-full mx-auto px-5">
          <h2 class="mb-5 text-2xl">
            On The Air
          </h2>
          <div class="grid grid-cols-3 justify-start gap-5">
            <CardMovie v-for="(i, index) in data.onTheAirList" :key="index" :data="i" @get-id-detail="getDetail" @add-or-delete-watchlist="addOrDeleteWatchList"/>
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
