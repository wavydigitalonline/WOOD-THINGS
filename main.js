/* Wood & Things — based on Kleeners template interactivity */

(function stickyHeader() {
  var header = document.getElementById("site-header");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

(function mobileMenu() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var icon = document.getElementById("menu-icon");
  if (!toggle || !menu || !icon) return;
  var open = false;
  function setOpen(next) {
    open = next;
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      icon.innerHTML = '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>';
    } else {
      icon.innerHTML = '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>';
    }
  }
  toggle.addEventListener("click", function () { setOpen(!open); });
  menu.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });
})();

(function faqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;
  function closeAll() {
    items.forEach(function (item) {
      item.classList.remove("open");
      var q = item.querySelector(".faq-question");
      if (q) q.setAttribute("aria-expanded", "false");
    });
  }
  function openItem(item) {
    item.classList.add("open");
    var q = item.querySelector(".faq-question");
    if (q) q.setAttribute("aria-expanded", "true");
  }
  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      closeAll();
      if (!isOpen) openItem(item);
    });
  });
  openItem(items[0]);
})();

(function footerYear() {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

(function quoteForm() {
  var form = document.getElementById("quote-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    var text = [
      "Hi Wood & Things — quote request from the website:",
      "",
      "Name: " + (data.name || "-"),
      "Phone: " + (data.phone || "-"),
      data.email ? "Email: " + data.email : null,
      "Project: " + (data.project_type || "-"),
      "Location: " + (data.location || "-"),
      data.message ? "Details: " + data.message : null,
    ].filter(Boolean).join("\n");
    window.open("https://wa.me/27828456999?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();

(function carousel() {
  var el = document.getElementById("carousel");
  var prev = document.getElementById("carouselPrev");
  var next = document.getElementById("carouselNext");
  if (!el || !prev || !next) return;
  function amount() {
    var img = el.querySelector("img");
    return img ? img.getBoundingClientRect().width + 16 : 280;
  }
  prev.addEventListener("click", function () {
    el.scrollBy({ left: -amount(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    el.scrollBy({ left: amount(), behavior: "smooth" });
  });
})();

(function lightbox() {
  var track = document.querySelector(".carousel-track");
  if (!track) return;
  var overlay = document.createElement("div");
  overlay.id = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.style.cssText =
    "display:none;position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.92);align-items:center;justify-content:center;padding:1rem;";
  overlay.innerHTML =
    '<button type="button" id="lightbox-close" aria-label="Close" style="position:absolute;top:1rem;right:1rem;color:#fff;font-size:1.5rem;background:transparent;border:0;cursor:pointer">×</button>' +
    '<img id="lightbox-img" src="" alt="" style="max-width:100%;max-height:90vh;object-fit:contain;border-radius:0.5rem" />';
  document.body.appendChild(overlay);
  var imgEl = document.getElementById("lightbox-img");
  var closeBtn = document.getElementById("lightbox-close");
  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || "";
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  function close() {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }
  track.querySelectorAll("img").forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      open(img.src, img.alt);
    });
  });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
