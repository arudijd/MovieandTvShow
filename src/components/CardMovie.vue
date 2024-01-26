<template>
    <div class="group bg-zinc-900 relative h-[12vw]">
        <img :src="`https://image.tmdb.org/t/p/w500${props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path}`" alt="backdrop" class="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]">
        <span v-if="props.data.vote_average > 8 && props.data.vote_count > 1000" class="bg-red-500 text-xs font-semibold absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-white group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 transition duration-100">
            Recommended
        </span>
        <div class="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100">
            <span v-if="props.data.vote_average > 8 && props.data.vote_count > 1000" class="bg-red-500 text-xs font-semibold absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-white delay-300 transition duration-100">
                Recommended
            </span>
            <img :src="`https://image.tmdb.org/t/p/w500${props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path}`" alt="backdrop" class="cursor-pointer object-cover transition duration rounded-t-md w-full h-[12vw]">
            <div class="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                <div class="flex flex-row gap-5 items-center mb-5">
                    <button class="w-8 h-8 border border-white flex items-center justify-center rounded-full" @click="$emit('add-or-delete-watchlist', props.data, props.data.title ? 'movie' : 'tv-series')">
                        <Icon :icon="props.data.isWatchlist ? 'material-symbols:check' : 'ic:outline-plus'" />
                    </button>
                    <button class="w-8 h-8 border border-white flex items-center justify-center rounded-full" @click="$emit('get-id-detail', {id :props.data.id, type: props.data.title ? 'movie' : 'tv-series'})">
                        <Icon icon="ri:info-i" />
                    </button>
                </div>
                <p>
                    {{ props.data.title ? props.data.title : props.data.name }}
                </p>
                <div class="flex flex-col gap-3 mt-5">
                    <p class="text-green-500 font-semibold text-xl">
                        {{ Math.round(props.data.vote_average) }}/10
                    </p>
                </div>
                <p class="text-xs">
                    {{ props.data.genre_ids.length > 0 ? props.data.genre_ids.toString().replace(/,/g, ', ') : '' }}
                </p>
            </div>
        </div>

        <!-- <div class="w-60 h-32 rounded-lg overflow-clip flex flex-col relative group-hover:opacity-0 opacity-100 transition-opacity">
            <span v-if="props.data.vote_average > 8 && props.data.vote_count > 1000" class="bg-red-500 text-xs font-semibold absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-white">
                Recommended
            </span>
            <img :src="`https://image.tmdb.org/t/p/w500${props.data.backdrop_path}`" alt="" class="w-full h-full object-cover shrink-0">
        </div>
        <div class="absolute top-0 z-40 group-hover:opacity-100 group-hover:translate-x-[2vw] group-hover:-translate-y-[6vw] opacity-0 w-72 h-[12vw] transition-opacity">
            <img :src="`https://image.tmdb.org/t/p/w500${props.data.backdrop_path}`" alt="" class="w-full h-full object-cover shrink-0">
        </div> -->
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    }
});
</script>