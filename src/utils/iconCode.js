import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const makeJsxSnippet = (item, size, color) =>
    `import { ${item.componentName} } from "${item.packageName}";\n\n<${item.componentName} size={${size}} color="${color}" />`;

export const makeSvgMarkup = (item, size, color) =>
    renderToStaticMarkup(
        createElement(item.icon, {
            size,
            color,
            "aria-hidden": "true",
        }),
    );

export const downloadSvg = (item, size, color) => {
    const file = new Blob([makeSvgMarkup(item, size, color)], {
        type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${item.name.toLowerCase().replaceAll(" ", "-")}.svg`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
