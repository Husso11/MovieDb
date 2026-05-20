import axios from "axios";

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // Vite uses import.meta.env instead of process.env
    api_key: import.meta.env.VITE_APP_TMDB_KEY,
  },
});

export { movieInstance };