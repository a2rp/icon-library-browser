import { useState } from "react";
import { LuCopy, LuDownload, LuHeart } from "react-icons/lu";
import {
    downloadSvg,
    makeJsxSnippet,
    makeSvgMarkup,
} from "../../utils/iconCode.js";
import styles from "./styles.module.css";

const IconDetail = ({
    item,
    color,
    size,
    isFavorite,
    onColorChange,
    onSizeChange,
    onToggleFavorite,
    onCopy,
}) => {
    const [format, setFormat] = useState("jsx");
    const Icon = item.icon;
    const code =
        format === "jsx"
            ? makeJsxSnippet(item, size, color)
            : makeSvgMarkup(item, size, color);

    return (
        <aside className={styles.detail} aria-label="Selected icon details">
            <div className={styles.detailHeading}>
                <div>
                    <p className={styles.label}>Selected icon</p>
                    <h2>{item.name}</h2>
                </div>
                <button
                    className={
                        isFavorite
                            ? styles.favoriteActive
                            : styles.favoriteButton
                    }
                    type="button"
                    aria-pressed={isFavorite}
                    aria-label={
                        isFavorite
                            ? `Remove ${item.name} from favorites`
                            : `Add ${item.name} to favorites`
                    }
                    onClick={() => onToggleFavorite(item.id)}
                >
                    <LuHeart aria-hidden="true" />
                </button>
            </div>
            <p className={styles.description}>
                {item.collection} <span aria-hidden="true">/</span>{" "}
                {item.category}
            </p>
            <div className={styles.previewFrame}>
                <span className={styles.previewNote}>Live preview</span>
                <Icon size={size} color={color} aria-hidden="true" />
            </div>
            <div className={styles.controls}>
                <label className={styles.controlLabel} htmlFor="icon-size">
                    <span>Size</span>
                    <output htmlFor="icon-size">{size}px</output>
                </label>
                <input
                    id="icon-size"
                    className={styles.sizeInput}
                    type="range"
                    min="20"
                    max="112"
                    step="4"
                    value={size}
                    onChange={(event) =>
                        onSizeChange(Number(event.target.value))
                    }
                />
                <label className={styles.controlLabel} htmlFor="icon-color">
                    <span>Icon color</span>
                    <span className={styles.colorValue}>
                        {color.toUpperCase()}
                    </span>
                </label>
                <div className={styles.colorControl}>
                    <input
                        id="icon-color"
                        type="color"
                        value={color}
                        onChange={(event) => onColorChange(event.target.value)}
                    />
                    <span>Choose a color</span>
                </div>
            </div>
            <div className={styles.codeHeading}>
                <h3>Use this icon</h3>
                <div
                    className={styles.formatTabs}
                    role="tablist"
                    aria-label="Code format"
                >
                    <button
                        className={format === "jsx" ? styles.formatActive : ""}
                        type="button"
                        role="tab"
                        aria-selected={format === "jsx"}
                        onClick={() => setFormat("jsx")}
                    >
                        React
                    </button>
                    <button
                        className={format === "svg" ? styles.formatActive : ""}
                        type="button"
                        role="tab"
                        aria-selected={format === "svg"}
                        onClick={() => setFormat("svg")}
                    >
                        SVG
                    </button>
                </div>
            </div>
            <pre className={styles.codeBlock}>
                <code>{code}</code>
            </pre>
            <div className={styles.detailActions}>
                <button
                    className={styles.copyButton}
                    type="button"
                    onClick={() =>
                        onCopy(
                            code,
                            format === "jsx" ? "React code" : "SVG code",
                        )
                    }
                >
                    <LuCopy aria-hidden="true" /> Copy code
                </button>
                <button
                    className={styles.downloadButton}
                    type="button"
                    onClick={() => downloadSvg(item, size, color)}
                >
                    <LuDownload aria-hidden="true" /> Download SVG
                </button>
            </div>
            <p className={styles.packageText}>
                Package: <code>{item.packageName}</code>
            </p>
        </aside>
    );
};

export default IconDetail;
