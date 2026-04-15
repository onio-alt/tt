(() => {
    const body = document.body;
    const drawer = document.getElementById("drawer");
    const openMenuBtn = document.getElementById("openMenu");
    const closeMenuBtn = document.getElementById("closeMenu");
    const backdrop = document.getElementById("drawerBackdrop");
    const topbar = document.querySelector(".topbar");

    const openMenu = () => {
        if (!drawer) {
            return;
        }
        body.classList.add("menu-open");
    };

    const closeMenu = () => {
        body.classList.remove("menu-open");
    };

    if (openMenuBtn) {
        openMenuBtn.addEventListener("click", openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", closeMenu);
    }

    if (backdrop) {
        backdrop.addEventListener("click", closeMenu);
    }

    if (drawer) {
        drawer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    const scrollToTarget = (target, behavior = "smooth") => {
        if (!target) {
            return;
        }
        if (target.id === "contacts-footer") {
            const bottom = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            window.scrollTo({ top: bottom, behavior });
            return;
        }
        const offset = (topbar ? topbar.offsetHeight : 0) + 8;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior });
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#" || href.length < 2) {
                return;
            }
            const target = document.querySelector(href);
            if (!target) {
                return;
            }
            event.preventDefault();
            scrollToTarget(target, "smooth");
        });
    });

    if (window.location.hash && window.location.hash.length > 1) {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
            window.requestAnimationFrame(() => {
                scrollToTarget(hashTarget, "auto");
            });
        }
    }

    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const willOpen = !item.classList.contains("open");
            faqItems.forEach((other) => {
                if (other !== item) {
                    other.classList.remove("open");
                }
            });
            item.classList.toggle("open", willOpen);
        });
    });

    const slider = document.querySelector("[data-slider-track]");
    const dots = Array.from(document.querySelectorAll("[data-slider-dot]"));
    if (slider && dots.length) {
        let activeIndex = 0;

        const updateDots = () => {
            const width = slider.clientWidth || 1;
            const index = Math.round(slider.scrollLeft / width);
            activeIndex = index;
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === index);
            });
        };

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", () => {
                const width = slider.clientWidth || 1;
                slider.scrollTo({ left: width * dotIndex, behavior: "smooth" });
            });
        });

        slider.addEventListener("scroll", updateDots, { passive: true });

        const slidesCount = slider.querySelectorAll("img").length;
        if (slidesCount > 1) {
            window.setInterval(() => {
                const width = slider.clientWidth || 1;
                activeIndex = (activeIndex + 1) % slidesCount;
                slider.scrollTo({ left: width * activeIndex, behavior: "smooth" });
            }, 3500);
        }

        window.addEventListener("resize", () => {
            const width = slider.clientWidth || 1;
            slider.scrollTo({ left: width * activeIndex, behavior: "auto" });
        });

        updateDots();
    }

    document.querySelectorAll("[data-mail-fallback]").forEach((mailLink) => {
        mailLink.addEventListener("click", () => {
            const fallbackSelector = mailLink.getAttribute("data-mail-fallback");
            if (!fallbackSelector) {
                return;
            }
            window.setTimeout(() => {
                if (document.visibilityState !== "visible") {
                    return;
                }
                const target = document.querySelector(fallbackSelector);
                if (target) {
                    scrollToTarget(target, "smooth");
                }
            }, 500);
        });
    });

    document.querySelectorAll("[data-app-deeplink]").forEach((appLink) => {
        appLink.addEventListener("click", (event) => {
            const deepLink = appLink.getAttribute("data-app-deeplink");
            const webLink = appLink.getAttribute("href");
            if (!deepLink || !webLink) {
                return;
            }

            event.preventDefault();
            const startedAt = Date.now();
            window.location.href = deepLink;
            window.setTimeout(() => {
                if (Date.now() - startedAt < 1700) {
                    window.location.href = webLink;
                }
            }, 900);
        });
    });

    const scrollTopBtn = document.querySelector("[data-scroll-top]");
    if (scrollTopBtn) {
        const updateScrollTopState = () => {
            const threshold = 260;
            scrollTopBtn.classList.toggle("visible", window.scrollY > threshold);
        };

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", updateScrollTopState, { passive: true });
        updateScrollTopState();
    }
})();
