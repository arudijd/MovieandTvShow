import http from '@/http-common';

class SearchService {
    getSearch (query) {
        return http.get(`/search/multi?query=${query}&include_adult=false`)
    }
}

export default new SearchService()