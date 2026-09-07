/* Wood & Things — interactivity */

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

/* Multiple category carousels */
(function carousels() {
  document.querySelectorAll(".work-category").forEach(function (block) {
    var el = block.querySelector(".carousel");
    var prev = block.querySelector(".carousel-prev");
    var next = block.querySelector(".carousel-next");
    if (!el || !prev || !next) return;
    function amount() {
      var img = el.querySelector("img");
      return img ? img.getBoundingClientRect().width + 14 : 280;
    }
    prev.addEventListener("click", function () {
      el.scrollBy({ left: -amount(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      el.scrollBy({ left: amount(), behavior: "smooth" });
    });
  });
})();

/* Lightbox for all work images + swipe between images in same category */
(function lightbox() {
  var tracks = document.querySelectorAll(".carousel-track");
  if (!tracks.length) return;

  var overlay = document.createElement("div");
  overlay.id = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("hidden", "");
  overlay.className = "lightbox";
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close">×</button>' +
    '<button type="button" class="lightbox-nav prev" id="lightbox-prev" aria-label="Previous">‹</button>' +
    '<img class="lightbox-img" id="lightbox-img" src="" alt="" />' +
    '<button type="button" class="lightbox-nav next" id="lightbox-next" aria-label="Next">›</button>' +
    '<div class="lightbox-counter" id="lightbox-counter"></div>';
  document.body.appendChild(overlay);

  var imgEl = document.getElementById("lightbox-img");
  var closeBtn = document.getElementById("lightbox-close");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");
  var counter = document.getElementById("lightbox-counter");

  var currentList = [];
  var currentIndex = 0;

  function show(i) {
    if (!currentList.length) return;
    currentIndex = (i + currentList.length) % currentList.length;
    var item = currentList[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt || "";
    counter.textContent = currentIndex + 1 + " / " + currentList.length;
  }

  function open(list, startIndex) {
    currentList = list;
    overlay.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    show(startIndex);
  }

  function close() {
    overlay.setAttribute("hidden", "");
    document.body.style.overflow = "";
    imgEl.src = "";
  }

  tracks.forEach(function (track) {
    var imgs = Array.prototype.slice.call(track.querySelectorAll("img"));
    imgs.forEach(function (img, idx) {
      img.addEventListener("click", function () {
        open(
          imgs.map(function (n) {
            return { src: n.currentSrc || n.src, alt: n.alt };
          }),
          idx
        );
      });
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { show(currentIndex + 1); });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (overlay.hasAttribute("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
})();
