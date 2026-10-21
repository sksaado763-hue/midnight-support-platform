(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-navigation");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Submenu toggles (mobile accordions + desktop click) ---------- */
  document.querySelectorAll(".nav-item.has-sub > .nav-link").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var item = btn.parentElement;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Footer column accordions ---------- */
  document.querySelectorAll(".footer-col-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var col = btn.parentElement;
      var open = col.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Partner tabs ---------- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".tab-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var key = tab.dataset.tab;
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      panels.forEach(function (p) {
        var active = p.dataset.panel === key;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
    });
  });

  /* ---------- Close mobile menu when a link inside it is used ---------- */
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !e.target.closest(".nav-item.has-sub > .nav-link")) {
        nav.classList.remove("is-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        document.querySelectorAll(".nav-item.has-sub").forEach(function (item) {
          item.classList.remove("is-open");
        });
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var io = null;
  var revealFallback = setTimeout(function () {
    if (!document.querySelector(".reveal.is-visible")) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      if (io) io.disconnect();
    }
  }, 1200);
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && !document.querySelector(".reveal.is-visible")) {
      clearTimeout(revealFallback);
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      if (io) io.disconnect();
    }
  });

  /* ---------- AJAX forms (contact + newsletter) ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(el, text, ok) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove("is-error", "is-ok");
    el.classList.add(ok ? "is-ok" : "is-error");
  }

  function serialize(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    return data;
  }

  document.querySelectorAll("form[data-endpoint]").forEach(function (form) {
    var status = form.querySelector(".form-status") ||
      document.querySelector("#" + form.id + "-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = serialize(form);
      if (!data.name || !data.email || !data.message) {
        setStatus(status, "Please fill in your name, email and message.", false);
        return;
      }
      if (!EMAIL_RE.test(data.email)) {
        setStatus(status, "That email address doesn't look right.", false);
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : null;
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, body: j }; }); })
        .then(function (r) {
          if (r.ok && r.body.ok) {
            setStatus(status, "Thanks " + data.name + " — we'll be in touch within one working day.", true);
            form.reset();
          } else {
            setStatus(status, (r.body && r.body.error) || "Something went wrong — please try again.", false);
          }
        })
        .catch(function () {
          setStatus(status, "Network hiccup — please try again.", false);
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  });

  var newsletter = document.getElementById("newsletter-form");
  var newsletterStatus = document.getElementById("newsletter-status");
  if (newsletter && newsletterStatus) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = newsletter.email.value.trim();
      if (!EMAIL_RE.test(email)) {
        setStatus(newsletterStatus, "Please enter a valid email address.", false);
        return;
      }
      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, body: j }; }); })
        .then(function (r) {
          if (r.ok && r.body.ok) {
            setStatus(newsletterStatus, r.body.duplicate ? "You're already on the list." : "Subscribed — welcome aboard.", true);
            newsletter.reset();
          } else {
            setStatus(newsletterStatus, (r.body && r.body.error) || "Something went wrong.", false);
          }
        })
        .catch(function () {
          setStatus(newsletterStatus, "Network hiccup — please try again.", false);
        });
    });
  }

  /* ---------- Admin: delete message without leaving the page ---------- */
  var messageList = document.getElementById("message-list");
  if (messageList) {
    messageList.addEventListener("click", function (e) {
      var btn = e.target.closest(".message-delete");
      if (!btn) return;
      var id = btn.dataset.id;
      fetch("/api/messages/" + id, { method: "DELETE" })
        .then(function (res) { return res.json(); })
        .then(function (r) {
          if (r.ok) {
            var item = messageList.querySelector('[data-id="' + id + '"]');
            if (item) item.remove();
            var count = messageList.querySelectorAll(".message-item").length;
            var badge = document.querySelector(".admin-count");
            if (badge && messageList.closest(".admin-panel") && messageList.closest(".admin-panel").contains(badge)) {
              badge.textContent = count;
            }
            if (!count) {
              messageList.outerHTML = '<p class="empty-note">No messages yet. Submit the contact form and it\'ll appear here.</p>';
            }
          }
        })
        .catch(function () {});
    });
  }

  /* ---------- Contact page: preselect topic from ?package= ---------- */
  var topicSel = document.getElementById("ct-topic");
  if (topicSel) {
    var params = new URLSearchParams(window.location.search);
    var pkg = params.get("package");
    if (pkg) {
      topicSel.value = "support";
      var msg = document.getElementById("ct-message");
      if (msg) msg.placeholder = "We're interested in the " + pkg + " package for our platform. Tell us what you're running…";
    }
  }
})();
