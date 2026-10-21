(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var copyBtn = document.getElementById("copy-email-btn");
  var copyLabel = document.getElementById("copy-email-label");
  var emailText = document.getElementById("contact-email").textContent.trim();

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      function showCopied() {
        copyLabel.textContent = "Copied";
        setTimeout(function () {
          copyLabel.textContent = "Copy";
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(showCopied, function () {
          fallbackCopy(emailText, showCopied);
        });
      } else {
        fallbackCopy(emailText, showCopied);
      }
    });
  }

  function fallbackCopy(text, onDone) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      /* no-op: clipboard unavailable, user can still select the text manually */
    }
    document.body.removeChild(ta);
    onDone();
  }
})();
