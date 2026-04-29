(() => {
  'use strict';

  /* ----- Mobile menu ----- */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ----- Smooth scroll to #account for header login ----- */
  const openAccount = () => {
    const target = document.getElementById('account');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelectorAll('.js-open-account').forEach(el =>
    el.addEventListener('click', e => {
      e.preventDefault();
      openAccount();
    })
  );

  /* ----- Toast ----- */
  const toastEl = document.getElementById('toast');
  let toastTimer;
  const toast = (msg) => {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('is-visible'));
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
      setTimeout(() => (toastEl.hidden = true), 300);
    }, 3500);
  };

  /* ----- Support form (front-end only, demo behaviour) ----- */
  const supportForm = document.getElementById('support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(supportForm);
      const message = (data.get('message') || '').toString().trim();
      if (!message) {
        toast('Опишите проблему — нам нужно немного контекста');
        return;
      }
      toast('Спасибо! Поддержка Radmin VPN ответит в течение 5 минут');
      supportForm.reset();
    });
  }

  /* ----- Reveal on scroll ----- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section, .hero__card, .card, .platform, .plan, .step').forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ----- Live ping/load demo on hero card ----- */
  const meterFill = document.querySelector('.meter span');
  const meterText = document.querySelector('.hero__card-meter small');
  if (meterFill && meterText) {
    setInterval(() => {
      const ping = 18 + Math.floor(Math.random() * 22);
      const speed = 180 + Math.floor(Math.random() * 120);
      const w = 65 + Math.floor(Math.random() * 25);
      meterFill.style.width = w + '%';
      meterText.textContent = `Пинг ${ping} мс · Загрузка ${speed} Мбит/с`;
    }, 2800);
  }

  /* ----- Header shadow on scroll ----- */
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.style.boxShadow = '0 4px 18px rgba(0,0,0,.4)';
    else header.style.boxShadow = '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Year in footer (auto) ----- */
  const yearMatch = /© 2009[–-](\d{4})/;
  document.querySelectorAll('.footer__bottom span').forEach(s => {
    if (yearMatch.test(s.textContent)) {
      s.textContent = s.textContent.replace(yearMatch, `© 2009–${new Date().getFullYear()}`);
    }
  });
})();
