const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

function setNavState(open) {
  if (!nav || !navToggle) return;
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    setNavState(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      setNavState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavState(false);
    }
  });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-nav] a").forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("is-active");
  }
});

const revealNodes = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function loadScript(src, onload) {
  if ([...document.scripts].some((script) => script.src === src)) {
    if (onload) onload();
    return;
  }
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  if (onload) script.onload = onload;
  document.head.appendChild(script);
}

window.dataLayer = window.dataLayer || [];
window.gtag =
  window.gtag ||
  function gtag() {
    window.dataLayer.push(arguments);
  };

window.ym =
  window.ym ||
  function ym() {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
window.ym.l = Date.now();

loadScript("https://www.googletagmanager.com/gtag/js?id=G-W82418TYDX", () => {
  window.gtag("js", new Date());
  window.gtag("config", "G-W82418TYDX");
});

loadScript("https://mc.yandex.ru/metrika/tag.js", () => {
  window.ym(99852068, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
});
