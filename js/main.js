/* ============================================================
   ORANE INTERNATIONAL BEAUTY & WELLNESS ACADEMY — BADARPUR
   main.js — vanilla JS, no libraries
   ============================================================ */

/* ---------- Preloader ---------- */
(function () {
  const MIN_DISPLAY_MS = 1100;
  const start = Date.now();
  function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    const elapsed = Date.now() - start;
    const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0);
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      setTimeout(() => preloader.remove(), 500);
    }, wait);
  }
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky navbar on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    toggleBackToTop();
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.querySelector('.back-to-top');
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Course filter (Courses page) ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      courseCards.forEach(card => {
        const level = card.getAttribute('data-level');
        if (filter === 'all' || filter === level) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Dark mode toggle ---------- */
  const darkToggle = document.querySelector('.dark-toggle');
  const applyDarkPreference = () => {
    if (localStorage.getItem('orane-theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (darkToggle) darkToggle.textContent = '☀️';
    }
  };
  applyDarkPreference();
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('orane-theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---------- Form validation (generic) ---------- */
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      let fieldValid = true;

      if (field.type === 'email') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      } else if (field.type === 'tel') {
        fieldValid = /^[6-9]\d{9}$/.test(field.value.trim());
      } else {
        fieldValid = field.value.trim().length > 0;
      }

      if (!fieldValid) {
        group.classList.add('error');
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });
    return valid;
  }

  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const isValid = validateForm(form);
      const successMsg = form.querySelector('.form-success');
      if (isValid) {
        form.reset();
        if (successMsg) {
          successMsg.classList.add('show');
          successMsg.textContent = '✔ Thank you! Your enquiry has been received. Our counsellor will contact you within 24 hours.';
          setTimeout(() => successMsg.classList.remove('show'), 6000);
        }
      } else if (successMsg) {
        successMsg.classList.remove('show');
      }
    });

    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-group').classList.remove('error');
      });
    });
  });

});
