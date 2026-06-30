// Hamburger Menu Logic
function openMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  menu.classList.remove('opacity-0', 'pointer-events-none');
  drawer.classList.remove('translate-x-full');
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var drawer = document.getElementById('mobile-drawer');
  menu.classList.add('opacity-0', 'pointer-events-none');
  drawer.classList.add('translate-x-full');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// AOS – Animate On Scroll Init
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
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
