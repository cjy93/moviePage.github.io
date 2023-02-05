import http from "./http";
// For keeping bearer token 
// https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
const config = {
    headers: { Authorization: `Bearer ${localStorage["token"]}` }
};
// data= body json
class MovieDataService {
    login(data) {
        return http.post(`/login`, data);
    }

    createMovie(data) {
        return http.post(`/movie`, data, config).then(console.log).catch(console.log);
    }

    allMovies() {
        return http.get(`/movieforApp`);
    }

    updateMovie(data, index) {
        return http.put(`movie/${index}`, data, config).then(console.log).catch(console.log);
    }

    deleteMovie(index) {
        return http.delete(`movie/${index}`, config).then(console.log).catch(console.log);
    }

    createUser(data) {
        return http.post(`/userAdd`, data);
    }


}

export default new MovieDataService();