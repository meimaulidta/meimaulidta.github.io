(() => {
  "use strict";

  const html = document.documentElement;
  const body = document.body;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  let reducedMotion = motionQuery.matches;
  let finePointer = pointerQuery.matches;

  const prefersReduced = () => reducedMotion;
  const canAnimate = () => !reducedMotion;
  const canUsePointer = () => finePointer && !reducedMotion;

  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const meta = document.getElementById("meta-theme");
    if (!toggle) return;

    const applyTheme = (theme, persist = true) => {
      const nextTheme = theme === "light" ? "light" : "dark";
      html.setAttribute("data-theme", nextTheme);
      toggle.setAttribute("aria-label", nextTheme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
      toggle.setAttribute("title", nextTheme === "dark" ? "Mode terang" : "Mode gelap");
      if (meta) meta.setAttribute("content", nextTheme === "dark" ? "#05060f" : "#eef6ff");
      if (persist) {
        try {
          localStorage.setItem("portfolio-theme-v2", nextTheme);
        } catch (error) {}
      }
    };

    applyTheme(html.getAttribute("data-theme") || "light", false);
    toggle.addEventListener("click", () => {
      applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  function initPreloader() {
    const preloader = document.querySelector(".preloader");
    const counter = document.getElementById("loader-count");
    const bar = preloader ? preloader.querySelector(".preloader__bar span") : null;
    let finished = false;

    const startIntro = () => {
      body.classList.add("intro-ready");
      if (!canAnimate()) return;

      const gsap = window.gsap;
      if (!gsap && typeof Element.prototype.animate !== "function") return;
      const animate = (element, keyframes, options) => {
        if (!element) return;
        const animation = element.animate(keyframes, {
          fill: "both",
          ...options
        });
        animation.onfinish = () => animation.cancel();
      };
      const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

      if (gsap) {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline.fromTo(
          ".hero__line-inner",
          { yPercent: 116 },
          {
            yPercent: 0,
            duration: 0.78,
            stagger: 0.11,
            clearProps: "transform"
          },
          0
        );
        timeline.fromTo(
          ".hero__copy > .eyebrow.hero-anim",
          {
            autoAlpha: 0,
            x: -14,
            clipPath: "inset(0 100% 0 0 round 999px)"
          },
          {
            autoAlpha: 1,
            x: 0,
            clipPath: "inset(0 0 0 0 round 999px)",
            duration: 0.7,
            clearProps: "clipPath,transform,opacity,visibility"
          },
          0.08
        );
        timeline.fromTo(
          ".hero__lead.hero-anim",
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            clearProps: "transform,opacity,visibility"
          },
          0.34
        );
        timeline.fromTo(
          ".hero__actions.hero-anim",
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            clearProps: "transform,opacity,visibility"
          },
          0.44
        );
        timeline.fromTo(
          ".hero__visual.hero-anim",
          { autoAlpha: 0, x: 24, y: 8, scale: 0.975 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.78,
            clearProps: "transform,opacity,visibility"
          },
          0.24
        );
        return;
      }

      document.querySelectorAll(".hero__line-inner").forEach((line, index) => {
        animate(line, [{
          transform: "translate3d(0, 116%, 0)"
        }, {
          transform: "translate3d(0, 0, 0)"
        }], {
          duration: 780,
          delay: 60 + index * 110,
          easing
        });
      });

      animate(document.querySelector(".hero__copy > .eyebrow.hero-anim"), [
        {
          opacity: 0,
          transform: "translate3d(-14px, 0, 0)",
          clipPath: "inset(0 100% 0 0 round 999px)"
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          clipPath: "inset(0 0 0 0 round 999px)"
        }
      ], {
        duration: 700,
        delay: 100,
        easing
      });

      animate(document.querySelector(".hero__lead.hero-anim"), [
        { opacity: 0, transform: "translate3d(0, 14px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" }
      ], {
        duration: 620,
        delay: 340,
        easing
      });

      animate(document.querySelector(".hero__actions.hero-anim"), [
        { opacity: 0, transform: "translate3d(0, 14px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" }
      ], {
        duration: 620,
        delay: 440,
        easing
      });

      animate(document.querySelector(".hero__visual.hero-anim"), [
        {
          opacity: 0,
          transform: "translate3d(24px, 8px, 0) scale(0.975)"
        },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }
      ], {
        duration: 780,
        delay: 240,
        easing
      });

    };

    const finish = () => {
      if (finished) return;
      finished = true;
      if (counter) counter.textContent = "100";
      if (bar) bar.style.transform = "scaleX(1)";
      body.classList.remove("is-loading");
      body.classList.add("is-loaded");
      if (preloader) preloader.setAttribute("aria-hidden", "true");

      requestAnimationFrame(() => {
        requestAnimationFrame(startIntro);
      });
    };

    if (!preloader || !counter) {
      finish();
      return;
    }

    if (!canAnimate()) {
      finish();
      return;
    }

    const duration = 260;
    let startedAt = null;

    const tick = (timestamp) => {
      if (startedAt === null) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * 100);
      counter.textContent = String(value).padStart(2, "0");
      if (bar) bar.style.transform = `scaleX(${eased})`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        window.setTimeout(finish, 40);
      }
    };

    requestAnimationFrame(tick);
  }

  function initClock() {
    const headerClock = document.getElementById("header-clock");
    const footerClock = document.getElementById("footer-clock");
    if (!headerClock && !footerClock) return;

    let formatter;
    try {
      formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch (error) {
      formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    }

    const update = () => {
      const time = formatter.format(new Date());
      if (headerClock) headerClock.textContent = `SBY ${time}`;
      if (footerClock) footerClock.textContent = `SBY ${time}`;
    };

    update();
    window.setInterval(update, 30000);
  }

  function initHeader() {
    const header = document.getElementById("site-header");
    const progress = document.querySelector(".scroll-progress span");
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const menuOpen = body.classList.contains("menu-open");

      header.classList.toggle("is-scrolled", y > 24);

      if (!menuOpen) {
        const scrollingDown = y > lastY;
        if (scrollingDown && y > 680) {
          header.classList.add("is-hidden");
        } else {
          header.classList.remove("is-hidden");
        }
      } else {
        header.classList.remove("is-hidden");
      }

      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const amount = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
        progress.style.transform = `scaleX(${amount})`;
      }

      lastY = y;
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });
    window.addEventListener("resize", requestUpdate, {
      passive: true
    });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
    requestUpdate();
  }

  function initScrollEffects() {
    const parallaxStates = Array.from(document.querySelectorAll("[data-parallax]")).map((element) => ({
      element,
      holder: element.parentElement,
      speed: Number.parseFloat(element.dataset.parallax) || 5,
      current: 0
    }));
    const burstStates = Array.from(document.querySelectorAll("[data-burst-section]")).map((element) => ({
      element,
      current: 0
    }));

    if (!parallaxStates.length && !burstStates.length) return;

    if (!canAnimate()) {
      parallaxStates.forEach((state) => {
        state.element.style.transform = "scale(1.06)";
      });
      burstStates.forEach((state) => state.element.style.setProperty("--burst", "0.65"));
      return;
    }

    let framePending = false;

    const update = () => {
      framePending = false;
      const viewport = window.innerHeight;
      let settling = false;

      const parallaxReads = parallaxStates.map((state) => ({
        state,
        rect: state.holder ? state.holder.getBoundingClientRect() : null
      }));
      const burstReads = burstStates.map((state) => ({
        state,
        rect: state.element.getBoundingClientRect()
      }));

      parallaxReads.forEach(({ state, rect }) => {
        if (!rect || rect.bottom < -220 || rect.top > viewport + 220) return;
        const offset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const target = offset * state.speed;
        state.current += (target - state.current) * 0.14;
        state.element.style.transform = `translate3d(0, ${state.current.toFixed(2)}%, 0) scale(1.14)`;
        if (Math.abs(target - state.current) > 0.02) settling = true;
      });

      burstReads.forEach(({ state, rect }) => {
        if (rect.bottom < -viewport || rect.top > viewport * 2) return;
        const total = rect.height + viewport;
        const target = Math.min(Math.max((viewport - rect.top) / total, 0), 1);
        state.current += (target - state.current) * 0.12;
        state.element.style.setProperty("--burst", state.current.toFixed(3));
        const shift = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        state.element.style.setProperty("--parallax", `${(shift * -90).toFixed(2)}px`);
        if (Math.abs(target - state.current) > 0.002) settling = true;
      });

      if (settling) requestUpdate();
    };

    const requestUpdate = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();
  }

  function initMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.getElementById("menu-toggle");
    if (!menu || !toggle) return;

    const label = toggle.querySelector(".menu-toggle__label");
    const links = menu.querySelectorAll("[data-menu-link]");

    menu.inert = true;

    const focusable = () => Array.from(menu.querySelectorAll('a[href], button:not([disabled])')).filter((element) => !element.hasAttribute("hidden"));

    const onKeydown = (event) => {
      if (!body.classList.contains("menu-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const openMenu = () => {
      body.classList.add("menu-open");
      menu.inert = false;
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Tutup menu");
      if (label) label.textContent = "Tutup";
      document.addEventListener("keydown", onKeydown);
      window.setTimeout(() => {
        const items = focusable();
        if (items.length) items[0].focus({
          preventScroll: true
        });
      }, 420);
    };

    const closeMenu = (restoreFocus = true) => {
      if (!body.classList.contains("menu-open")) return;
      body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu");
      if (label) label.textContent = "Menu";
      document.removeEventListener("keydown", onKeydown);
      menu.setAttribute("aria-hidden", "true");
      if (restoreFocus) toggle.focus({
        preventScroll: true
      });
      window.setTimeout(() => {
        if (!body.classList.contains("menu-open")) menu.inert = true;
      }, 650);
    };

    toggle.addEventListener("click", () => {
      if (body.classList.contains("menu-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const onDesktop = (event) => {
      if (event.matches) closeMenu(false);
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", onDesktop);
    } else {
      desktopQuery.addListener(onDesktop);
    }
  }

  function initCursor() {
    const cursor = document.querySelector(".cursor");
    if (!cursor || !canUsePointer()) return;

    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    const label = cursor.querySelector(".cursor__label");
    if (!dot || !ring) return;

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      visible: false
    };

    let framePending = false;

    const render = () => {
      framePending = false;
      state.ringX += (state.x - state.ringX) * 0.16;
      state.ringY += (state.y - state.ringY) * 0.16;
      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(state.x - state.ringX) > 0.4 || Math.abs(state.y - state.ringY) > 0.4) {
        requestRender();
      }
    };

    const requestRender = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(render);
    };

    const updateTarget = (target) => {
      const interactive = target.closest("a, button, [data-cursor]");
      const labelTarget = target.closest("[data-cursor]");
      cursor.classList.toggle("is-active", Boolean(interactive));
      cursor.classList.toggle("has-label", Boolean(labelTarget));
      if (label) label.textContent = labelTarget ? labelTarget.dataset.cursor : "";
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        state.x = event.clientX;
        state.y = event.clientY;
        if (!state.visible) {
          state.ringX = state.x;
          state.ringY = state.y;
          state.visible = true;
          html.classList.add("has-cursor");
          cursor.classList.remove("is-out");
        }
        updateTarget(event.target);
        requestRender();
      }, {
        passive: true
      }
    );

    document.addEventListener("pointerleave", () => cursor.classList.add("is-out"));
    document.addEventListener("pointerenter", () => cursor.classList.remove("is-out"));
    window.addEventListener("pointerdown", () => cursor.classList.add("is-pressed"));
    window.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"));
    window.addEventListener("blur", () => cursor.classList.add("is-out"));

  }

  function initMagnetic() {
    if (!canUsePointer()) return;
    const items = document.querySelectorAll("[data-magnetic]");

    items.forEach((item) => {
      item.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "mouse") return;
        item.style.transition = "transform 0.18s linear";
      });

      item.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        const rect = item.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const strength = item.classList.contains("brand") ? 0.3 : 0.22;
        item.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });

      item.addEventListener("pointerleave", () => {
        item.style.transition = "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
        item.style.transform = "translate3d(0, 0, 0)";
      });
    });
  }

  function initTilt() {
    if (!canUsePointer()) return;
    const cards = document.querySelectorAll("[data-tilt]");

    cards.forEach((card) => {
      const media = card.querySelector(".work-card__media");

      card.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        if (card.hasAttribute("data-reveal") && !card.classList.contains("is-visible")) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transition = "transform 0.18s linear";
        card.style.transform = `perspective(1100px) rotateX(${-y * 2.4}deg) rotateY(${x * 2.8}deg) translate3d(0, -4px, 0)`;
        if (media) {
          const mRect = media.getBoundingClientRect();
          media.style.setProperty("--gx", `${((event.clientX - mRect.left) / mRect.width) * 100}%`);
          media.style.setProperty("--gy", `${((event.clientY - mRect.top) / mRect.height) * 100}%`);
        }
      });

      card.addEventListener("pointerleave", () => {
        card.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "";
      });
    });
  }

  function initHeroGlow() {
    const hero = document.querySelector(".hero");
    if (!hero || !canUsePointer()) return;

    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mx", `${x}%`);
        hero.style.setProperty("--my", `${y}%`);
      }, {
        passive: true
      }
    );
  }

  function splitWords(element) {
    if (element.dataset.splitReady === "true") return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let index = 0;

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        const word = document.createElement("span");
        word.className = "word";
        word.style.setProperty("--word-index", index);
        word.textContent = part;
        fragment.appendChild(word);
        index += 1;
      });
      if (node.parentNode) node.parentNode.replaceChild(fragment, node);
    });

    element.dataset.splitReady = "true";
  }

  function initReveal() {
    const splitElements = document.querySelectorAll("[data-split]");
    splitElements.forEach(splitWords);

    const items = document.querySelectorAll("[data-reveal], [data-split]");

    if (!canAnimate() || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    if (window.AOS) {
      const compactViewport = window.matchMedia("(max-width: 1180px)").matches;
      const revealDuration = compactViewport ? 620 : 820;
      const revealStagger = compactViewport ? 32 : 70;
      const maxRevealDelay = compactViewport ? 96 : 280;
      const aosMotions = {
        about: (index) => (index % 2 ? "fade-left" : "fade-right"),
        experience: () => "fade-up",
        tools: () => "zoom-in",
        work: () => "fade-up",
        certificates: (index) => (index % 2 ? "fade-left" : "fade-right"),
        services: () => "zoom-in-up",
        testimonials: (index) => (index % 2 ? "fade-left" : "fade-right"),
        contact: () => "zoom-in",
        footer: () => "fade-up"
      };

      document.addEventListener("aos:in", (event) => {
        if (event.detail instanceof Element) {
          event.detail.classList.add("is-visible");
        }
      });

      items.forEach((item) => {
        const section = item.closest("section, footer");
        const sectionName = section && (section.id || "footer");
        const siblings = Array.from(
          item.parentElement.querySelectorAll("[data-reveal], [data-split]")
        ).filter((sibling) => sibling.parentElement === item.parentElement);
        const index = Math.max(siblings.indexOf(item), 0);

        item.dataset.aos = aosMotions[sectionName]
          ? aosMotions[sectionName](index)
          : "fade-up";
        item.dataset.aosDuration = String(
          compactViewport
            ? revealDuration
            : sectionName === "contact"
              ? 900
              : revealDuration
        );
        item.dataset.aosDelay = String(
          Math.min(index * revealStagger, maxRevealDelay)
        );
        item.dataset.aosEasing = "ease-out-cubic";
      });

      if (compactViewport) {
        const observer = new IntersectionObserver(
          (entries, revealObserver) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible", "aos-init", "aos-animate");
              revealObserver.unobserve(entry.target);
            });
          },
          {
            rootMargin: "0px 0px 220px 0px",
            threshold: 0
          }
        );

        items.forEach((item) => observer.observe(item));
        body.classList.add("reveal-ready");
        return;
      }

      window.AOS.init({
        once: true,
        duration: revealDuration,
        easing: "ease-out-cubic",
        offset: 80,
        disable: () => !canAnimate()
      });
      body.classList.add("reveal-ready");
      return;
    }

    const revealMotions = {
      about: (index) => ({
        from: { x: index % 2 ? 18 : -18, y: 8, scale: 0.99, autoAlpha: 0 },
        duration: 0.82
      }),
      experience: (index) => ({
        from: { x: index % 2 ? 20 : -20, scale: 0.99, autoAlpha: 0 },
        duration: 0.86
      }),
      tools: () => ({
        from: { y: 16, scale: 0.94, autoAlpha: 0 },
        duration: 0.76
      }),
      work: (index) => ({
        from: { y: index % 2 ? 18 : 12, scale: 0.975, autoAlpha: 0 },
        duration: 0.84
      }),
      certificates: (index) => ({
        from: { x: index % 2 ? 16 : -16, y: 10, scale: 0.985, autoAlpha: 0 },
        duration: 0.82
      }),
      services: () => ({
        from: { y: 22, scale: 0.97, autoAlpha: 0 },
        duration: 0.82
      }),
      testimonials: (index) => ({
        from: { x: index % 2 ? 20 : -20, y: 12, scale: 0.985, autoAlpha: 0 },
        duration: 0.86
      }),
      contact: () => ({
        from: { y: 18, scale: 0.94, autoAlpha: 0 },
        duration: 0.9
      }),
      footer: (index) => ({
        from: { y: index ? 18 : 12, autoAlpha: 0 },
        duration: 0.82
      })
    };
    const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          element.classList.add("is-visible");

          if (typeof element.animate === "function") {
            const section = element.closest("section, footer");
            const sectionName = section && (section.id || "footer");
            const siblings = Array.from(
              element.parentElement.querySelectorAll("[data-reveal], [data-split]")
            ).filter((sibling) => sibling.parentElement === element.parentElement);
            const index = Math.max(siblings.indexOf(element), 0);
            const motion = revealMotions[sectionName]
              ? revealMotions[sectionName](index)
              : {
                  from: { y: 12, autoAlpha: 0 },
                  duration: 0.8
                };

            const delay = Math.min(index * 0.07, 0.28);
            if (window.gsap) {
              window.gsap.fromTo(element, motion.from, {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: motion.duration,
                delay,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility"
              });
            } else {
              const { x = 0, y = 0, scale = 1 } = motion.from;
              const animation = element.animate([
                {
                  opacity: 0,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0) scale(1)"
                }
              ], {
                duration: motion.duration * 1000,
                delay: delay * 1000,
                easing,
                fill: "both"
              });
              animation.onfinish = () => animation.cancel();
            }
          }

          observer.unobserve(entry.target);
        });
      }, {
        rootMargin: "18% 0px 12% 0px",
        threshold: 0.01
      }
    );

    items.forEach((item) => observer.observe(item));
    body.classList.add("reveal-ready");
  }

  function initSectionMotion() {
    const sections = document.querySelectorAll(
      ".hero, .marquee, .experience, .tools, .work, .certificates, .services, .testimonials, .contact, .footer"
    );
    if (!sections.length) return;

    if (!canAnimate() || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        });
      }, {
        rootMargin: "120px 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!canAnimate() || !("IntersectionObserver" in window)) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.count;
      });
      return;
    }

    const animateCounter = (element) => {
      const target = Number.parseInt(element.dataset.count, 10) || 0;
      const start = performance.now();
      const duration = 1500;

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
        else element.textContent = String(target);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.6
      }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initAccordion() {
    const accordion = document.querySelector("[data-accordion]");
    if (!accordion) return;
    const items = Array.from(accordion.querySelectorAll(".service"));

    const setOpen = (item, open) => {
      item.classList.toggle("is-open", open);
      const trigger = item.querySelector(".service__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", String(open));
    };

    items.forEach((item) => {
      const trigger = item.querySelector(".service__trigger");
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        const shouldOpen = !item.classList.contains("is-open");
        items.forEach((other) => setOpen(other, false));
        if (shouldOpen) setOpen(item, true);
      });
    });
  }

  function initImagePreview() {
    const dialog = document.getElementById("image-preview");
    const previewImage = dialog ? dialog.querySelector(".image-preview__image") : null;
    const previewTitle = dialog ? dialog.querySelector("#image-preview-title") : null;
    const closeButton = dialog ? dialog.querySelector(".image-preview__close") : null;
    if (!dialog || !previewImage || !previewTitle || !closeButton) return;

    document.querySelectorAll("[data-image-preview]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const image = trigger.querySelector("img");
        const card = trigger.closest(".work-card");
        const cardTitle = card ? card.querySelector("h3") : null;
        if (!image) return;

        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt;
        previewTitle.textContent = cardTitle
          ? cardTitle.textContent.trim()
          : image.alt;
        dialog.showModal();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function initActiveNav() {
    const links = document.querySelectorAll("[data-nav]");
    const sections = Array.from(links)
      .map((link) => document.getElementById(link.dataset.nav))
      .filter(Boolean);
    if (!links.length || !sections.length) return;

    let currentId = null;
    let ticking = false;

    const setActive = (id) => {
      if (id === currentId) return;
      currentId = id;
      links.forEach((link) => {
        const active = link.dataset.nav === id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let next = null;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (marker >= top && marker < bottom) next = section.id;
      });
      setActive(next);
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });
    window.addEventListener("resize", requestUpdate, {
      passive: true
    });
    update();
  }

  function initMisc() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initTheme();
  initPreloader();
  initClock();
  initHeader();
  initScrollEffects();
  initMobileMenu();
  initCursor();
  initMagnetic();
  initTilt();
  initHeroGlow();
  initReveal();
  initSectionMotion();
  initCounters();
  initAccordion();
  initImagePreview();
  initActiveNav();
  initMisc();

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", (event) => {
      reducedMotion = event.matches;
    });
  }

  if (typeof pointerQuery.addEventListener === "function") {
    pointerQuery.addEventListener("change", (event) => {
      finePointer = event.matches;
    });
  }
})();