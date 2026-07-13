"use strict";

const root = document.documentElement;
const currentPage = document.body.dataset.page || "about";

const themeButton = document.querySelector(".theme-toggle");
const themeIcon = themeButton?.querySelector("span");

const languageButton = document.querySelector(".language-toggle");
const languageIcon = languageButton?.querySelector("span");

const menuButton = document.querySelector(".menu-toggle");
const menuIcon = menuButton?.querySelector("span");
const navigation = document.querySelector(".nav-links");

const MOBILE_BREAKPOINT = 760;

const translations = {
    fr: {
        "nav.about": "À propos",
        "nav.research": "Recherche",
        "nav.cv": "CV",
        "nav.main": "Navigation principale",

        "footer.powered": "Powered by",
        "footer.updateLabel": "Dernière mise à jour :",

        "language.button": "EN",
        "language.buttonLabel": "Passer en anglais",

        "theme.enableLight": "Activer le thème clair",
        "theme.enableDark": "Activer le thème sombre",

        "menu.open": "Ouvrir le menu",
        "menu.close": "Fermer le menu",

        "about.title": "Antonin Lecocq | Accueil",
        "about.intro":
            "Je suis étudiant en mathématiques à " +
            "l’<a href=\"https://dauphine.psl.eu/\" " +
            "target=\"_blank\" rel=\"noopener noreferrer\">" +
            "Université Paris Dauphine – PSL</a>.",

        "about.contact": "Contact:",
        "about.links": "Liens:",
        "about.profileAlt": "Portrait d’Antonin Lecocq",
        "about.newsHeading": "Actualités",

        "about.newsText":
            "Stage de recherche portant sur l’étude du groupe de Lie " +
            "\$SO(n)\$, appliquée à l’analyse de formes. Rédaction " +
            "d’un rapport intitulé « Étude du groupe de Lie " +
            "\$SO(n)\$ dans le cadre de l’analyse de formes », " +
            "disponible sur " +
            "<a href=\"https://github.com/DJ4nto/" +
            "Etude_du_groupe_de_Lie_SO_dans_le_cadre_de_l-analyse_de_formes\" " +
            "target=\"_blank\" rel=\"noopener noreferrer\">" +
            "ce dépôt</a>.",

        "publication.heading": "Recherches",
        "publication.badge": "Rapport",

        "publication.title":
            "Étude du groupe de Lie \$SO(n)\$ dans le cadre " +
            "de l’analyse de formes",

        "publication.author":
            "<strong class=\"publication-author\">" +
            "Antonin Lecocq</strong>, sous la direction de Rayane Mouhli",

        "publication.bibTitle": "Référence BibTeX",
        "publication.copy": "Copier",
        "publication.copied": "Copié !",
        "publication.copyError": "Échec de la copie",
        "publication.openBib": "Afficher la référence BibTeX",
        "publication.closeBib": "Masquer la référence BibTeX",
        "publication.openPdf": "Ouvrir le rapport au format PDF",

        "research.title": "Antonin Lecocq | Recherche",
        "research.pageTitle": "Recherche",

        "cv.title": "Antonin Lecocq | CV",
        "cv.pageTitle": "Curriculum vitæ",
        "cv.download": "Télécharger le CV",

        "cv.educationHeading": "Formation",
        "cv.education1.title": "Licence – Mathématiques appliquées",
        "cv.education1.school": "Université Paris Dauphine – PSL",
        "cv.education1.desc":
            "Formation pluridisciplinaire en mathématiques appliquées " +
            "et en informatique.",

        "cv.education2.title": "Baccalauréat général",
        "cv.education2.school": "École Internationale Bilingue",
        "cv.education2.desc":
            "Spécialités mathématiques, physique-chimie et numérique " +
            "et sciences informatiques. Mention Bien.",

        "cv.experienceHeading": "Expériences professionnelles",
        "cv.at": "de l’",

        "cv.exp1.date": "Juin 2026<br>– juillet 2026",
        "cv.exp1.title": "Stage de recherche",
        "cv.exp1.lab": "Laboratoire",

        "cv.exp2.date": "Sept. 2025<br>– mai 2026",
        "cv.exp2.title": "Trésorier",

        "cv.exp3.date": "Oct. 2024<br>– mai 2026",
        "cv.exp3.title": "Administrateur de sites web",

        "cv.exp4.date": "Juillet 2025",
        "cv.exp4.title": "Stage en développement back-end",

        "locations.parisFrance": "Paris, France",
        "locations.lisbonPortugal": "Lisbonne, Portugal",

        "cv.skillsHeading": "Compétences",
        "cv.languagesHeading": "Langues",
        "cv.language1": "Français",
        "cv.language2": "Anglais",
        "cv.interestsHeading": "Centres d’intérêts",
        "cv.interest2": "Plongée sous-marine",
        "cv.interest3": "MAO",

        "dates.june2026": "1er juin 2026",
        "dates.july2026End": "17 juillet 2026",
        "dates.internshipPeriod": "Du 1er juin au 17 juillet 2026"

    },

    en: {
        "nav.about": "About",
        "nav.research": "Research",
        "nav.cv": "CV",
        "nav.main": "Main navigation",

        "footer.powered": "Powered by",
        "footer.updateLabel": "Last updated:",

        "language.button": "FR",
        "language.buttonLabel": "Switch to French",

        "theme.enableLight": "Enable light theme",
        "theme.enableDark": "Enable dark theme",

        "menu.open": "Open menu",
        "menu.close": "Close menu",

        "about.title": "Antonin Lecocq | Home",

        "about.intro":
            "I am a mathematics student at " +
            "<a href=\"https://dauphine.psl.eu/\" " +
            "target=\"_blank\" rel=\"noopener noreferrer\">" +
            "Université Paris Dauphine – PSL</a>.",

        "about.contact": "Contact:",
        "about.links": "Links:",
        "about.profileAlt": "Portrait of Antonin Lecocq",
        "about.newsHeading": "News",

        "about.newsText":
            "Research internship on the Lie group \$SO(n)\$, " +
            "applied to shape analysis. Writing a report entitled " +
            "“Study of the Lie group \$SO(n)\$ in the context of " +
            "shape analysis”, available in " +
            "<a href=\"https://github.com/DJ4nto/" +
            "Etude_du_groupe_de_Lie_SO_dans_le_cadre_de_l-analyse_de_formes\" " +
            "target=\"_blank\" rel=\"noopener noreferrer\">" +
            "this repository</a>.",

        "publication.heading": "Researches",
        "publication.badge": "Report",

        "publication.title":
            "Study of the Lie group \$SO(n)\$ in the context " +
            "of shape analysis",

        "publication.author":
            "<strong class=\"publication-author\">" +
            "Antonin Lecocq</strong>, supervised by Rayane Mouhli",

        "publication.bibTitle": "BibTeX reference",
        "publication.copy": "Copy",
        "publication.copied": "Copied!",
        "publication.copyError": "Copy failed",
        "publication.openBib": "Show the BibTeX reference",
        "publication.closeBib": "Hide the BibTeX reference",
        "publication.openPdf": "Open the report as a PDF",

        "research.title": "Antonin Lecocq | Research",
        "research.pageTitle": "Research",

        "cv.title": "Antonin Lecocq | CV",
        "cv.pageTitle": "Curriculum vitae",
        "cv.download": "Download CV",

        "cv.educationHeading": "Education",
        "cv.education1.title": "Bachelor’s degree – Applied Mathematics",
        "cv.education1.school": "Université Paris Dauphine – PSL",
        "cv.education1.desc":
            "Interdisciplinary training in applied mathematics " +
            "and computer science.",

        "cv.education2.title": "French Baccalaureate",
        "cv.education2.school": "École Internationale Bilingue",
        "cv.education2.desc":
            "Specialisations in mathematics, physics and chemistry, " +
            "and computer science. Awarded with honours.",

        "cv.experienceHeading": "Professional experience",
        "cv.at": "laboratory at ",

        "cv.exp1.date": "June 2026<br>– July 2026",
        "cv.exp1.title": "Research internship",
        "cv.exp1.lab": "",

        "cv.exp2.date": "Sept. 2025<br>– May 2026",
        "cv.exp2.title": "Treasurer",

        "cv.exp3.date": "Oct. 2024<br>– May 2026",
        "cv.exp3.title": "Website administrator",

        "cv.exp4.date": "July 2025",
        "cv.exp4.title": "Back-end development internship",

        "locations.parisFrance": "Paris, France",
        "locations.lisbonPortugal": "Lisbon, Portugal",

        "cv.skillsHeading": "Skills",
        "cv.languagesHeading": "Languages",
        "cv.language1": "French",
        "cv.language2": "English",
        "cv.interestsHeading": "Interests",
        "cv.interest2": "Scuba diving",
        "cv.interest3": "Music production",

        "dates.june2026": "June 1, 2026",
        "dates.july2026End": "July 17, 2026",
        "dates.internshipPeriod": "From June 1 to July 17, 2026"
    }
};

function getStoredValue(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function setStoredValue(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Le site continue de fonctionner sans localStorage.
    }
}

function getCurrentLanguage() {
    return root.dataset.language === "en" ? "en" : "fr";
}

function getTranslation(key, language = getCurrentLanguage()) {
    return translations[language]?.[key] || "";
}

function getInitialLanguage() {
    return getStoredValue("language") === "en" ? "en" : "fr";
}

function getInitialTheme() {
    const savedTheme = getStoredValue("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return root.dataset.theme === "light" ? "light" : "dark";
}

function updateThemeButton(theme) {
    if (!themeButton || !themeIcon) {
        return;
    }

    const label =
        theme === "dark"
            ? getTranslation("theme.enableLight")
            : getTranslation("theme.enableDark");

    themeIcon.textContent = theme === "dark" ? "☾" : "☀";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
}

function applyTheme(theme) {
    const safeTheme = theme === "light" ? "light" : "dark";

    root.dataset.theme = safeTheme;
    updateThemeButton(safeTheme);
}

function isMenuOpen() {
    return navigation?.classList.contains("open") || false;
}

function updateMenuButton() {
    if (!menuButton || !menuIcon) {
        return;
    }

    const menuIsOpen = isMenuOpen();

    menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        getTranslation(
            menuIsOpen ? "menu.close" : "menu.open"
        )
    );

    menuIcon.textContent = menuIsOpen ? "✕" : "☰";
}

function openMenu() {
    navigation?.classList.add("open");
    updateMenuButton();
}

function closeMenu(returnFocus = false) {
    const wasOpen = isMenuOpen();

    navigation?.classList.remove("open");
    updateMenuButton();

    if (returnFocus && wasOpen) {
        menuButton?.focus();
    }
}

function updateBibButtonLabel(button, panelIsOpen) {
    button.setAttribute(
        "aria-label",
        getTranslation(
            panelIsOpen
                ? "publication.closeBib"
                : "publication.openBib"
        )
    );
}

function closeAllBibPanels(exceptButton = null) {
    document.querySelectorAll(".bib-toggle").forEach((button) => {
        if (button === exceptButton) {
            return;
        }

        button.setAttribute("aria-expanded", "false");
        updateBibButtonLabel(button, false);

        const panelId = button.getAttribute("aria-controls");
        const panel = panelId
            ? document.getElementById(panelId)
            : null;

        if (panel) {
            panel.hidden = true;
        }
    });
}

function updateLastModified(language) {
    const modifiedDate = new Date(document.lastModified);

    if (Number.isNaN(modifiedDate.getTime())) {
        return;
    }

    document.querySelectorAll("[data-last-update]").forEach(
        (element) => {
            element.textContent = new Intl.DateTimeFormat(
                language === "fr" ? "fr-FR" : "en-GB",
                {
                    year: "numeric",
                    month: "long"
                }
            ).format(modifiedDate);
        }
    );
}

function translateTextContent(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const value = translations[language]?.[key];

        if (typeof value === "string") {
            element.textContent = value;
        }
    });
}

function translateHtmlContent(language) {
    document
        .querySelectorAll("[data-i18n-html]")
        .forEach((element) => {
            const key = element.dataset.i18nHtml;
            const value = translations[language]?.[key];

            if (typeof value === "string") {
                element.innerHTML = value;
            }
        });
}

function translateAttributes(language) {
    document
        .querySelectorAll("[data-i18n-alt]")
        .forEach((element) => {
            const key = element.dataset.i18nAlt;
            const value = translations[language]?.[key];

            if (typeof value === "string") {
                element.setAttribute("alt", value);
            }
        });

    document
        .querySelectorAll("[data-i18n-aria-label]")
        .forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            const value = translations[language]?.[key];

            if (typeof value === "string") {
                element.setAttribute("aria-label", value);
            }
        });
}

async function refreshMathJax() {
    if (!window.MathJax?.startup?.promise) {
        return;
    }

    try {
        await window.MathJax.startup.promise;

        if (typeof window.MathJax.typesetPromise !== "function") {
            return;
        }

        const targets = Array.from(
            document.querySelectorAll(
                "[data-i18n], [data-i18n-html]"
            )
        );

        if (targets.length === 0) {
            return;
        }

        if (typeof window.MathJax.typesetClear === "function") {
            window.MathJax.typesetClear(targets);
        }

        await window.MathJax.typesetPromise(targets);
    } catch (error) {
        console.error("Erreur MathJax :", error);
    }
}


function applyLanguage(language, refreshMath = true) {
    const safeLanguage = language === "en" ? "en" : "fr";

    root.dataset.language = safeLanguage;
    root.lang = safeLanguage;

    translateTextContent(safeLanguage);
    translateHtmlContent(safeLanguage);
    translateAttributes(safeLanguage);
    updateLastModified(safeLanguage);

    document.querySelectorAll("nav[aria-label]").forEach((nav) => {
        nav.setAttribute(
            "aria-label",
            translations[safeLanguage]["nav.main"]
        );
    });

    if (languageButton && languageIcon) {
        const label =
            translations[safeLanguage]["language.buttonLabel"];

        languageIcon.textContent =
            translations[safeLanguage]["language.button"];

        languageButton.setAttribute("aria-label", label);
        languageButton.setAttribute("title", label);
    }

    const titleKey = `${currentPage}.title`;
    const translatedTitle =
        translations[safeLanguage][titleKey];

    if (translatedTitle) {
        document.title = translatedTitle;
    }

    updateThemeButton(root.dataset.theme || "dark");
    updateMenuButton();

    document.querySelectorAll(".bib-toggle").forEach((button) => {
        const panelIsOpen =
            button.getAttribute("aria-expanded") === "true";

        updateBibButtonLabel(button, panelIsOpen);
    });

    if (refreshMath) {
        refreshMathJax();
    }
}

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
    }

    const textArea = document.createElement("textarea");

    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.select();

    let copied = false;

    try {
        copied = document.execCommand("copy");
    } finally {
        textArea.remove();
    }

    return copied;
}

/* ==========================================================
   INITIALISATION
   ========================================================== */

applyTheme(getInitialTheme());
applyLanguage(getInitialLanguage(), false);

window.addEventListener("load", () => {
    refreshMathJax();
});

document.querySelectorAll("[data-current-year]").forEach(
    (element) => {
        element.textContent = String(
            new Date().getFullYear()
        );
    }
);

document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

/* ==========================================================
   THÈME
   ========================================================== */

themeButton?.addEventListener("click", () => {
    const nextTheme =
        root.dataset.theme === "dark"
            ? "light"
            : "dark";

    setStoredValue("theme", nextTheme);
    applyTheme(nextTheme);
});

/* ==========================================================
   LANGUE
   ========================================================== */

languageButton?.addEventListener("click", () => {
    const nextLanguage =
        getCurrentLanguage() === "fr"
            ? "en"
            : "fr";

    setStoredValue("language", nextLanguage);
    applyLanguage(nextLanguage, true);
});

/* ==========================================================
   MENU MOBILE
   ========================================================== */

menuButton?.addEventListener("click", () => {
    if (isMenuOpen()) {
        closeMenu();
    } else {
        openMenu();
    }
});

navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

document.addEventListener("click", (event) => {
    if (!isMenuOpen()) {
        return;
    }

    const target = event.target;

    if (!(target instanceof Node)) {
        return;
    }

    if (
        navigation?.contains(target) ||
        menuButton?.contains(target)
    ) {
        return;
    }

    closeMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMenu();
    }
});

/* ==========================================================
   PANNEAUX BIBTEX
   ========================================================== */

document.querySelectorAll(".bib-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const panelId = button.getAttribute("aria-controls");

        const panel = panelId
            ? document.getElementById(panelId)
            : null;

        if (!panel) {
            return;
        }

        const panelWillOpen = panel.hidden;

        closeAllBibPanels(button);

        panel.hidden = !panelWillOpen;

        button.setAttribute(
            "aria-expanded",
            String(panelWillOpen)
        );

        updateBibButtonLabel(button, panelWillOpen);

        if (panelWillOpen) {
            panel.querySelector(".bib-copy")?.focus({
                preventScroll: true
            });
        }
    });
});

/* ==========================================================
   COPIE DU BIBTEX
   ========================================================== */

document.querySelectorAll(".bib-copy").forEach((copyButton) => {
    copyButton.addEventListener("click", async () => {
        const panel = copyButton.closest(".bib-panel");
        const code = panel?.querySelector(".bib-code");

        if (!code) {
            return;
        }

        const language = getCurrentLanguage();

        copyButton.disabled = true;

        try {
            const copied = await copyText(
                code.textContent.trim()
            );

            if (!copied) {
                throw new Error("La copie a échoué.");
            }

            copyButton.textContent =
                translations[language]["publication.copied"];

            copyButton.classList.add("copied");
        } catch (error) {
            console.error(error);

            copyButton.textContent =
                translations[language][
                    "publication.copyError"
                ];
        }

        window.setTimeout(() => {
            copyButton.textContent =
                translations[getCurrentLanguage()][
                    "publication.copy"
                ];

            copyButton.classList.remove("copied");
            copyButton.disabled = false;
        }, 1600);
    });
});

/* ==========================================================
   TOUCHE ÉCHAP
   ========================================================== */

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    if (isMenuOpen()) {
        closeMenu(true);
        return;
    }

    const openedBibButton = document.querySelector(
        ".bib-toggle[aria-expanded=\"true\"]"
    );

    if (openedBibButton) {
        closeAllBibPanels();
        openedBibButton.focus();
    }
});
