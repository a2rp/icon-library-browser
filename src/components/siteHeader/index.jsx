import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuMenu, LuSparkles, LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const SiteHeader = ({ onShowFavorites }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (
                !menuRef.current?.contains(event.target) &&
                !triggerRef.current?.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const showFavorites = () => {
        onShowFavorites();
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <a className={styles.brand} href="#top" onClick={closeMenu}>
                    <span className={styles.brandIcon} aria-hidden="true">
                        <LuSparkles />
                    </span>
                    <span className={styles.brandText}>
                        Icon Library
                        <span className={styles.brandSubtext}>BROWSER</span>
                    </span>
                </a>
                <nav className={styles.desktopNav} aria-label="Main navigation">
                    <a href="#library">Library</a>
                    <button type="button" onClick={showFavorites}>
                        Favorites
                    </button>
                    <a href="#guide">How it works</a>
                </nav>
                <div className={styles.headerActions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/icon-library-browser"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                        <LuArrowUpRight aria-hidden="true" />
                    </a>
                    <button
                        ref={triggerRef}
                        className={styles.menuToggle}
                        type="button"
                        aria-expanded={menuOpen}
                        aria-controls="header-menu"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <nav
                    ref={menuRef}
                    className={styles.mobileMenu}
                    id="header-menu"
                    aria-label="Mobile navigation"
                >
                    <a href="#library" onClick={closeMenu}>Browse icons</a>
                    <button type="button" onClick={showFavorites}>Saved favorites</button>
                    <a href="#guide" onClick={closeMenu}>How it works</a>
                    <a
                        href="https://github.com/a2rp/icon-library-browser"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMenu}
                    >
                        <FaGithub aria-hidden="true" /> Repository
                    </a>
                </nav>
            )}
        </header>
    );
};

export default SiteHeader;
