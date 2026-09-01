/**
 * HARI HRITHIK RA - Portfolio Interaction Engine
 * Clean, lightweight, reliable interactions for project filtering, skill exploration, and contact helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initSkillExplorer();
  initArchitectureToggles();
  initCopyTools();
  initMobileNav();
  initScrollSpy();
});

/* -------------------------------------------------------------------------- */
/* Project Category Filter System                                             */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white/[0.04]', 'text-slate-400', 'hover:text-white');
      });

      btn.classList.remove('bg-white/[0.04]', 'text-slate-400', 'hover:text-white');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');

      const filter = btn.getAttribute('data-filter');

      // Clear any active skill highlighting
      document.querySelectorAll('.skill-tag').forEach(s => s.classList.remove('active'));

      projectCards.forEach(card => {
        card.classList.remove('highlighted');
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Interactive Skill-to-Project Dependency Explorer                          */
/* -------------------------------------------------------------------------- */
function initSkillExplorer() {
  const skillTags = document.querySelectorAll('.skill-tag[data-skill]');
  const allInspectableCards = document.querySelectorAll('.project-card, .publication-card');

  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skillName = tag.getAttribute('data-skill').toLowerCase();
      const isActive = tag.classList.contains('active');

      // Toggle off if already active
      if (isActive) {
        tag.classList.remove('active');
        allInspectableCards.forEach(card => card.classList.remove('highlighted'));
        return;
      }

      // Deactivate all tags
      skillTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      let matchCount = 0;
      let firstMatchElement = null;

      allInspectableCards.forEach(card => {
        const cardSkills = (card.getAttribute('data-skills') || '').toLowerCase();
        if (cardSkills.includes(skillName)) {
          if (card.classList.contains('project-card')) {
            card.style.display = 'flex';
          }
          card.classList.add('highlighted');
          matchCount++;
          if (!firstMatchElement) firstMatchElement = card;
        } else {
          card.classList.remove('highlighted');
        }
      });

      // Scroll smoothly towards first matching element if found
      if (firstMatchElement) {
        const topPos = firstMatchElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }

      showToast(`Showing ${matchCount} item(s) related to "${tag.innerText.trim()}"`);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Architecture Flow Stepper Toggles                                         */
/* -------------------------------------------------------------------------- */
function initArchitectureToggles() {
  window.toggleArchitecture = function(id) {
    const element = document.getElementById(id);
    const btn = document.getElementById(`btn-${id}`);
    if (!element) return;

    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      if (btn) {
        btn.innerHTML = `<span>Hide Architecture</span> <i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>`;
      }
    } else {
      element.classList.add('hidden');
      if (btn) {
        btn.innerHTML = `<span>View Architecture</span> <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>`;
      }
    }
    if (window.lucide) lucide.createIcons();
  };
}

/* -------------------------------------------------------------------------- */
/* Copy Tools & Toast Notification                                            */
/* -------------------------------------------------------------------------- */
function initCopyTools() {
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('hari.hrithik.raja@gmail.com').then(() => {
        showToast("Copied email to clipboard (hari.hrithik.raja@gmail.com)");
      });
    });
  });

  document.querySelectorAll('.copy-phone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91 9025640673').then(() => {
        showToast("Copied phone to clipboard (+91 9025640673)");
      });
    });
  });
}

window.showToast = function(msg) {
  let toast = document.getElementById('toast');
  if (!toast) return;

  const msgSpan = toast.querySelector('.toast-message');
  if (msgSpan) msgSpan.innerHTML = msg;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
};

/* -------------------------------------------------------------------------- */
/* Mobile Navigation Drawer                                                   */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* ScrollSpy for Active Navigation Link                                       */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-indigo-400', 'text-white', 'font-medium');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('text-slate-400');
        link.classList.add('text-white', 'font-medium');
      }
    });
  });
}
