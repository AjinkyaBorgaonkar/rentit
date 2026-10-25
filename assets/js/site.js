/* RENTit — site behaviour. No dependencies. */
(function () {
  "use strict";

  var doc = document;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- mobile navigation ---------- */
  var toggle = doc.querySelector("[data-nav-toggle]");
  var panel = doc.querySelector("[data-nav-panel]");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.setAttribute("data-open", String(!open));
      panel.hidden = open;
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        panel.setAttribute("data-open", "false");
        panel.hidden = true;
      }
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.click();
        toggle.focus();
      }
    });
  }

  /* ---------- faq accordions ---------- */
  var questions = doc.querySelectorAll(".faq__q");
  Array.prototype.forEach.call(questions, function (btn) {
    var item = btn.closest(".faq__item");
    var panelId = btn.getAttribute("aria-controls");
    var answer = panelId ? doc.getElementById(panelId) : null;
    if (!item || !answer) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      item.setAttribute("data-open", String(!open));
    });
    item.setAttribute("data-open", btn.getAttribute("aria-expanded") === "true" ? "true" : "false");
  });

  /* ---------- live IST clock ---------- */
  var clock = doc.querySelector("[data-clock]");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    var tick = function () {
      clock.textContent = fmt.format(new Date());
    };
    tick();
    window.setInterval(tick, 30000);
  }

  /* ---------- cluster map ---------- */
  var NS = "http://www.w3.org/2000/svg";
  Array.prototype.forEach.call(doc.querySelectorAll("[data-cluster-map]"), function (svg) {
    var cx = 200,
      cy = 150,
      rx = 182,
      ry = 118;

    var ring = doc.createElementNS(NS, "ellipse");
    ring.setAttribute("cx", cx);
    ring.setAttribu8.5453) % 1;
        var dot = doc.createElementNS(NS, "circle");
        dot.setAttribute("cx", String(cx + gx * step + (gy % 2 ? 3 : 0)));
        dot.setAttribute("cy", String(cy + gy * step));
        if (seed > 0.95) {
          dot.setAttribute("r", "4");
          dot.setAttribute("fill", "#FF4A19");
        } else if (seed > 0.88) {
          dot.setAttribute("r", "3.2");
          dot.setAttribute("fill", "#0F6B57");
        } else {
          dot.setAttribute("r", "2.2");
          dot.setAttribute("fill", "#B3A78D");
        }
        svg.appendChild(dot);
      }
    }

    var pin = doc.createElementNS(NS, "circle");
    pin.setAttribute("cx", String(cx));
    pin.setAttribute("cy", String(cy));
    pin.setAttribute("r", "7");
    pin.setAttribute("fill", "none");
    pin.setAttribute("stroke", "#101513");
    pin.setAttribute("stroke-width", "1.2");
    svg.appendChild(pin);

    var pip = doc.createElementNS(NS, "circle");
    pip.setAttribute("cx", String(cx));
    pip.setAttribute("cy", String(cy));
    pip.setAttribute("r", "2.6");
    pip.setAttribute("fill", "#101513");
    svg.appendChild(pip);

    var label = doc.createElementNS(NS, "text");
    label.setAttribute("x", String(cx + 12));
    label.setAttribute("y", String(cy + 4));
    label.setAttribute("font-family", "Geist Mono, Consolas, monospace");
    label.setAttribute("font-size", "7");
    label.setAttribute("letter-spacing", "1");
    label.setAttribute("fill", "#101513");
    label.setAttribute("paint-order", "stroke");
    label.setAttribute("stroke", "#EFE8DA");
    label.setAttribute("stroke-width", "4");
    label.setAttribute("stroke-linejoin", "round");
    label.textContent = "HUB";
    svg.appendChild(label);
  });

  /* ---------- search (no backend: say so plainly) ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll("[data-search]"), function (form) {
    var note = form.parentElement.querySelector("[data-search-note]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!note) return;
      note.textContent =
        "Search opens with the Indiranagar pilot. Nothing is listed for rent yet — this is the storefront, not the live catalogue.";
    });
  });

  /* ---------- earnings calculator ---------- */
  var calc = doc.querySelector("[data-calc]");
  if (calc) {
    var state = { rate: 800, days: 2, upkeep: 600, delivery: false };
    var limits = { rate: [200, 2000, 50], days: [1, 10, 1], upkeep: [0, 2000, 100] };
    var money = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
    var out = {
      rate: calc.querySelector("[data-out-rate]"),
      days: calc.querySelector("[data-out-days]"),
      delivery: calc.querySelector("[data-out-delivery]"),
      gross: calc.querySelector("[data-out-gross]"),
      commission: calc.querySelector("[data-out-commission]"),
      keep: calc.querySelector("[data-out-keep]"),
      upkeep: calc.querySelectorAll("[data-out-upkeep]"),
      net: calc.querySelector("[data-out-net]"),
      protect: calc.querySelector("[data-out-protect]"),
      renter: calc.querySelector("[data-out-renter]"),
      deliveryFee: calc.querySelector("[data-out-delivery-fee]"),
      share: calc.querySelector("[data-out-share]"),
      shareLabel: calc.querySelector("[data-out-share-label]"),
      summary: calc.querySelector("[data-out-summary]"),
    };

    var clamp = function (v, min, max) {
      return Math.min(max, Math.max(min, v));
    };

    function render() {
      var gross = state.rate * state.days;
      var commission = Math.round(gross * 0.25);
      var keep = gross - commission;
      var net = keep - state.upkeep;
      var protect = Math.max(49, Math.round(gross * 0.04));
      var deliveryFee = state.delivery ? 298 : 0;
      var renter = gross + protect + deliveryFee;

      if (out.rate) out.rate.textContent = "₹" + money.format(state.rate);
      if (out.days) out.days.textContent = String(state.days);
      if (out.upkeep)
        Array.prototype.forEach.call(out.upkeep, function (el) {
          el.textContent = "− ₹" + money.format(state.upkeep);
        });
      if (out.delivery) out.delivery.textContent = state.delivery ? "On" : "Off";
      if (out.gross) out.gross.textContent = "₹" + money.format(gross);
      if (out.commission) out.commission.textContent = "− ₹" + money.format(commission);
      if (out.keep) out.keep.textContent = "₹" + money.format(keep);
      if (out.net)
        out.net.textContent =
          (net < 0 ? "− ₹" : "₹") + money.format(Math.abs(net));
      if (out.protect) out.protect.textContent = "₹" + money.format(protect);
      if (out.deliveryFee) out.deliveryFee.textContent = deliveryFee ? "₹" + money.format(deliveryFee) : "—";
      if (out.renter) out.renter.textContent = "₹" + money.format(renter);
      if (out.share) out.share.style.width = ((keep / gross) * 100).toFixed(1) + "%";
      if (out.shareLabel) out.shareLabel.textContent = "OWNER " + Math.round((keep / gross) * 100) + "%";
      if (out.summary)
        out.summary.textContent =
          "₹" + money.format(state.rate) + " a day, " + state.days + (state.days === 1 ? " day" : " days") + " a month — ₹" + money.format(net) + " net after commission and upkeep.";

      Array.prototype.forEach.call(calc.querySelectorAll("[data-step]"), function (btn) {
        var field = btn.getAttribute("data-field");
        var dir = btn.getAttribute("data-step") === "up" ? 1 : -1;
        if (field === "delivery") {
          btn.setAttribute("aria-pressed", String(state.delivery));
          return;
        }
        var step = limits[field][2];
        var next = state[field] + dir * step;
        btn.disabled = next < limits[field][0] || next > limits[field][1];
      });
    }

    Array.prototype.forEach.call(calc.querySelectorAll("[data-step]"), function (btn) {
      btn.addEventListener("click", function () {
        var field = btn.getAttribute("data-field");
        var dir = btn.getAttribute("data-step") === "up" ? 1 : -1;
        if (field === "delivery") {
          state.delivery = !state.delivery;
        } else {
          var step = limits[field][2];
          state[field] = clamp(state[field] + dir * step, limits[field][0], limits[field][1]);
        }
        render();
      });
    });

    render();
  }

  /* ---------- scroll reveals ---------- */
  var reveals = doc.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || reduce.matches) {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    Array.prototype.forEach.call(reveals, function (el) {
      io.observe(el);
    });
  }
})();
