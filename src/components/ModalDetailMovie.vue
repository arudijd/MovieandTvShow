<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    }
})


</script>

<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 flex z-50 justify-center bg-[#101010da] overflow-y-auto overscroll-contain" @click="$emit('close-modal')">
      <div class="relative text-center bg-zinc-900 h-fit w-full md:w-3/5 my-16 rounded-lg overflow-clip" @click.stop>
        <button class="w-10 h-10 text-white p-2 bg-black rounded-full absolute right-5 top-5 z-20" @click="$emit('close-modal')">
          <Icon icon="material-symbols:close" class="mx-auto" />
        </button>
        <div class="w-full bg-cover text-white relative z-10 min-h-screen">
            <img :src="`https://image.tmdb.org/t/p/original${props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path}`" alt="Backdrop" class="absolute top-0 right-0 w-full z-0 h-[28rem] object-cover">
            <div class="h-[28rem] relative z-10 bg-gradient-to-b from-transparent to-zinc-900 w-full p-10 flex flex-col gap-5 justify-end items-start">
                <h1 class="text-white text-4xl">
                    {{ props.data.title ? props.data.title : props.data.name }}
                </h1>
                <h2 class="text-white text-base italic">
                    {{ props.data.tagline }}
                </h2>
                <button class="w-8 h-8 border border-white flex items-center justify-center rounded-full" @click="$emit('add-or-delete-watchlist', props.data, props.data.title ? 'movie' : 'tv-series')">
                    <Icon :icon="props.data.isWatchlist ? 'material-symbols:check' : 'ic:outline-plus'" />
                </button>
            </div>
            <div class="grid grid-cols-6 gap-5 px-10">
                <div class="col-span-4 flex flex-col gap-3 justify-start items-start">
                    <div class="flex flex-row gap-3 items-center text-sm">
                        <p class="text-green-600 text-3xl">
                            {{ Math.round(props.data.vote_average) }}/10
                        </p>
                        <p>
                            {{ props.data.release_date ?  $dayjs(props.data.release_date).format('YYYY') : $dayjs(props.data.first_air_date).format('YYYY') }}
                        </p>
                    </div>
                    <p class="text-left text-sm">
                        {{ props.data.overview }}
                    </p>
                </div>
                <div class="col-span-2 flex flex-col gap-3 justify-start items-start">
                    <div class="flex flex-col gap-2 text-sm">
                        <p>
                            <span class="text-zinc-500">Genre:</span> {{ props.data.genres.map(genre => genre.name).join(', ') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>