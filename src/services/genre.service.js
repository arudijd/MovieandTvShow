import http from '@/http-common';

class GenreService {
    getAllMovieGenre () {
        return http.get('/genre/movie/list')
    }

    getAllTvSeriesGenre () {
        return http.get('/genre/tv/list')
    }
}

export default new GenreService()