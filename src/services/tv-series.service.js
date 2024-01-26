import http from '@/http-common';

class TvSeriesService {
    getPopular () {
        return http.get('/tv/popular');
    }

    getOnTheAir () {
        return http.get('/tv/on_the_air');
    }

    getDetailTvSeries (id) {
        return http.get(`/tv/${id}`)
    }
}

export default new TvSeriesService()