import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import styles from "./Header.module.css";
function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* logo */}
        <img className={styles.logo} src={logo} alt="Netflix Logo" />
        {/* navigation links */}
        <nav className={styles.nav}>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
          <Link className={styles.navLink} href="/tv-shows">
            TV Shows
          </Link>
          <Link className={styles.navLink} href="/movies">
            Movies
          </Link>
          <Link className={styles.navLink} href="/new-popular">
            New & Popular
          </Link>
          <Link className={styles.navLink} href="/my-list">
            My List
          </Link>
          <Link className={styles.navLink} href="/languages">
            Browse by Languages
          </Link>
        </nav>
        {/* right side elements */}
        <div className={styles.rightSection}>
          {/* search */}
          <div className={styles.searchContainer}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={styles.searchButton}
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="movie title"
                className={styles.searchInput}
              />
            )}
          </div>
          {/* notification */}
          <button className={styles.iconButton}>
            <Bell />
            <span className={styles.notificationBadge}>4</span>
          </button>

          {/* user profile */}
          <div className={styles.profileContainer}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={styles.profileButton}
            >
              <div className={styles.profileAvatar}>
                <User />
              </div>
              <ChevronDown />
            </button>
            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <Link className={styles.profileMenuItem}> Account</Link>
                <Link className={styles.profileMenuItem}> Help Center </Link>
                <hr className={styles.profileMenuDivider} />{" "}
                {/* Add a horizontal line for separation */}
                <Link className={styles.profileMenuItem}> Sign Out </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
