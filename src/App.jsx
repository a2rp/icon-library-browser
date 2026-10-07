import { useEffect, useState } from "react";
import { LuArrowUpRight, LuDownload, LuMousePointer2, LuSearch } from "react-icons/lu";
import BackToTop from "./components/backToTop/index.jsx";
import IconBrowser from "./components/iconBrowser/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { iconCatalog } from "./data/iconCatalog.js";
import styles from "./App.module.css";

const favoritesStorageKey = "icon-library-browser-favorites";

const readSavedFavorites = () => {
    try {
        const saved = localStorage.getItem(favoritesStorageKey);
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
    } catch {
        return [];
    }
};

const App = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All icons");
    const [collection, setCollection] = useState("All collections");
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState(readSavedFavorites);
    const [selectedIcon, setSelectedIcon] = useState(iconCatalog[0]);
    const [color, setColor] = useState("#315d48");
    const [size, setSize] = useState(48);
    const [toast, setToast] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem(favoritesStorageKey, JSON.stringify(favoriteIds));
        } catch {
            return;
        }
    }, [favoriteIds]);

    useEffect(() => {
        if (!toast) {
            return undefined;
        }

        const timer = window.setTimeout(() => setToast(""), 2500);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const normalizedSearch = search.trim().toLowerCase();
    const visibleIcons = iconCatalog.filter((item) => {
        const matchesSearch =
            !normalizedSearch ||
            item.name.toLowerCase().includes(normalizedSearch) ||
            item.collection.toLowerCase().includes(normalizedSearch) ||
            item.category.toLowerCase().includes(normalizedSearch) ||
            item.tags.some((tag) => tag.includes(normalizedSearch));
        const matchesCategory =
            activeCategory === "All icons" || item.category === activeCategory;
        const matchesCollection =
            collection === "All collections" || item.collection === collection;
        const matchesFavorites = !favoritesOnly || favoriteIds.includes(item.id);

        return matchesSearch && matchesCategory && matchesCollection && matchesFavorites;
    });

    const toggleFavorite = (iconId) => {
        setFavoriteIds((current) =>
            current.includes(iconId)
                ? current.filter((id) => id !== iconId)
                : [...current, iconId],
        );
    };

    const copyText = async (text, label) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast(`${label} copied to clipboard`);
        } catch {
            setToast("Clipboard access is unavailable on this page");
        }
    };

    const showFavorites = () => {
        setActiveCategory("All icons");
        setCollection("All collections");
        setFavoritesOnly(true);
        document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
    };

    const clearFilters = () => {
        setSearch("");
        setActiveCategory("All icons");
        setCollection("All collections");
        setFavoritesOnly(false);
    };

    const browseAll = () => {
        clearFilters();
        document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader onShowFavorites={showFavorites} />
            <main className={styles.mainContent}>
                <section className={styles.pageIntro}>
                    <div>
                        <h1>Find the right icon, faster.</h1>
                        <p className={styles.description}>
                            Search familiar icon collections, tune a preview, then copy the code or save an SVG.
                        </p>
                    </div>
                    <div className={styles.libraryStats} aria-label="Library size">
                        <div><strong>{iconCatalog.length}</strong><span>icons</span></div>
                        <div><strong>3</strong><span>collections</span></div>
                    </div>
                </section>
                <IconBrowser
                    visibleIcons={visibleIcons}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    search={search}
                    setSearch={setSearch}
                    collection={collection}
                    setCollection={setCollection}
                    favoritesOnly={favoritesOnly}
                    setFavoritesOnly={setFavoritesOnly}
                    favoriteIds={favoriteIds}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    color={color}
                    setColor={setColor}
                    size={size}
                    setSize={setSize}
                    onToggleFavorite={toggleFavorite}
                    onCopy={copyText}
                />
                <section className={styles.guide} id="guide" aria-labelledby="guide-title">
                    <div className={styles.guideHeading}>
                        <div>
                            <h2 id="guide-title">From search to your project</h2>
                            <p>Choose an icon and take it with you in a few steps.</p>
                        </div>
                        <button type="button" onClick={browseAll}>
                            Browse all icons <LuArrowUpRight aria-hidden="true" />
                        </button>
                    </div>
                    <div className={styles.guideSteps}>
                        <article>
                            <span className={styles.stepIcon}><LuSearch aria-hidden="true" /></span>
                            <div><h3>Search and filter</h3><p>Look up an icon by name, keyword, category, or collection.</p></div>
                            <span className={styles.stepNumber}>01</span>
                        </article>
                        <article>
                            <span className={styles.stepIcon}><LuMousePointer2 aria-hidden="true" /></span>
                            <div><h3>Adjust the preview</h3><p>Select a result, then change its size and color in the preview panel.</p></div>
                            <span className={styles.stepNumber}>02</span>
                        </article>
                        <article>
                            <span className={styles.stepIcon}><LuDownload aria-hidden="true" /></span>
                            <div><h3>Copy or download</h3><p>Copy React or SVG code, download an SVG, or keep an icon in Favorites.</p></div>
                            <span className={styles.stepNumber}>03</span>
                        </article>
                    </div>
                    <p className={styles.storageNote}>
                        Favorites stay in this browser on this device. The icon catalog and settings do not need an account.
                    </p>
                </section>
            </main>
            <SiteFooter />
            <BackToTop />
            <div className={styles.toast} role="status" aria-live="polite" aria-atomic="true">
                {toast}
            </div>
        </div>
    );
};

export default App;
