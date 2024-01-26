<template>
    <div class="h-20 bg-transparent">
        <div class="h-full max-w-screen-xl mx-auto flex flex-row justify-between text-white py-4 px-5">
            <div class="flex flex-row gap-10 items-center">
                <RouterLink to="/" class="h-full">
                    <img src="@/assets/img/logo.png" alt="Logo" class="h-full">
                </RouterLink>
                <div class="flex flex-row gap-5 items-center">
                    <RouterLink to='/movie' class="font-medium">
                        Movies
                    </RouterLink>
                    <RouterLink to='/tv-series' class="font-medium">
                        TV Series
                    </RouterLink>
                    <RouterLink to="/watchlist" class="font-medium">
                        Watchlist
                    </RouterLink>
                </div>
            </div>
            <div class="flex flex-row gap-5 items-center">
                <div class="relative">
                    <Icon icon="material-symbols-light:search" class="h-8 w-8 absolute top-1/2 -translate-y-1/2 left-1"/>
                    <input v-model="data.searchQuery" type="text" class="border border-white bg-zinc-900 h-9 w-52 pl-10">
                </div>
                <Icon icon="clarity:notification-line" class="h-7 w-7" />
                <Icon icon="ph:user-light" class="h-7 w-7" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const data = reactive({
    searchQuery: '',
    searchState: false
})


watch( () => route.query, () => {
    if (!route.query.query) {
        data.searchQuery = ''
    }
})

watch( () => data.searchQuery, () => {
    if (data.searchQuery.length > 0) {
        router.push(`/search?query=${data.searchQuery}`)
    } else if (data.searchQuery.length === 0 && route.name === 'search') {
        router.push('/')
    }
} )


</script>
