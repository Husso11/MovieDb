import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import netflixBannerImage from "../../assets/image/logo.png";
import { Play, Info } from "lucide-react";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/RequestUrls";
const BANNER_BASE = "https://image.tmdb.org/t/p/original/";
function Banner() {
  const [bannerImage, setBannerImage] = useState({});
  useEffect(() => {
    async function fetchBannerImage() {
      const response = await movieInstance.get(
        "" + requests.fetchNetflixOriginals,
      );
      setBannerImage(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ],
      );
    }
    fetchBannerImage();
  }, []);
  function truncateString(str, num) {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  }
  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BANNER_BASE}${bannerImage?.backdrop_path})`,
      }}
    >
      <div className={styles.contents}>
        {/* netflix image */}
        <img
          className={styles.logoImg}
          src={netflixBannerImage}
          alt="Netflix Banner"
        />
        {/* title */}
        <h1 className={styles.title}> {bannerImage?.original_name} </h1>
        {/* description */}
        <p className={styles.description}>
          {truncateString(bannerImage?.overview, 120)}
          A modern adaptation of the beloved novel series.{" "}
        </p>
        {/* buttons */}
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Play size={30} />
            Play
          </button>
          <button className={styles.button}>
            <Info size={30} />
            My List
          </button>
        </div>
      </div>
      {/* fade effect */}
      <div className={styles.fadeBottom}></div>
    </div>
  );
}

export default Banner;
