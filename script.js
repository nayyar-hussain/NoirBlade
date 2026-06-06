/* ========================
   NOIR & BLADE — JavaScript
======================== */

// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1200);
});

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll to top button
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    if (window.scrollY > 400) scrollTop.classList.add('visible');
    else scrollTop.classList.remove('visible');
  }
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// SCROLL TO TOP
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// TESTIMONIAL SLIDER
let currentTesti = 0;
const testiCards = document.querySelectorAll('.testi-card');
const dots = document.querySelectorAll('.dot');

function showTesti(index) {
  testiCards.forEach(c => c.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  if (testiCards[index]) testiCards[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
  currentTesti = index;
}

if (testiCards.length > 0) {
  setInterval(() => {
    let next = (currentTesti + 1) % testiCards.length;
    showTesti(next);
  }, 4500);
}

// GALLERY FILTER
const gfBtns = document.querySelectorAll('.gf-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

gfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    if (!lightbox) return;
    const img = item.querySelector('img');
    const caption = item.querySelector('.gi-overlay span');
    lbImg.src = img.src;
    lbCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

if (lbClose) {
  lbClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
function closeLightbox() {
  if (lightbox) lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// CONTACT FORM SUBMIT
function submitForm() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// SCROLL REVEAL (IntersectionObserver)
const revealElements = document.querySelectorAll('.service-card, .team-card, .sl-item, .ci-item, .stat-item, .gallery-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
  revealObserver.observe(el);
});

// ESCAPE KEY closes lightbox/modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeModal();
  }
});

// Badge letter rotation (hero)
const badgeRing = document.querySelector('.badge-ring span');
if (badgeRing) {
  const text = badgeRing.textContent;
  const chars = text.split('');
  const total = chars.length;
  badgeRing.innerHTML = chars.map((char, i) => {
    const angle = (360 / total) * i;
    return `<span style="
      position:absolute;
      left:50%; top:50%;
      transform-origin: 0 -48px;
      transform: rotate(${angle}deg) translateX(-50%);
      font-size:0.5rem;
      letter-spacing:0;
    ">${char}</span>`;
  }).join('');
}
