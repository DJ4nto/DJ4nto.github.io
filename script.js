"use strict";


const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = themeButton?.querySelector("span");

const savedTheme = localStorage.getItem("theme");

const initialTheme = savedTheme || "dark";

applyTheme(initialTheme);

function applyTheme(theme) {
    root.dataset.theme = theme;

    if (!themeButton || !themeIcon) {
        return;
    }

    const isDark = theme === "dark";

    themeIcon.textContent = isDark ? "☾" : "☀";
    themeButton.setAttribute(
        "aria-label",
        isDark
            ? "Activer le thème clair"
            : "Activer le thème sombre"
    );
}

themeButton?.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
});



const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
});

navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuButton?.setAttribute("aria-expanded", "false");

        if (menuButton) {
            menuButton.textContent = "☰";
        }
    });
});



const currentPage = document.body.dataset.page;

document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});



document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-last-update]").forEach((element) => {
    element.textContent = new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long"
    }).format(new Date(document.lastModified));
});


const bibButtons = document.querySelectorAll(".bib-toggle");

bibButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const publication = button.closest(".publication");
        const panel = publication?.querySelector(".bib-panel");

        if (!panel) {
            return;
        }

        const willOpen = panel.hidden;

        closeAllBibPanels(button);

        panel.hidden = !willOpen;
        button.setAttribute("aria-expanded", String(willOpen));

        if (willOpen) {
            panel.querySelector(".bib-copy")?.focus({
                preventScroll: true
            });
        }
    });
});


document.querySelectorAll(".bib-copy").forEach((copyButton) => {
    copyButton.addEventListener("click", async () => {
        const panel = copyButton.closest(".bib-panel");
        const code = panel?.querySelector(".bib-code");

        if (!code) {
            return;
        }

        const bibText = code.textContent.trim();
        const originalText = copyButton.textContent;

        try {
            await navigator.clipboard.writeText(bibText);

            copyButton.textContent = "Copié !";
            copyButton.classList.add("copied");
        } catch (error) {
            /*
             * Solution de secours pour certains navigateurs
             * ou lorsque le site est ouvert directement en fichier.
             */
            const textArea = document.createElement("textarea");

            textArea.value = bibText;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);

            textArea.select();
            document.execCommand("copy");
            textArea.remove();

            copyButton.textContent = "Copié !";
            copyButton.classList.add("copied");
        }

        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.classList.remove("copied");
        }, 1600);
    });
});


function closeAllBibPanels(buttonToKeep = null) {
    document.querySelectorAll(".bib-toggle").forEach((button) => {
        if (button === buttonToKeep) {
            return;
        }

        button.setAttribute("aria-expanded", "false");

        const publication = button.closest(".publication");
        const panel = publication?.querySelector(".bib-panel");

        if (panel) {
            panel.hidden = true;
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    const openedButton = document.querySelector(
        '.bib-toggle[aria-expanded="true"]'
    );

    closeAllBibPanels();

    openedButton?.focus();
});
