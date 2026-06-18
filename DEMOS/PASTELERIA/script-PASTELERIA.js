/* 
  JENNY B CAKES — script.js (versión STARTER)
  Funcionalidades:
  1. Navbar dinámico al hacer scroll
  2. Menú hamburguesa (móvil)
  3. Scroll suave con compensación de navbar fijo
  4. Tabs del catálogo de productos
  5. Animaciones de aparición en galería (scroll)
  6. Lightbox simple para la galería
 */

document.addEventListener('DOMContentLoaded', () => {

  /* 1 */
  const heroReveals = document.querySelectorAll('.hero .reveal');
  requestAnimationFrame(() => {
    heroReveals.forEach((el) => el.classList.add('visible'));
  });

  /* 2 */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* 3 */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mob-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* 4 */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* 5 */
  const catTabs   = document.querySelectorAll('.cat-tab');
  const catPanels = document.querySelectorAll('.cat-panel');

  catTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.cat;

      catTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      catPanels.forEach((panel) => panel.classList.remove('active'));
      document.getElementById(`panel-${category}`)?.classList.add('active');
    });
  });

  /* 6 */
  const galItems = document.querySelectorAll('[data-anim]');
  if (galItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    galItems.forEach((el) => observer.observe(el));
  }

  /* 7 */
  const openLightbox = (imgSrc, caption) => {
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', caption || 'Imagen ampliada');

    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '9999',
      background: 'rgba(46, 33, 27, 0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      cursor: 'zoom-out',
      opacity: '0',
      transition: 'opacity .25s ease',
    });

    const img = document.createElement('img');
    img.src = imgSrc.replace(/w=\d+/, 'w=1200');
    img.alt = caption || '';
    Object.assign(img.style, {
      maxWidth: '92vw',
      maxHeight: '85vh',
      objectFit: 'contain',
      borderRadius: '10px',
      pointerEvents: 'none',
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar imagen');
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '1.4rem',
      right: '1.4rem',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,.12)',
      color: '#FBF6EF',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    });

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    const close = () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
      }, 250);
    };

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
    document.addEventListener('keydown', function escListener(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escListener);
      }
    });
  };

  document.querySelectorAll('.gal-item').forEach((item) => {
    item.style.cursor = 'pointer';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption')?.textContent || '';
    const trigger = () => openLightbox(img.src, caption);

    item.addEventListener('click', trigger);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });

}); // Fin de DOMContentLoaded