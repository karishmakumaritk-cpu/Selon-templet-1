/* ==========================================================================
   LUMIÈRE BEAUTY STUDIO — Salon Website Template
   JavaScript Functionality
   ==========================================================================

   This file handles:
   - Sticky header on scroll
   - Mobile hamburger menu
   - Booking modal (open/close/validate/submit)
   - Contact form validation
   - Gallery filtering (gallery page)
   - Lightbox (open/close/navigate/keyboard)
   - Back-to-top button
   - Scroll reveal animations
   - Active nav link highlighting

   CUSTOMIZATION:
   - To connect the booking form to a real backend, replace the
     submitBookingForm() function with your API call.
   - To connect the contact form, replace submitContactForm().
   - WhatsApp number is set via data attributes in the HTML.

   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     CONFIG — Easy to change
     ---------------------------------------------------------------------- */
  const CONFIG = {
    whatsappNumber: '919999999999', // Placeholder — replace with real number
    whatsappMessage: "Hello! I'd like to book an appointment at Lumière Beauty Studio.",
  };

  /* ----------------------------------------------------------------------
     DOM READY
     ---------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileMenu();
    initBookingModal();
    initContactForm();
    initGalleryFilter();
    initLightbox();
    initBackToTop();
    initScrollReveal();
    initActiveNav();
    initWhatsAppLinks();
    initLazyLoad();
  });

  /* ----------------------------------------------------------------------
     STICKY HEADER
     ---------------------------------------------------------------------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;

      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
    }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     MOBILE MENU
     ---------------------------------------------------------------------- */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');

    if (!hamburger || !mobileNav) return;

    const toggleMenu = function (open) {
      if (open === undefined) {
        open = !mobileNav.classList.contains('open');
      }
      hamburger.classList.toggle('open', open);
      mobileNav.classList.toggle('open', open);
      if (overlay) overlay.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      hamburger.setAttribute('aria-expanded', open);
    };

    hamburger.addEventListener('click', function () {
      toggleMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        toggleMenu(false);
      });
    }

    // Close menu when a nav link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  /* ----------------------------------------------------------------------
     BOOKING MODAL
     ---------------------------------------------------------------------- */
  function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalBox = modal.querySelector('.modal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('#booking-form');
    const successMsg = modal.querySelector('.modal-success');
    const successCloseBtn = modal.querySelector('.modal-success-close');

    // Open modal — attach to all elements with data-booking-open
    document.querySelectorAll('[data-booking-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    function openModal() {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input, select');
      if (firstInput) {
        setTimeout(function () { firstInput.focus(); }, 300);
      }
    }

    function closeModal() {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
      // Reset form and success state after animation
      setTimeout(function () {
        if (form) form.reset();
        if (successMsg) successMsg.classList.remove('show');
        if (modalBox) modalBox.style.display = '';
        clearErrors(form);
      }, 350);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });

    // Form submission
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm(form)) return;

        // Submit booking — replace with real API call
        submitBookingForm(new FormData(form));

        // Show success message
        modalBox.style.display = 'none';
        successMsg.classList.add('show');
      });
    }
  }

  /* Replace this function with your real API/backend call */
  function submitBookingForm(formData) {
    // Example for connecting to a backend:
    // fetch('/api/booking', {
    //   method: 'POST',
    //   body: formData
    // }).then(response => { ... })

    // For now, just log the data (demo mode)
    const data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    console.log('Booking request (demo):', data);
  }

  /* ----------------------------------------------------------------------
     CONTACT FORM VALIDATION
     ---------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const successMsg = document.querySelector('.form-success-message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(form)) return;

      // Submit contact form — replace with real API call
      submitContactForm(new FormData(form));

      // Show success message
      if (successMsg) {
        successMsg.classList.add('show');
      }

      form.reset();
      clearErrors(form);

      // Scroll to success message
      if (successMsg) {
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* Replace this function with your real API/backend call */
  function submitContactForm(formData) {
    // Example for Formspree:
    // fetch('https://formspree.io/f/your-id', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Accept': 'application/json' }
    // }).then(response => { ... })

    const data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    console.log('Contact form submission (demo):', data);
  }

  /* ----------------------------------------------------------------------
     FORM VALIDATION (shared)
     ---------------------------------------------------------------------- */
  function validateForm(form) {
    let isValid = true;
    clearErrors(form);

    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      const value = field.value.trim();
      const group = field.closest('.form-group');

      if (!value) {
        showError(group, 'This field is required.');
        isValid = false;
      } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          showError(group, 'Please enter a valid email address.');
          isValid = false;
        }
      } else if (field.type === 'tel') {
        const phoneRegex = /^[0-9+\-\s()]{7,}$/;
        if (!phoneRegex.test(value)) {
          showError(group, 'Please enter a valid phone number.');
          isValid = false;
        }
      }
    });

    return isValid;
  }

  function showError(group, message) {
    if (!group) return;
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearErrors(form) {
    if (!form) return;
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) errorEl.style.display = 'none';
    });
  }

  /* ----------------------------------------------------------------------
     GALLERY FILTERING (Gallery Page)
     ---------------------------------------------------------------------- */
  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-page-grid .gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(function (item) {
          const category = item.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.classList.add('visible');
          } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     LIGHTBOX
     ---------------------------------------------------------------------- */
  function initLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    if (triggers.length === 0) return;

    // Create lightbox elements if not in DOM
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-label', 'Image viewer');
      lightbox.innerHTML =
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<button class="lightbox-prev" aria-label="Previous">&#10094;</button>' +
        '<img class="lightbox-img" src="" alt="" />' +
        '<button class="lightbox-next" aria-label="Next">&#10095;</button>';
      document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    // Group lightbox triggers by their data-lightbox-group
    triggers.forEach(function (trigger, idx) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        const group = trigger.getAttribute('data-lightbox-group') || 'default';
        currentImages = [];
        document.querySelectorAll('[data-lightbox-group="' + group + '"]').forEach(function (t) {
          currentImages.push({
            src: t.getAttribute('data-lightbox'),
            alt: t.querySelector('img') ? t.querySelector('img').alt : '',
          });
        });

        // Find current index within group
        const groupItems = Array.from(document.querySelectorAll('[data-lightbox-group="' + group + '"]'));
        currentIndex = groupItems.indexOf(trigger);

        showImage();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function showImage() {
      if (currentImages.length === 0) return;
      const img = currentImages[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showImage();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showImage();
    }

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }

  /* ----------------------------------------------------------------------
     BACK TO TOP
     ---------------------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------------
     SCROLL REVEAL ANIMATIONS
     ---------------------------------------------------------------------- */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in');
    if (elements.length === 0) return;

    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     ACTIVE NAV LINK
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ----------------------------------------------------------------------
     WHATSAPP LINKS
     ---------------------------------------------------------------------- */
  function initWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
    if (whatsappLinks.length === 0) return;

    const phoneNumber = CONFIG.whatsappNumber;
    const message = encodeURIComponent(CONFIG.whatsappMessage);
    const whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + message;

    whatsappLinks.forEach(function (link) {
      link.setAttribute('href', whatsappUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ----------------------------------------------------------------------
     LAZY LOADING FALLBACK
     ---------------------------------------------------------------------- */
  function initLazyLoad() {
    // Native lazy loading is supported in most modern browsers via loading="lazy"
    // This is a fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) return;

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      lazyImages.forEach(function (img) {
        if (img.dataset.src) img.src = img.dataset.src;
      });
      return;
    }

    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

})();
