/* ==========================================================================
   Longhorn Software — Founder page boot (about.html)
   --------------------------------------------------------------------------
   Minimal: fills founder name/role, builds the nav menu (rewriting in-page
   anchors to point back at index.html), wires the hamburger, sets year.
   Prose for the page lives directly in about.html.
   ========================================================================== */

(function () {
  const C = window.LH_CONTENT || {};

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

  // ---- brand / year ------------------------------------------------------
  if (C.brand) {
    $$("[data-brand-name]").forEach((n) => (n.textContent = C.brand.name));
    $$("[data-brand-legal]").forEach((n) => (n.textContent = C.brand.legal));
  }
  $$("[data-year]").forEach((n) => (n.textContent = new Date().getFullYear()));

  // ---- founder header ----------------------------------------------------
  if (C.founder) {
    const eb = $("[data-founder-eyebrow]");
    const nm = $("[data-founder-name]");
    const rl = $("[data-founder-role]");
    if (eb && C.founder.eyebrow) eb.textContent = C.founder.eyebrow;
    if (nm && C.founder.name) nm.textContent = C.founder.name;
    if (rl && C.founder.role) rl.textContent = C.founder.role;
  }

  // ---- nav menu ----------------------------------------------------------
  // In-page anchors (#x) must point back at the homepage from this page.
  const menuInner = $("[data-menu-inner]");
  if (menuInner && Array.isArray(C.nav)) {
    menuInner.innerHTML = "";
    C.nav.forEach((item, i) => {
      const num = String(i + 1).padStart(2, "0");
      const href = item.href.startsWith("#") ? "index.html" + item.href : item.href;
      const current = item.href === "about.html";
      menuInner.appendChild(el(`
        <a href="${escape(href)}" data-menu-link${current ? ' aria-current="page"' : ""}>
          <span><span class="num">${num}</span> &nbsp;${escape(item.label)}</span>
          ${item.note ? `<span class="note">${escape(item.note)}</span>` : ""}
        </a>
      `));
    });
    menuInner.appendChild(el(`
      <a href="index.html" data-menu-link class="menu-page-link">
        <span>Home</span>
        <span class="menu-arrow" aria-hidden="true">&rarr;</span>
      </a>
    `));
  }
  const menu = $("[data-menu]");
  const ham = $("[data-hamburger]");
  const nav = document.querySelector(".nav");
  const setMenu = (open) => {
    ham.setAttribute("aria-expanded", String(open));
    menu.setAttribute("data-open", String(open));
    if (nav) nav.toggleAttribute("data-menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (ham) {
    ham.addEventListener("click", () => {
      setMenu(ham.getAttribute("aria-expanded") !== "true");
    });
  }
  if (menuInner) {
    menuInner.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const url = new URL(a.href, location.href);
      const samePage = url.pathname === location.pathname;
      // Only animate the close for same-page anchors. For cross-document
      // links, a fade would be interrupted by navigation and stutter — leave
      // the (dark) overlay up until the new page paints for a seamless swap.
      if (samePage) setMenu(false);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
})();
