import http from '@/http-common.js';

class MovieService {
    getPopular () {
        return http.get('/movie/popular');
    }

    getNowPlaying () {
        return http.get('/movie/now_playing');
    }

    getDetailMovie (id) {
        return http.get(`/movie/${id}`)
    }
}

export default new MovieService()