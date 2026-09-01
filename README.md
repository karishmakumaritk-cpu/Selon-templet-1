# Lumière Beauty Studio — Salon Website Template #1

A premium, modern, fully responsive salon website template built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools, no backend — just drop it on GitHub Pages and go.

---

## Features

- **5 complete pages** — Home, About, Services, Gallery, Contact
- **Premium design** — editorial typography, warm neutral palette, muted gold accents
- **Fully responsive** — tested from 375px mobile to 1440px+ desktop
- **Booking modal** — opens from any "Book Appointment" button, validates input, shows confirmation
- **Contact form** — front-end validation with a demo success message (ready to connect to a real backend)
- **Gallery filtering** — filter by category (All, Hair, Makeup, Bridal, Nails, Salon) with smooth animations
- **Lightbox** — full-screen image viewer with prev/next navigation and keyboard support (Escape, arrows)
- **Sticky header** — compacts on scroll
- **Mobile hamburger menu** — slide-in navigation with overlay
- **Back-to-top button** — appears on scroll
- **Scroll reveal animations** — subtle fade-in-up effects (respects `prefers-reduced-motion`)
- **SEO ready** — unique titles, meta descriptions, Open Graph tags, semantic HTML, LocalBusiness JSON-LD
- **Accessible** — ARIA labels, keyboard navigation, visible focus states, alt text on all images
- **Performance optimized** — lazy-loaded images, no heavy libraries, minimal JavaScript
- **Zero dependencies** — only Google Fonts and Font Awesome (CDN)

---

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Structure & semantic markup |
| CSS3 | Styling, animations, responsive design |
| Vanilla JavaScript | Interactivity (no frameworks) |
| Google Fonts | Cormorant Garamond (headings) + Jost (body) |
| Font Awesome 6 | Icons (CDN) |

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, stats, about preview, services preview, featured offer, why choose us, gallery preview, testimonials, social section, booking CTA |
| About | `about.html` | Story, philosophy, approach, why choose us, team section, CTA |
| Services | `services.html` | Full service menu with prices across 5 categories (Hair, Skin, Makeup, Nails, Bridal) |
| Gallery | `gallery.html` | Filterable image grid with lightbox |
| Contact | `contact.html` | Contact info, form, map placeholder, WhatsApp CTA |

---

## File Structure

```
salon-template-01/
│
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services & pricing page
├── gallery.html        # Gallery page
├── contact.html        # Contact page
│
├── css/
│   └── style.css        # Complete design system
│
├── js/
│   └── script.js        # All interactive functionality
│
├── assets/
│   └── images/          # (Place your local images here)
│
└── README.md           # This file
```

---

## Installation & Local Use

1. Download or clone this repository.
2. Open `index.html` in any modern browser.
3. That's it — no build step, no dependencies to install.

To serve locally (optional, for testing):

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

---

## Customization Guide

### How to Change the Salon Name

The brand name "Lumière Beauty Studio" appears in the HTML of each page. To change it:

1. **In each HTML file**, find and replace:
   - `Lumière` → Your salon name
   - `lumierebeautystudio` → your handle (for email/social)

2. **Logo mark**: Find `<span class="logo-mark">L</span>` and change the letter.

3. **The brand name is NOT in JavaScript** — it's all in HTML, making it easy to find and replace.

### How to Change Colors

All colors are defined as CSS variables at the top of `css/style.css`:

```css
:root {
  --color-background: #faf8f5;  /* Page background */
  --color-surface: #ffffff;     /* Cards, surfaces */
  --color-cream: #f5f0ea;       /* Alternate sections */
  --color-text: #2b2724;        /* Body text */
  --color-muted: #8a8278;       /* Secondary text */
  --color-accent: #b08968;      /* Primary accent (gold/bronze) */
  --color-accent-dark: #97714f; /* Hover states */
  --color-accent-light: #d4b896;/* Light accent */
}
```

Change these values and the entire site updates instantly.

### How to Change Images

Images currently use Pexels URLs. To use your own:

1. Place image files in `assets/images/`
2. In each HTML file, replace the `src` attribute:
   ```html
   <!-- Before -->
   <img src="https://images.pexels.com/...">
   <!-- After -->
   <img src="assets/images/your-image.jpg">
   ```
3. Update the `alt` text to describe your image.

### How to Change Prices

Prices appear in two places:

1. **Home page** (`index.html`) — Service cards in the "Signature Services" section
2. **Services page** (`services.html`) — Full service list

Find `&#8377;` (the ₹ symbol) followed by the price amount and change the number.

### How to Change the WhatsApp Number

In `js/script.js`, find the `CONFIG` object at the top:

```javascript
const CONFIG = {
  whatsappNumber: '919999999999', // Replace with your number (country code + number, no +)
  whatsappMessage: "Hello! I'd like to book an appointment...",
};
```

Remove the `+` and any spaces. Example: `919876543210` for +91 98765 43210.

### How to Change Phone, Email, Address, Hours

These appear in the footer of every page and on the contact page. Find and replace:

- `+91 99999 99999` → Your phone number
- `hello@lumierebeautystudio.com` → Your email
- `123 Luxury Avenue, New Delhi` → Your address
- `Mon–Sat: 10:00 AM – 8:00 PM` → Your hours
- `Sunday: 11:00 AM – 6:00 PM` → Your Sunday hours

Also update the JSON-LD structured data in `index.html` (in the `<script type="application/ld+json">` block).

### How to Change Social Links

In the footer of each page, find the `footer-social` section and replace the `href="#"` with your social URLs:

```html
<a href="https://instagram.com/yourhandle" aria-label="Instagram">
<a href="https://facebook.com/yourpage" aria-label="Facebook">
<a href="https://youtube.com/yourchannel" aria-label="YouTube">
```

### How to Change Testimonials

In `index.html`, find the testimonials section. Each testimonial has:

- Star rating (5 `<i class="fas fa-star"></i>` icons)
- Quote text in `<p class="testimonial-text">`
- Author name in `<h4>`
- Author role in `<span>`
- Avatar initial in `<div class="testimonial-avatar">`

### How to Change Team Members

In `about.html`, find the team section. Each member has:

- Image (`team-card-img`)
- Name (`<h3>`)
- Role (`<p class="team-role">`)
- Bio (`<p class="team-bio">`)

### How to Change Services

In `services.html`, each service is a `service-item` div containing:
- Service name (`<h4>`)
- Description (`<p>`)
- Price (`<span class="price">`)
- The booking button (`data-booking-open`)

To add a new service, copy a `service-item` block and change the content.

### How to Connect the Booking Form to a Backend

In `js/script.js`, find the `submitBookingForm()` function:

```javascript
function submitBookingForm(formData) {
  // Replace this with your API call, e.g.:
  // fetch('/api/booking', { method: 'POST', body: formData })
  //   .then(response => { ... })
}
```

### How to Connect the Contact Form to a Backend

In `js/script.js`, find the `submitContactForm()` function:

```javascript
function submitContactForm(formData) {
  // For Formspree:
  // fetch('https://formspree.io/f/your-id', {
  //   method: 'POST', body: formData,
  //   headers: { 'Accept': 'application/json' }
  // }).then(response => { ... })
}
```

---

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files (or push via git).
3. Go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Select **main** branch and **/ (root)** folder.
6. Click **Save**.
7. Your site will be live at `https://yourusername.github.io/your-repo-name/` within a few minutes.

> **Note**: This template uses relative paths (`css/style.css`, `js/script.js`), so it works correctly even when deployed from a repository subdirectory.

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

---

## License

This template is free to use and customize for personal and commercial projects. Attribution is appreciated but not required.

---

## Credits

- **Fonts**: Google Fonts — Cormorant Garamond, Jost
- **Icons**: Font Awesome 6
- **Photography**: Pexels (placeholder images — replace with your own for production)
- **Map**: Google Maps embed

---

## Demo Content Notice

All content on this website is fictional demo content for the brand "Lumière Beauty Studio." All names, testimonials, team members, prices, and contact details are placeholders designed to be easily replaced with real information.
