// =====================================================
// Floating Navbar on Scroll
// =====================================================
const navbar = document.getElementById('desktopNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Kondisi saat di-scroll (Floating Pill)
    navbar.classList.remove('px-8', 'py-6', 'bg-transparent', 'w-full', 'max-w-[2000px]', 'border-transparent', 'rounded-none', 'shadow-none', 'mt-0', 'backdrop-blur-none');
    navbar.classList.add(
      'w-[calc(100%-2rem)]', // Lebar dinamis agar tidak mepet di mobile
      'max-w-5xl', // Lebar mengecil maksimal di desktop
      'px-6',
      'py-3', // Padding mengecil
      'mt-4', // Turun sedikit dari atap
      'rounded-full', // Bentuk pil
      'bg-[#0a0a0a]/80',
      'backdrop-blur-md', // Efek glass
      'border-[#10B981]/40',
      'shadow-[0_4px_30px_rgba(0,0,0,0.3)]',
    );
  } else {
    // Kondisi kembali ke atas (Full Width)
    navbar.classList.remove('w-[calc(100%-2rem)]', 'max-w-5xl', 'px-6', 'py-3', 'mt-4', 'rounded-full', 'bg-[#0a0a0a]/80', 'backdrop-blur-md', 'border-[#10B981]/40', 'shadow-[0_4px_30px_rgba(0,0,0,0.3)]');
    navbar.classList.add('px-8', 'py-6', 'bg-transparent', 'w-full', 'max-w-[2000px]', 'border-transparent', 'rounded-none', 'shadow-none', 'mt-0', 'backdrop-blur-none');
  }
});

// Hamburger Menu Logic
function openMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  var btn = document.getElementById('hamburger-btn');
  menu.classList.remove('opacity-0', 'pointer-events-none');
  menu.setAttribute('aria-hidden', 'false');
  if (btn) btn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('overflow-hidden');
  document.documentElement.classList.add('overflow-hidden');
  // Trigger animation — small delay so CSS transition picks up
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      drawer.classList.add('menu-open');
      drawer.style.opacity = '1';
    });
  });
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  var btn = document.getElementById('hamburger-btn');
  drawer.classList.remove('menu-open');
  drawer.style.opacity = '0';
  menu.setAttribute('aria-hidden', 'true');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('overflow-hidden');
  document.documentElement.classList.remove('overflow-hidden');
  // Wait for animation to finish before hiding
  setTimeout(function () {
    menu.classList.add('opacity-0', 'pointer-events-none');
  }, 400);
}

// AOS – Animate On Scroll Init
if (typeof AOS !== 'undefined') {
  var motionSafe = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic', // Membuat scroll animasi jauh lebih mulus
    once: true,
    offset: 100,
    disable: function () {
      return !motionSafe;
    },
  });
}

// CV Modal Logic
const modal = document.getElementById('cvModal');
const openBtns = document.querySelectorAll('.cv-modal-trigger');
const closeBtn = document.getElementById('closeCvBtn');

if (modal && closeBtn) {
  const toggleModal = () => {
    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
      setTimeout(() => modal.classList.remove('opacity-0'), 10);
    } else {
      modal.classList.add('opacity-0');
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
      setTimeout(() => modal.classList.add('hidden'), 300); // Tunggu transisi selesai
    }
  };

  openBtns.forEach((btn) => btn.addEventListener('click', toggleModal));
  closeBtn.addEventListener('click', toggleModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal();
  });
}

// Auto-slider script
(function () {
  function initSlider(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const imgs = container.querySelectorAll('.slider-img');
    if (!imgs.length) return;
    let current = 0;
    setInterval(function () {
      imgs[current].classList.remove('opacity-100');
      imgs[current].classList.add('opacity-0');
      current = (current + 1) % imgs.length;
      imgs[current].classList.remove('opacity-0');
      imgs[current].classList.add('opacity-100');
    }, 3000);
  }
  initSlider('slider-miraiku');
  initSlider('slider-slider');
})();

// Skill Badge Click Event
document.querySelectorAll('.skill-badge').forEach((badge) => {
  badge.addEventListener('click', function (e) {
    e.preventDefault();
    const textEl = this.querySelector('.skill-text');
    const currentText = textEl.innerText;
    const skillName = this.getAttribute('data-name');
    const skillLevel = this.getAttribute('data-level');

    // Reset animation untuk me-trigger ulang
    textEl.classList.remove('animate-pop-text');
    void textEl.offsetWidth; // force reflow
    textEl.classList.add('animate-pop-text');

    // Toggle logika
    if (currentText === skillName) {
      let displayLevel = skillLevel;
      const isEng = typeof isEnglish !== 'undefined' ? isEnglish : !document.querySelector('.lang-id').classList.contains('hidden') ? false : true;
      if (!isEng) {
        if (skillLevel.toLowerCase().includes('beginner')) displayLevel = 'Pemula';
        else if (skillLevel.toLowerCase().includes('intermediate')) displayLevel = 'Menengah';
        else if (skillLevel.toLowerCase().includes('advance')) displayLevel = 'Mahir';
      }
      textEl.innerText = displayLevel;

      // Atur warna
      textEl.classList.remove('text-blue-400', 'text-yellow-400', 'text-red-400');
      const level = skillLevel.toLowerCase();
      if (level.includes('beginner')) {
        textEl.classList.add('text-blue-400');
      } else if (level.includes('intermediate')) {
        textEl.classList.add('text-yellow-400');
      } else if (level.includes('advance')) {
        textEl.classList.add('text-red-400');
      }
    } else {
      textEl.innerText = skillName;
      // Reset warna
      textEl.classList.remove('text-blue-400', 'text-yellow-400', 'text-red-400');
    }
  });
});

// Script Toggle Bahasa
const langBtn = document.getElementById('langToggleBtn');
let isEnglish = localStorage.getItem('language') === 'ID' ? false : true;

function updateLanguage() {
  if (langBtn) langBtn.innerText = isEnglish ? 'EN' : 'ID';

  document.querySelectorAll('.lang-en').forEach((el) => {
    if (isEnglish) {
      el.classList.remove('hidden', 'animate-lang');
      void el.offsetWidth;
      el.classList.add('animate-lang');
    } else {
      el.classList.add('hidden');
    }
  });

  document.querySelectorAll('.lang-id').forEach((el) => {
    if (!isEnglish) {
      el.classList.remove('hidden', 'animate-lang');
      void el.offsetWidth;
      el.classList.add('animate-lang');
    } else {
      el.classList.add('hidden');
    }
  });

  const messageInput = document.getElementById('message');
  if (messageInput) {
    messageInput.placeholder = isEnglish ? 'Tell me briefly about your project or the service you need..' : 'Ceritakan singkat tentang proyek atau layanan yang Anda butuhkan..';
  }

  // Update skill badges if they are currently displaying levels
  document.querySelectorAll('.skill-badge').forEach((badge) => {
    const textEl = badge.querySelector('.skill-text');
    const skillName = badge.getAttribute('data-name');
    const skillLevel = badge.getAttribute('data-level');

    // If it's currently showing a level (not the name)
    if (textEl.innerText !== skillName) {
      let displayLevel = skillLevel;
      if (!isEnglish) {
        if (skillLevel.toLowerCase().includes('beginner')) displayLevel = 'Pemula';
        else if (skillLevel.toLowerCase().includes('intermediate')) displayLevel = 'Menengah';
        else if (skillLevel.toLowerCase().includes('advance')) displayLevel = 'Mahir';
      }
      textEl.innerText = displayLevel;
    }
  });
}

// Initial set
updateLanguage();

if (langBtn) {
  langBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;
    localStorage.setItem('language', isEnglish ? 'EN' : 'ID');
    updateLanguage();
  });
}

// Javanese Scramble Effect
const javaText = document.getElementById('javanese-text');
if (javaText) {
  const originalText = 'ꦏꦸꦭ';
  const chars = '!<>-_\\/[]{}—=+*^?#_';
  let scrambleInterval;
  let isScrambled = false;

  const scramble = () => {
    if (isScrambled) return;
    isScrambled = true;

    const isEng = typeof isEnglish !== 'undefined' ? isEnglish : !document.querySelector('.lang-id').classList.contains('hidden') ? false : true;
    let targetText = isEng ? 'I am' : 'Saya';

    let iterations = 0;
    clearInterval(scrambleInterval);
    scrambleInterval = setInterval(() => {
      javaText.innerText = targetText
        .split('')
        .map((char, index) => {
          if (index < iterations) return targetText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= targetText.length) {
        clearInterval(scrambleInterval);
      }
      iterations += 1 / 3;
    }, 30);
  };

  const unscramble = () => {
    if (!isScrambled) return;
    let iterations = 0;
    clearInterval(scrambleInterval);
    scrambleInterval = setInterval(() => {
      javaText.innerText = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= originalText.length) {
        clearInterval(scrambleInterval);
        isScrambled = false;
      }
      iterations += 1 / 3;
    }, 30);
  };

  javaText.addEventListener('mouseenter', scramble);
  javaText.addEventListener('mouseleave', unscramble);
  javaText.addEventListener('click', scramble);
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTopBtn');
const siteFooter = document.getElementById('site-footer');
if (backToTopBtn) {
  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Lift button above footer when footer is visible
  if (siteFooter) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          var footerHeight = siteFooter.offsetHeight;
          backToTopBtn.style.bottom = footerHeight + 24 + 'px';
        } else {
          backToTopBtn.style.bottom = '';
        }
      },
      { threshold: 0 },
    );
    observer.observe(siteFooter);
  }
}

// AJAX Formspree Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Toast Elements
const toastNotification = document.getElementById('toastNotification');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');
const closeToastBtn = document.getElementById('closeToastBtn');
const toastIconContainer = document.getElementById('toastIconContainer');
const toastIconSuccess = document.getElementById('toastIconSuccess');
const toastIconError = document.getElementById('toastIconError');
let toastTimeout;

function showToast(title, message, isSuccess = true) {
  if (!toastNotification) return;

  // Set Content
  toastTitle.innerText = title;
  toastMessage.innerText = message;

  // Set Style
  if (isSuccess) {
    toastIconContainer.className = 'bg-[#10B981]/10 rounded-full p-2 text-[#10B981] shrink-0';
    toastIconSuccess.classList.remove('hidden');
    toastIconError.classList.add('hidden');
    toastNotification.querySelector('.border').className = 'bg-[#141414] border border-[#10B981]/50 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] p-4 flex items-start gap-4 max-w-sm';
  } else {
    toastIconContainer.className = 'bg-red-500/10 rounded-full p-2 text-red-500 shrink-0';
    toastIconSuccess.classList.add('hidden');
    toastIconError.classList.remove('hidden');
    toastNotification.querySelector('.border').className = 'bg-[#141414] border border-red-500/50 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] p-4 flex items-start gap-4 max-w-sm';
  }

  // Show Toast
  toastNotification.classList.remove('-translate-y-[150%]', 'opacity-0', 'pointer-events-none');

  // Auto hide after 5s
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  if (!toastNotification) return;
  toastNotification.classList.add('-translate-y-[150%]', 'opacity-0', 'pointer-events-none');
}

if (closeToastBtn) {
  closeToastBtn.addEventListener('click', hideToast);
}

if (contactForm) {
  // Restore saved form data
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (nameInput) nameInput.value = localStorage.getItem('form_name') || '';
  if (emailInput) emailInput.value = localStorage.getItem('form_email') || '';
  if (messageInput) messageInput.value = localStorage.getItem('form_message') || '';

  // Save form data on input
  contactForm.addEventListener('input', (e) => {
    if (e.target.id === 'name') localStorage.setItem('form_name', e.target.value);
    if (e.target.id === 'email') localStorage.setItem('form_email', e.target.value);
    if (e.target.id === 'message') localStorage.setItem('form_message', e.target.value);
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Disable button and show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-pulse">Sending...</span>';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        // Success
        showToast(isEnglish ? 'Message Sent!' : 'Pesan Terkirim!', isEnglish ? 'Thank you for reaching out. I will get back to you soon.' : 'Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.', true);
        contactForm.reset();
        localStorage.removeItem('form_name');
        localStorage.removeItem('form_email');
        localStorage.removeItem('form_message');
      } else {
        // Error
        showToast(isEnglish ? 'Oops!' : 'Aduh!', isEnglish ? 'There was a problem sending your message.' : 'Terjadi kesalahan saat mengirim pesan.', false);
      }
    } catch (error) {
      showToast(isEnglish ? 'Oops!' : 'Aduh!', isEnglish ? 'There was a problem sending your message.' : 'Terjadi kesalahan saat mengirim pesan.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

// =====================================================
// Scroll Progress Bar
// =====================================================
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) -
      document.documentElement.clientHeight;

    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// =====================================================
// Particles.js Interactive Background
// =====================================================
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: window.innerWidth < 768 ? 15 : 40,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#10B981',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#10B981',
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
      },
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 250,
          line_linked: {
            opacity: 0.5,
          },
        },
        push: {
          particles_nb: 1,
        },
      },
    },
    retina_detect: true,
  });
}

// =====================================================
// Pause Animasi Saat Tab Tidak Aktif — Hemat CPU/GPU
// =====================================================
document.addEventListener('visibilitychange', () => {
  const animatedEls = document.querySelectorAll('.mega-mendung-slide, .animate-marquee');
  const paused = document.hidden ? 'paused' : 'running';
  animatedEls.forEach((el) => {
    el.style.animationPlayState = paused;
  });
});
