/**
 * LUMIÈRE BEAUTY STUDIO - MAIN JAVASCRIPT
 * Template #1: Luxury Editorial Beauty Salon
 * 
 * Features:
 * - Central Config Hydration
 * - Sticky Header with Scroll Compact Mode
 * - Accessible Mobile Navigation Drawer
 * - Booking Modal with Validation & Success Handling
 * - Contact Form Validation
 * - Gallery Filtering (Vanilla JS)
 * - Gallery Lightbox with Keyboard Navigation & Accessibility
 * - Dynamic WhatsApp Integration
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. CONFIG HYDRATION
  // -------------------------------------------------------------------------
  const initConfigHydration = () => {
    if (typeof SALON_CONFIG === 'undefined') return;

    // Update dynamic text elements
    document.querySelectorAll('[data-config-text]').forEach(el => {
      const key = el.getAttribute('data-config-text');
      if (SALON_CONFIG[key]) {
        el.textContent = SALON_CONFIG[key];
      }
    });

    // Update phone links
    document.querySelectorAll('[data-config-phone]').forEach(el => {
      el.textContent = SALON_CONFIG.phone;
      if (el.tagName === 'A') {
        el.href = `tel:${SALON_CONFIG.phoneRaw}`;
      }
    });

    // Update email links
    document.querySelectorAll('[data-config-email]').forEach(el => {
      el.textContent = SALON_CONFIG.email;
      if (el.tagName === 'A') {
        el.href = `mailto:${SALON_CONFIG.email}`;
      }
    });

    // Update address elements
    document.querySelectorAll('[data-config-address]').forEach(el => {
      el.textContent = SALON_CONFIG.fullAddress || SALON_CONFIG.address;
    });

    // Update WhatsApp links
    document.querySelectorAll('[data-whatsapp-btn]').forEach(el => {
      const customMsg = el.getAttribute('data-whatsapp-msg');
      el.href = SALON_CONFIG.getWhatsAppUrl(customMsg);
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });

    // Update Social Links
    if (SALON_CONFIG.socialLinks) {
      document.querySelectorAll('[data-social]').forEach(el => {
        const platform = el.getAttribute('data-social');
        if (SALON_CONFIG.socialLinks[platform]) {
          el.href = SALON_CONFIG.socialLinks[platform];
          el.target = '_blank';
          el.rel = 'noopener noreferrer';
        }
      });
    }

    // Dynamic current year
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  };

  // -------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLL BEHAVIOR
  // -------------------------------------------------------------------------
  const initStickyHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  };

  // -------------------------------------------------------------------------
  // 3. ACCESSIBLE MOBILE NAVIGATION
  // -------------------------------------------------------------------------
  const initMobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');
    if (!hamburger || !mobileNav || !overlay) return;

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      overlay.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
    };

    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));

    // Close when clicking any nav link inside mobile drawer
    mobileNav.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        if (!link.classList.contains('hamburger')) {
          toggleMenu(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  };

  // -------------------------------------------------------------------------
  // 4. APPOINTMENT BOOKING MODAL
  // -------------------------------------------------------------------------
  const initBookingModal = () => {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const bookingForm = document.getElementById('bookingForm');
    const successBanner = modal.querySelector('.form-success-banner');
    const serviceSelect = document.getElementById('modalService');

    const openModal = (preselectedService) => {
      if (preselectedService && serviceSelect) {
        serviceSelect.value = preselectedService;
      }
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // Reset form state if reopened
      if (bookingForm && successBanner) {
        bookingForm.style.display = 'block';
        successBanner.classList.remove('visible');
      }

      // Focus first input
      setTimeout(() => {
        const firstInput = modal.querySelector('input, select');
        if (firstInput) firstInput.focus();
      }, 100);
    };

    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    // Open triggers
    document.querySelectorAll('[data-booking-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || '';
        openModal(service);
      });
    });

    // Close triggers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form Submission & Validation
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        modal.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('has-error');
        });

        // Validate Name
        const nameInput = document.getElementById('modalName');
        if (nameInput && nameInput.value.trim().length < 2) {
          nameInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        // Validate Phone (At least 8 digits)
        const phoneInput = document.getElementById('modalPhone');
        const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
        if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        // Validate Service
        if (serviceSelect && !serviceSelect.value) {
          serviceSelect.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        // Validate Date
        const dateInput = document.getElementById('modalDate');
        if (dateInput && !dateInput.value) {
          dateInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        if (isValid) {
          // Frontend Demo Submission
          bookingForm.style.display = 'none';
          if (successBanner) {
            successBanner.classList.add('visible');
          }
          bookingForm.reset();
        }
      });
    }
  };

  // -------------------------------------------------------------------------
  // 5. CONTACT FORM VALIDATION (CONTACT PAGE)
  // -------------------------------------------------------------------------
  const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const successBanner = document.getElementById('contactSuccessBanner');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });

      const name = document.getElementById('contactName');
      if (name && name.value.trim().length < 2) {
        name.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      const email = document.getElementById('contactEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      const phone = document.getElementById('contactPhone');
      const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
      if (phone && !phoneRegex.test(phone.value.trim())) {
        phone.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      const message = document.getElementById('contactMessage');
      if (message && message.value.trim().length < 5) {
        message.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        contactForm.style.display = 'none';
        if (successBanner) {
          successBanner.classList.add('visible');
        }
        contactForm.reset();
      }
    });
  };

  // -------------------------------------------------------------------------
  // 6. GALLERY FILTERING
  // -------------------------------------------------------------------------
  const initGalleryFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  };

  // -------------------------------------------------------------------------
  // 7. LIGHTBOX MODAL WITH ACCESSIBILITY & KEYBOARD NAV
  // -------------------------------------------------------------------------
  const initLightbox = () => {
    const lightbox = document.getElementById('galleryLightbox');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    if (!lightbox || !galleryItems.length) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img-wrap img');
    const captionEl = lightbox.querySelector('.lightbox-caption');
    const counterEl = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    let visibleItems = [];

    const updateVisibleItems = () => {
      visibleItems = galleryItems.filter(item => !item.classList.contains('hidden'));
    };

    const displayImage = (index) => {
      updateVisibleItems();
      if (!visibleItems.length) return;

      if (index < 0) index = visibleItems.length - 1;
      if (index >= visibleItems.length) index = 0;
      currentIndex = index;

      const item = visibleItems[currentIndex];
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title')?.textContent || 'Lumière Beauty';
      const category = item.querySelector('.gallery-item-category')?.textContent || '';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
      }

      if (captionEl) {
        captionEl.textContent = title;
      }

      if (counterEl) {
        counterEl.textContent = `${category ? category + ' • ' : ''}${currentIndex + 1} of ${visibleItems.length}`;
      }
    };

    const openLightbox = (item) => {
      updateVisibleItems();
      currentIndex = visibleItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      displayImage(currentIndex);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    // Attach click to gallery items
    galleryItems.forEach(item => {
      item.addEventListener('click', () => openLightbox(item));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'Open image in lightbox');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => displayImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => displayImage(currentIndex + 1));

    // Backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-img-wrap')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        displayImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        displayImage(currentIndex + 1);
      }
    });
  };

  // -------------------------------------------------------------------------
  // 8. INITIALIZE ALL COMPONENTS
  // -------------------------------------------------------------------------
  initConfigHydration();
  initStickyHeader();
  initMobileNav();
  initBookingModal();
  initContactForm();
  initGalleryFiltering();
  initLightbox();
});
