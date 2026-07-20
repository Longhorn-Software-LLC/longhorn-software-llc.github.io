/* ==========================================================================
   Longhorn Software — App boot
   --------------------------------------------------------------------------
   - Populates page from window.LH_CONTENT
   - Wires hamburger menu, About modal, intake form
   - No frameworks. Plain DOM.
   ========================================================================== */

(function () {
  const C = window.LH_CONTENT;
  if (!C) { console.error("Content not loaded"); return; }

  // ---- meta ---------------------------------------------------------------
  document.title = C.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", C.meta.description);

  // ---- helpers ------------------------------------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  // ---- custom dropdown ----------------------------------------------------
  // Replaces a native <select> with a styled listbox we fully control, while
  // keeping the original element in the form as the value source.
  const enhanceSelect = (native) => {
    const options = Array.from(native.options).filter((o) => !o.disabled);
    const placeholder = (native.querySelector("option[disabled]") || {}).textContent || "Select…";

    const wrap = el(`<div class="cs" data-cs></div>`);
    const trigger = el(`
      <button type="button" class="cs-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span class="cs-value is-placeholder">${escape(placeholder)}</span>
        <span class="cs-arrow" aria-hidden="true"></span>
      </button>`);
    const list = el(`<ul class="cs-list" role="listbox" tabindex="-1"></ul>`);
    options.forEach((o, i) => {
      const li = el(`<li class="cs-option" role="option" data-i="${i}">${escape(o.text)}</li>`);
      list.appendChild(li);
    });

    native.parentNode.insertBefore(wrap, native);
    wrap.appendChild(trigger);
    wrap.appendChild(list);
    wrap.appendChild(native);
    native.classList.add("cs-native");

    const valueEl = trigger.querySelector(".cs-value");
    const items = Array.from(list.children);
    let activeIdx = -1;

    const open = () => {
      wrap.setAttribute("data-open", "true");
      trigger.setAttribute("aria-expanded", "true");
      const sel = items.findIndex((it) => it.getAttribute("aria-selected") === "true");
      setActive(sel >= 0 ? sel : 0);
      list.focus();
    };
    const close = () => {
      wrap.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    const setActive = (idx) => {
      items.forEach((it, i) => it.classList.toggle("is-active", i === idx));
      activeIdx = idx;
      if (items[idx]) items[idx].scrollIntoView({ block: "nearest" });
    };
    const choose = (idx) => {
      const o = options[idx];
      native.value = o.value || o.text;
      native.dispatchEvent(new Event("change", { bubbles: true }));
      items.forEach((it, i) => it.setAttribute("aria-selected", String(i === idx)));
      valueEl.textContent = o.text;
      valueEl.classList.remove("is-placeholder");
      close();
      trigger.focus();
    };

    trigger.addEventListener("click", () =>
      wrap.hasAttribute("data-open") ? close() : open()
    );
    items.forEach((it, i) => {
      it.addEventListener("mouseenter", () => setActive(i));
      it.addEventListener("click", () => choose(i));
    });
    list.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (activeIdx >= 0) choose(activeIdx); }
      else if (e.key === "Escape") { e.preventDefault(); close(); trigger.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) close();
    });
  };

  // ---- brand --------------------------------------------------------------
  $$("[data-brand-name]").forEach((n) => (n.textContent = C.brand.name));
  $$("[data-brand-legal]").forEach((n) => (n.textContent = C.brand.legal));
  $$("[data-brand-email]").forEach((n) => {
    if (C.brand.email) {
      n.textContent = C.brand.email;
      n.setAttribute("href", "mailto:" + C.brand.email);
    } else {
      // Hide email row entirely until a real address is set
      const row = n.closest("div");
      if (row) row.style.display = "none";
      else n.style.display = "none";
    }
  });
  $$("[data-brand-location]").forEach((n) => (n.textContent = C.brand.location));
  $$("[data-brand-est]").forEach((n) => (n.textContent = C.brand.established));
  $$("[data-year]").forEach((n) => (n.textContent = new Date().getFullYear()));

  // ---- hero ---------------------------------------------------------------
  const heroEyebrow = $("[data-hero-eyebrow]");
  if (heroEyebrow) heroEyebrow.textContent = C.hero.eyebrow;
  $("[data-hero-tagline]").textContent = C.hero.tagline;

  function renderHeadline(idx) {
    const opts = C.hero.headlineOptions || [];
    const opt = opts[idx] || opts[0];
    if (!opt) return;
    $("[data-hero-headline]").innerHTML = opt.lines
      .map((line, i) =>
        `<span class="line${i === opt.accentLine ? " accent" : ""}">${escape(line)}</span>`
      )
      .join("");
  }
  renderHeadline((window.__TWEAKS__ && window.__TWEAKS__.headlineId) || 0);
  const ctaP = $("[data-hero-cta-primary]");
  ctaP.querySelector("span.l").textContent = C.hero.ctaPrimary.label;
  ctaP.setAttribute("href", C.hero.ctaPrimary.href);
  const ctaS = $("[data-hero-cta-secondary]");
  ctaS.querySelector("span.l").textContent = C.hero.ctaSecondary.label;
  ctaS.setAttribute("href", C.hero.ctaSecondary.href);

// ---- about --------------------------------------------------------------
if (C.about) {
  const aboutEyebrow = $("[data-about-eyebrow]");
  const aboutHeadline = $("[data-about-headline]");
  const aboutBody = $("[data-about-body]");
  if (aboutEyebrow) aboutEyebrow.textContent = C.about.eyebrow;
  if (aboutHeadline) aboutHeadline.textContent = C.about.headline;
  if (aboutBody) aboutBody.textContent = C.about.body;
}

// ---- services -----------------------------------------------------------
$("[data-svc-eyebrow]").textContent = C.services.eyebrow;
$("[data-svc-headline]").textContent = C.services.headline;
$("[data-svc-lede]").textContent = C.services.lede;

const svcGrid = $("[data-svc-grid]");
svcGrid.innerHTML = "";
C.services.items.forEach((it) => {
  svcGrid.appendChild(el(`
    <div class="svc-item${it.feature ? " svc-item--feature" : ""}">
      ${it.feature ? '<div class="svc-inner">' : ""}
      <div class="n">${escape(it.n)}</div>
      <div>
        <h3>${escape(it.title)}</h3>
        <p>${escape(it.body)}</p>
      </div>
      ${it.feature ? "</div>" : ""}
    </div>
  `));
});


  // ---- hidden costs -------------------------------------------------------
  $("[data-costs-eyebrow]").textContent = C.hiddenCosts.eyebrow;
  $("[data-costs-lede]").textContent = C.hiddenCosts.lede;

  function renderCostsHeadline(idx) {
    const opts = C.hiddenCosts.headlineOptions || [];
    $("[data-costs-headline]").textContent = opts[idx] || opts[0] || "";
  }
  renderCostsHeadline((window.__TWEAKS__ && window.__TWEAKS__.costsHeadlineId) || 0);
  const cList = $("[data-costs-list]");
  cList.innerHTML = "";
  C.hiddenCosts.points.forEach((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    cList.appendChild(el(`
      <article class="cost">
        <div class="n">${n} / ${String(C.hiddenCosts.points.length).padStart(2, "0")}</div>
        <h3>${escape(p.title)}</h3>
        <p>${escape(p.body)}</p>
      </article>
    `));
  });

  // ---- training -----------------------------------------------------------
  $("[data-training-eyebrow]").textContent = C.training.eyebrow;
  $("[data-training-headline]").textContent = C.training.headline;
  $("[data-training-body]").textContent = C.training.body;
  const tList = $("[data-training-bullets]");
  tList.innerHTML = "";
  C.training.bullets.forEach((b) => tList.appendChild(el(`<li>${escape(b)}</li>`)));
  const tCta = $("[data-training-cta]");
  tCta.querySelector("span.l").textContent = C.training.cta.label;
  tCta.setAttribute("href", C.training.cta.href);

  // ---- intake -------------------------------------------------------------
  $("[data-intake-eyebrow]").textContent = C.intake.eyebrow;
  $("[data-intake-headline]").textContent = C.intake.headline;
  $("[data-intake-body]").textContent = C.intake.body;
  const f = C.intake.fields;
  $("[data-label-name]").firstChild.nodeValue = f.name + " ";
  $("[data-label-email]").firstChild.nodeValue = f.email + " ";
  $("[data-label-projectType]").firstChild.nodeValue = f.projectType + " ";
  $("[data-label-description]").firstChild.nodeValue = f.description + " ";

  const projectSel = $("#projectType");
  projectSel.innerHTML = '<option value="" disabled selected hidden>Select…</option>' +
    C.intake.projectTypes.map((t) => `<option>${escape(t)}</option>`).join("");
  enhanceSelect(projectSel);

  $("[data-intake-submit]").textContent = C.intake.submit;
  $("[data-intake-success]").textContent = C.intake.success;

  // ---- footer -------------------------------------------------------------
  $("[data-footer-blurb]").textContent = C.footer.blurb;

  // ---- nav menu -----------------------------------------------------------
  const menu = $("[data-menu]");
  const menuInner = $("[data-menu-inner]");
  menuInner.innerHTML = "";
  C.nav.forEach((item, i) => {
    const num = String(i + 1).padStart(2, "0");
    menuInner.appendChild(el(`
      <a href="${escape(item.href)}" data-menu-link>
        <span><span class="num">${num}</span> &nbsp;${escape(item.label)}</span>
        ${item.note ? `<span class="note">${escape(item.note)}</span>` : ""}
      </a>
    `));
  });
  const ham = $("[data-hamburger]");
  const nav = document.querySelector(".nav");
  const setMenu = (open) => {
    ham.setAttribute("aria-expanded", String(open));
    menu.setAttribute("data-open", String(open));
    if (nav) nav.toggleAttribute("data-menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  // ---- scroll-reveal nav logo --------------------------------------------
  // Hidden at the top (hero masthead is the only logo); fades+slides in once
  // the hero logo scrolls out of view.
  const heroLogo = document.querySelector(".hero-logo");
  if (nav && heroLogo && "IntersectionObserver" in window) {
    nav.setAttribute("data-reveal-logo", "");
    const io = new IntersectionObserver(
      ([entry]) => nav.toggleAttribute("data-logo-shown", !entry.isIntersecting),
      { rootMargin: "-8px 0px 0px 0px", threshold: 0 }
    );
    io.observe(heroLogo);
  }
  ham.addEventListener("click", () => {
    const open = ham.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });
  // close menu on link click
  menuInner.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const url = new URL(a.href, location.href);
    // Only animate the close for same-page anchors; a fade during a real
    // navigation gets interrupted and stutters.
    if (url.pathname === location.pathname) setMenu(false);
  });
  // esc closes menu/modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      $("[data-modal]").setAttribute("data-open", "false");
    }
  });

  // ---- about modal --------------------------------------------------------
  $("[data-modal-close]").addEventListener("click", () => {
    $("[data-modal]").setAttribute("data-open", "false");
  });
  $("[data-modal]").addEventListener("click", (e) => {
    if (e.target.matches("[data-modal]")) {
      e.currentTarget.setAttribute("data-open", "false");
    }
  });

  // ---- form ---------------------------------------------------------------
  const form = $("[data-form]");
  const success = $("[data-intake-success]");
  const submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    submitBtn.disabled = true;
    form.classList.remove("has-error");
    try {
      const res = await fetch("https://formspree.io/f/mjgqbnpp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.classList.add("is-submitted");
        success.textContent = C.intake.success;
        success.classList.add("is-shown");
      } else {
        const data = await res.json().catch(() => null);
        const msg = data && data.errors
          ? data.errors.map((x) => x.message).join(", ")
          : "Something went wrong. Please email us directly.";
        success.textContent = msg;
        success.classList.add("is-shown");
        form.classList.add("has-error");
        submitBtn.disabled = false;
      }
    } catch {
      success.textContent = "Network error. Please email us directly.";
      success.classList.add("is-shown");
      form.classList.add("has-error");
      submitBtn.disabled = false;
    }
  });

  // ---- tweaks bridge: re-apply tweak-controlled bits on every change ------
  window.applyTweaks = function (state) {
    if (!state) return;
    if (typeof state.headlineId === "number") renderHeadline(state.headlineId);
    if (typeof state.costsHeadlineId === "number") renderCostsHeadline(state.costsHeadlineId);
  };

  // ---- subtle parallax-ish year mark in hero (purely cosmetic) -----------
  // (kept tiny; no perf cost)
  const heroMeta = $(".hero-meta");
  if (heroMeta) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 400);
      heroMeta.style.opacity = String(Math.max(0, 1 - y / 280));
    }, { passive: true });
  }
})();
