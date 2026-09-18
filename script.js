/* Francesca Ervin — portfolio behaviour.
   Three small jobs: reveal on scroll, recolour the top bar over the drenched
   sections, stamp the year. The page is fully readable without any of it. */

(function () {
  "use strict";

  var calm = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  var pending = [].slice.call(document.querySelectorAll(".reveal"));
  var bar = document.getElementById("bar");
  var drenched = document.querySelectorAll(".hero, .contact");

  /* ---- Stagger ---------------------------------------------------
     Items in a row cascade; anything with an authored --d keeps it. */
  [].forEach.call(
    document.querySelectorAll(".entries, .caps-grid, .edu-grid"),
    function (group) {
      [].forEach.call(group.querySelectorAll(".reveal"), function (el, i) {
        if (!el.style.getPropertyValue("--d")) {
          el.style.setProperty("--d", Math.min(i, 4) * 70 + "ms");
        }
      });
    }
  );

  /* ---- Reveals ----------------------------------------------------
     Driven by scroll position rather than IntersectionObserver. The
     observer is the tidier API, but its callbacks depend on the browser
     producing frames, and when they stop arriving the content below the
     fold never appears at all. Measuring on scroll cannot fail that way,
     and 24 elements is far too few for the cost to matter. */
  function show(el) { el.classList.add("is-in"); }

  function showAll() {
    pending.forEach(show);
    pending.length = 0;
  }

  function sweep() {
    if (!pending.length) return;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var edge = h * 0.88;
    for (var i = pending.length - 1; i >= 0; i--) {
      if (pending[i].getBoundingClientRect().top < edge) {
        show(pending[i]);
        pending.splice(i, 1);
      }
    }
  }

  /* ---- The bar takes the colour of whatever sits behind it -------- */
  function paintBar() {
    if (!bar) return;
    // Probe just past the bar's own bottom edge: at scroll 0 the hero starts
    // exactly there, so testing the edge itself misses it by a pixel.
    var probe = bar.getBoundingClientRect().bottom + 1;
    var over = "paper";
    for (var i = 0; i < drenched.length; i++) {
      var box = drenched[i].getBoundingClientRect();
      if (box.top <= probe && box.bottom > probe) { over = "rust"; break; }
    }
    bar.setAttribute("data-over", over);
  }

  /* ---- One throttled handler for both ----------------------------- */
  var ticking = false;
  function update() {
    if (ticking) return;
    ticking = true;
    (window.requestAnimationFrame || function (f) { window.setTimeout(f, 16); })(
      function () { sweep(); paintBar(); ticking = false; }
    );
  }

  if (calm.matches) showAll();

  paintBar();
  sweep();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  window.addEventListener("load", function () { sweep(); paintBar(); });

  // Late-loading webfonts reflow the page; re-measure once they land.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { sweep(); paintBar(); });
  }

  /* ---- Year -------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
