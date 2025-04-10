import { useState, useEffect } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Portfolio" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on hash change (navigation)
  useEffect(() => {
    const handleHashChange = () => {
      closeMobileMenu();
    };

    window.addEventListener("hashchange", handleHashChange);

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest(`.${styles.navMobileContainer}`) &&
        !target.closest(`.${styles.hamburger}`)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {title}{" "}
        <span role="img" aria-label="lightning">
          ⚡
        </span>
      </div>

      <nav className={styles.nav}>
        <a href="#home" className={styles.navLink}>
          Home
        </a>
        <a href="#timeline" className={styles.navLink}>
          Timeline
        </a>
        <a href="#arsenal" className={styles.navLink}>
          Power Arsenal
        </a>
        <a href="#contact" className={styles.navLink}>
          Contact
        </a>
      </nav>

      <div
        className={`${styles.hamburger} ${
          mobileMenuOpen ? styles.hamburgerOpen : ""
        }`}
        onClick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={styles.navMobileContainer}>
        <nav
          className={`${styles.navMobile} ${
            mobileMenuOpen ? styles.navMobileOpen : ""
          }`}
        >
          <a href="#home" className={styles.navLink} onClick={closeMobileMenu}>
            Home
          </a>
          <a
            href="#timeline"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Timeline
          </a>
          <a
            href="#arsenal"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Power Arsenal
          </a>
          <a
            href="#contact"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
