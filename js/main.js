// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && !this.classList.contains("btn")) { 
      // skip modal buttons
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// FAQ accordion: only one open at a time
const faqItems = document.querySelectorAll(".faq details");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.removeAttribute("open");
      });
    }
  });
});

// Modal logic - generic for multiple modals (consult, login, register)
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.style.display = "flex";
}

function closeModal(modalEl) {
  if (modalEl) modalEl.style.display = "none";
}

// Triggers
const openConsultBtn = document.getElementById("openConsult");
const openConsultHeroBtn = document.getElementById("openConsultHero");
const openLoginBtn = document.getElementById("openLogin");
const openRegisterBtn = document.getElementById("openRegister");

if (openConsultBtn) openConsultBtn.addEventListener("click", (e) => { e.preventDefault(); openModal('consultModal'); });
if (openConsultHeroBtn) openConsultHeroBtn.addEventListener("click", (e) => { e.preventDefault(); openModal('consultModal'); });
if (openLoginBtn) openLoginBtn.addEventListener("click", (e) => { e.preventDefault(); openModal('loginModal'); });
if (openRegisterBtn) openRegisterBtn.addEventListener("click", (e) => { e.preventDefault(); openModal('registerModal'); });

// Close buttons inside any modal
document.querySelectorAll('.modal .close-btn').forEach(btn => {
  const modalEl = btn.closest('.modal');
  btn.addEventListener('click', () => closeModal(modalEl));
});

// Close when clicking outside content (for any open modal)
window.addEventListener("click", (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('modal')) {
    closeModal(e.target);
  }
});

// Optional: handle simple form submit (demo only - prevent navigation)
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: integrate real auth
  alert('Login submitted (demo)');
  closeModal(document.getElementById('loginModal'));
});
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registration submitted (demo)');
  closeModal(document.getElementById('registerModal'));
});

// When a course thumbnail/button is clicked, open consult modal and prefill course
document.querySelectorAll('.course-enquire').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const course = btn.getAttribute('data-course') || '';
    const hidden = document.getElementById('consultCourseField');
    const txt = document.getElementById('selectedCourseText');
    if (hidden) hidden.value = course;
    if (txt) txt.textContent = course ? `Enquiry for: ${course}` : '';
    openModal('consultModal');
  });
});
