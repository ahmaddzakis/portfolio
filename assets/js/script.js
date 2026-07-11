// Hamburger Menu Logic
function openMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  var btn = document.getElementById('hamburger-btn');
  menu.classList.remove('opacity-0', 'pointer-events-none');
  drawer.classList.remove('translate-x-full');
  menu.setAttribute('aria-hidden', 'false');
  if (btn) btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  var btn = document.getElementById('hamburger-btn');
  menu.classList.add('opacity-0', 'pointer-events-none');
  drawer.classList.add('translate-x-full');
  menu.setAttribute('aria-hidden', 'true');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// AOS – Animate On Scroll Init
if (typeof AOS !== 'undefined') {
  var motionSafe = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    disable: function() { return !motionSafe; }
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
      setTimeout(() => modal.classList.remove('opacity-0'), 10);
    } else {
      modal.classList.add('opacity-0');
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
document.querySelectorAll('.skill-badge').forEach(badge => {
  badge.addEventListener('click', function(e) {
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
      const isEng = (typeof isEnglish !== 'undefined') ? isEnglish : (!document.querySelector('.lang-id').classList.contains('hidden') ? false : true);
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
let isEnglish = true;

if (langBtn) {
  langBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;
    langBtn.innerText = isEnglish ? 'EN' : 'ID';
    
    document.querySelectorAll('.lang-en').forEach(el => {
      if (isEnglish) {
        el.classList.remove('hidden', 'animate-lang');
        void el.offsetWidth;
        el.classList.add('animate-lang');
      } else {
        el.classList.add('hidden');
      }
    });
    
    document.querySelectorAll('.lang-id').forEach(el => {
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
      messageInput.placeholder = isEnglish 
        ? 'Tell me briefly about your project or the service you need..' 
        : 'Ceritakan singkat tentang proyek atau layanan yang Anda butuhkan..';
    }
    
    // Update skill badges if they are currently displaying levels
    document.querySelectorAll('.skill-badge').forEach(badge => {
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
    
    const isEng = (typeof isEnglish !== 'undefined') ? isEnglish : (!document.querySelector('.lang-id').classList.contains('hidden') ? false : true);
    let targetText = isEng ? 'I am' : 'Saya';

    let iterations = 0;
    clearInterval(scrambleInterval);
    scrambleInterval = setInterval(() => {
      javaText.innerText = targetText.split('').map((char, index) => {
        if (index < iterations) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
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
      javaText.innerText = originalText.split('').map((char, index) => {
        if (index < iterations) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
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
      behavior: 'smooth'
    });
  });

  // Lift button above footer when footer is visible
  if (siteFooter) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        var footerHeight = siteFooter.offsetHeight;
        backToTopBtn.style.bottom = (footerHeight + 24) + 'px';
      } else {
        backToTopBtn.style.bottom = '';
      }
    }, { threshold: 0 });
    observer.observe(siteFooter);
  }
}

// AJAX Formspree Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable button and show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-pulse">Sending...</span>';
    
    formStatus.classList.add('hidden');
    formStatus.className = 'text-sm text-center font-medium mt-2';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        formStatus.innerHTML = isEnglish ? 'Message sent successfully! 🎉' : 'Pesan berhasil terkirim! 🎉';
        formStatus.classList.add('text-green-500');
        formStatus.classList.remove('hidden');
        contactForm.reset();
      } else {
        // Error
        formStatus.innerHTML = isEnglish ? 'Oops! There was a problem sending your message.' : 'Oops! Terjadi kesalahan saat mengirim pesan.';
        formStatus.classList.add('text-red-500');
        formStatus.classList.remove('hidden');
      }
    } catch (error) {
      formStatus.innerHTML = isEnglish ? 'Oops! There was a problem sending your message.' : 'Oops! Terjadi kesalahan saat mengirim pesan.';
      formStatus.classList.add('text-red-500');
      formStatus.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

