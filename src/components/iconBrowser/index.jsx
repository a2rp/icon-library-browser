import { FaGithub } from "react-icons/fa6";
import { LuCheck, LuCopy, LuHeart, LuSearch } from "react-icons/lu";
import { iconCatalog, iconCategories } from "../../data/iconCatalog.js";
import { makeJsxSnippet } from "../../utils/iconCode.js";
import IconDetail from "../iconDetail/index.jsx";
import styles from "./styles.module.css";

const IconBrowser = ({
    visibleIcons,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    collection,
    setCollection,
    favoritesOnly,
    setFavoritesOnly,
    favoriteIds,
    selectedIcon,
    setSelectedIcon,
    color,
    setColor,
    size,
    setSize,
    onToggleFavorite,
    onCopy,
}) => {
    const favoriteCount = favoriteIds.length;

    return (
        <section
            className={styles.browser}
            id="library"
            aria-label="Icon library"
        >
            <div className={styles.searchBar}>
                <LuSearch className={styles.searchIcon} aria-hidden="true" />
                <label className={styles.visuallyHidden} htmlFor="icon-search">
                    Search icons
                </label>
                <input
                    id="icon-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or keyword"
                    autoComplete="off"
                />
            </div>
            <div className={styles.browserLayout}>
                <aside className={styles.sidebar} aria-label="Icon filters">
                    <div className={styles.filterHeading}>
                        <h2>Categories</h2>
                        <span>{iconCatalog.length}</span>
                    </div>
                    <nav
                        className={styles.categoryList}
                        aria-label="Filter by category"
                    >
                        {iconCategories.map((category) => {
                            const count =
                                category === "All icons"
                                    ? iconCatalog.length
                                    : iconCatalog.filter(
                                          (item) => item.category === category,
                                      ).length;

                            return (
                                <button
                                    className={
                                        activeCategory === category
                                            ? styles.categoryActive
                                            : styles.categoryButton
                                    }
                                    key={category}
                                    type="button"
                                    aria-pressed={activeCategory === category}
                                    onClick={() => {
                                        setActiveCategory(category);
                                        setFavoritesOnly(false);
                                    }}
                                >
                                    <span>{category}</span>
                                    <span>{count}</span>
                                </button>
                            );
                        })}
                    </nav>
                    <div className={styles.sidebarDivider} />
                    <button
                        className={
                            favoritesOnly
                                ? styles.favoriteFilterActive
                                : styles.favoriteFilter
                        }
                        type="button"
                        aria-pressed={favoritesOnly}
                        onClick={() => setFavoritesOnly((current) => !current)}
                    >
                        <LuHeart aria-hidden="true" />
                        <span>Favorites</span>
                        <span>{favoriteCount}</span>
                    </button>
                    <div className={styles.sidebarNote}>
                        <FaGithub aria-hidden="true" />
                        <p>Icons from open source React icon packs.</p>
                    </div>
                </aside>
                <div className={styles.results}>
                    <div className={styles.resultsHeading}>
                        <div>
                            <h2>
                                {favoritesOnly
                                    ? "Your favorites"
                                    : activeCategory}
                            </h2>
                            <p>
                                {visibleIcons.length}{" "}
                                {visibleIcons.length === 1 ? "icon" : "icons"}{" "}
                                to explore
                            </p>
                        </div>
                        <label
                            className={styles.collectionControl}
                            htmlFor="icon-collection"
                        >
                            <span>Collection</span>
                            <select
                                id="icon-collection"
                                value={collection}
                                onChange={(event) =>
                                    setCollection(event.target.value)
                                }
                            >
                                <option>All collections</option>
                                <option>Lucide</option>
                                <option>Feather</option>
                                <option>Font Awesome</option>
                            </select>
                        </label>
                    </div>
                    {visibleIcons.length > 0 ? (
                        <div className={styles.iconGrid}>
                            {visibleIcons.map((item) => {
                                const Icon = item.icon;
                                const isFavorite = favoriteIds.includes(
                                    item.id,
                                );
                                const isSelected = selectedIcon.id === item.id;

                                return (
                                    <article
                                        className={
                                            isSelected
                                                ? `${styles.iconTile} ${styles.iconTileSelected}`
                                                : styles.iconTile
                                        }
                                        key={item.id}
                                    >
                                        <button
                                            className={styles.tileSelect}
                                            type="button"
                                            aria-pressed={isSelected}
                                            aria-label={`Preview ${item.name} from ${item.collection}`}
                                            onClick={() =>
                                                setSelectedIcon(item)
                                            }
                                        >
                                            <span className={styles.tileIcon}>
                                                <Icon
                                                    size={25}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            <span className={styles.tileName}>
                                                {item.name}
                                            </span>
                                            <span
                                                className={
                                                    styles.tileCollection
                                                }
                                            >
                                                {item.collection}
                                            </span>
                                        </button>
                                        <div className={styles.tileActions}>
                                            <button
                                                className={
                                                    isFavorite
                                                        ? styles.tileFavoriteActive
                                                        : styles.tileAction
                                                }
                                                type="button"
                                                aria-label={
                                                    isFavorite
                                                        ? `Remove ${item.name} from favorites`
                                                        : `Add ${item.name} to favorites`
                                                }
                                                aria-pressed={isFavorite}
                                                onClick={() =>
                                                    onToggleFavorite(item.id)
                                                }
                                            >
                                                {isFavorite ? (
                                                    <LuCheck aria-hidden="true" />
                                                ) : (
                                                    <LuHeart aria-hidden="true" />
                                                )}
                                            </button>
                                            <button
                                                className={styles.tileAction}
                                                type="button"
                                                aria-label={`Copy ${item.name} React code`}
                                                onClick={() =>
                                                    onCopy(
                                                        makeJsxSnippet(
                                                            item,
                                                            24,
                                                            color,
                                                        ),
                                                        "React code",
                                                    )
                                                }
                                            >
                                                <LuCopy aria-hidden="true" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>
                                <LuSearch aria-hidden="true" />
                            </span>
                            <h3>No icons found</h3>
                            <p>
                                Try another search or clear the active filters.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setActiveCategory("All icons");
                                    setCollection("All collections");
                                    setFavoritesOnly(false);
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
                <IconDetail
                    item={selectedIcon}
                    color={color}
                    size={size}
                    isFavorite={favoriteIds.includes(selectedIcon.id)}
                    onColorChange={setColor}
                    onSizeChange={setSize}
                    onToggleFavorite={onToggleFavorite}
                    onCopy={onCopy}
                />
            </div>
        </section>
    );
};

export default IconBrowser;
