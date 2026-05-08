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
  $("[data-hero-eyebrow]").textContent = C.hero.eyebrow;
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
    <div class="svc-item">
      <div class="n">${escape(it.n)}</div>
      <div>
        <h3>${escape(it.title)}</h3>
        <p>${escape(it.body)}</p>
      </div>
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
  $("[data-costs-closer-label]").textContent = C.hiddenCosts.closer.label;
  $("[data-costs-closer-body]").textContent = C.hiddenCosts.closer.body;

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
  $("[data-label-company]").textContent = f.company;
  $("[data-label-projectType]").textContent = f.projectType;
  $("[data-label-budget]").textContent = f.budget;
  $("[data-label-description]").firstChild.nodeValue = f.description + " ";

  const projectSel = $("#projectType");
  projectSel.innerHTML = '<option value="" disabled selected hidden>Select…</option>' +
    C.intake.projectTypes.map((t) => `<option>${escape(t)}</option>`).join("");
  const budgetSel = $("#budget");
  budgetSel.innerHTML = '<option value="" disabled selected hidden>Select…</option>' +
    C.intake.budgets.map((b) => `<option>${escape(b)}</option>`).join("");

  $("[data-intake-submit]").textContent = C.intake.submit;
  $("[data-intake-success]").textContent = C.intake.success;

  // ---- footer -------------------------------------------------------------
  $("[data-footer-blurb]").textContent = C.footer.blurb;
  const fLinks = $("[data-footer-links]");
  fLinks.innerHTML = "";
  C.footer.links.forEach((l) =>
    fLinks.appendChild(el(`<a href="${escape(l.href)}">${escape(l.label)}</a>`))
  );

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
  const setMenu = (open) => {
    ham.setAttribute("aria-expanded", String(open));
    menu.setAttribute("data-open", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  ham.addEventListener("click", () => {
    const open = ham.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });
  // close menu on link click
  menuInner.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    setMenu(false);
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
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // ====================================================================
    // TODO: form submission handler
    // Wire to your endpoint here, e.g. fetch('/api/contact', {method:'POST', ...})
    // For now we just show the success message.
    // ====================================================================
    form.classList.add("is-submitted");
    success.classList.add("is-shown");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
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
