import React, { useEffect, useState } from "react";
import styles from "../DisplayRow/DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import { movies } from "../../Data/Data";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/RequestUrls";
function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRatedMovies: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });
  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    try {
      const [
        trendingResponse,
        netflixOriginalsResponse,
        topRatedMoviesResponse,
        actionResponse,
        comedyResponse,
        horrorResponse,
        romanceResponse,
        documentariesResponse,
      ] = await Promise.all([
        movieInstance.get(requests.fetchTrending),
        movieInstance.get(requests.fetchNetflixOriginals),
        movieInstance.get(requests.fetchTopRatedMovies),
        movieInstance.get(requests.fetchActionMovies),
        movieInstance.get(requests.fetchComedyMovies),
        movieInstance.get(requests.fetchHorrorMovies),
        movieInstance.get(requests.fetchRomanceMovies),
        movieInstance.get(requests.fetchDocumentaries),
      ]);
      setMovies({
        trending: trendingResponse.data.results,
        netflixOriginals: netflixOriginalsResponse.data.results,
        topRatedMovies: topRatedMoviesResponse.data.results,
        action: actionResponse.data.results,
        comedy: comedyResponse.data.results,
        horror: horrorResponse.data.results,
        romance: romanceResponse.data.results,
        documentaries: documentariesResponse.data.results,
      });

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className={styles.displayRowWrapper}>
      <SlideShow title="Netflix Trending" movies={movies.trending} />
      <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
      <SlideShow title="Top Rated Movies" movies={movies.topRatedMovies} />
      <SlideShow title="Action" movies={movies.action} />
    </div>
  );
}

export default DisplayRow;
