// 言語切替（books 配下ページ共通）。トップ index.html はページ内に独自実装を持つため対象外。
// <html> の data-title-ja / data-title-en でタイトルを切り替える（任意）。
(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-set-lang]");
  const blocks = document.querySelectorAll("[data-lang]");
  const titles = { ja: root.dataset.titleJa, en: root.dataset.titleEn };

  function setLanguage(lang) {
    const safe = lang === "en" ? "en" : "ja";
    root.lang = safe;
    if (titles[safe]) document.title = titles[safe];

    blocks.forEach((block) => {
      block.hidden = block.dataset.lang !== safe;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.setLang === safe;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem("preferredLanguage", safe);
  }

  const saved = localStorage.getItem("preferredLanguage");
  const browser = navigator.language && navigator.language.startsWith("en") ? "en" : "ja";
  setLanguage(saved || browser);

  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });
})();
