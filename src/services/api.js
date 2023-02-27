import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da API: movie/now_playing?api_key=dc009c9dbe6d93a1683882818ba69ec4&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;