/* ==========================================================================
   MPM Store — main.js
   Mobile menu toggle, FAQ accordion, smooth scroll, contact form (no backend)
   No external dependencies. No tracking.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    setupMobileMenu();
    setupFaqAccordion();
    setupSmoothScroll();
    setupContactForm();
    setupFooterYear();
  });

  /* ---------- Mobile navigation toggle ---------- */
  function setupMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760 && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function setupFaqAccordion() {
    var questions = document.querySelectorAll(".faq-q");
    questions.forEach(function (q) {
      q.addEventListener("click", function () {
        var expanded = q.getAttribute("aria-expanded") === "true";
        var answer = document.getElementById(q.getAttribute("aria-controls"));

        q.setAttribute("aria-expanded", String(!expanded));
        if (answer) {
          if (expanded) {
            answer.style.maxHeight = null;
          } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        }
      });
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function setupSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target.hasAttribute("tabindex") === false) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- Contact form (front-end only) ---------- */
  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        status.classList.add("is-visible");
        status.textContent =
          "Thank you for reaching out. This is a static demo form, so please email support@mpmstore.net directly and we will respond during business hours.";
      }
      form.reset();
    });
  }

  /* ---------- Auto-fill copyright year ---------- */
  function setupFooterYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = new Date().getFullYear();
    nodes.forEach(function (n) {
      n.textContent = String(year);
    });
  }
})();
