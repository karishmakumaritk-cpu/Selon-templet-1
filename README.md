# Lumière Beauty Studio — Luxury Editorial Salon Website Template #1

> **Where Beauty Meets Confidence**  
> A premium, high-end commercial website template designed for luxury salons, beauty studios, spas, hair artists, and bridal sanctuaries.

---

## 📖 Project Overview

**Lumière Beauty Studio** (Template #1: *Luxury Editorial Beauty Salon*) is a production-ready, fully responsive static website template engineered with HTML5, CSS3, and modern Vanilla JavaScript. Built to agency standards, this template delivers a warm luxury aesthetic with editorial typography, sophisticated color palettes, smooth interactions, and zero heavy framework overhead.

---

## ✨ Features & Highlights

- **Agency-Grade Editorial Aesthetic**: Warm ivory, cream, soft beige, champagne gold, and deep charcoal.
- **Pure Static Architecture**: 100% compatible with GitHub Pages, Cloudflare Pages, Netlify, Vercel, or standard Apache/Nginx hosting.
- **Centralized Configuration (`js/config.js`)**: Update salon name, phone, WhatsApp number, email, address, opening hours, and social media links in one file.
- **Accessible Sticky Header**: Smooth shrink animation on scroll, active page indicator, and keyboard-friendly navigation.
- **Interactive Mobile Drawer Menu**: Full-screen slide-in mobile navigation with body scroll lock and escape-key handling.
- **Appointment Booking Modal**: Client-side validation for name, phone, service, date, and preferred time with a clean confirmation banner.
- **Gallery with Vanilla JS Filtering & Lightbox**: Instant category filtering (Hair, Makeup, Bridal, Nails, Salon) and full-screen lightbox with keyboard navigation (`←`, `→`, `Esc`).
- **Direct WhatsApp Integration**: Pre-configured WhatsApp deep links with prefilled message strings (`https://wa.me/...`).
- **SEO & Accessibility Optimized**: Semantic HTML5, WCAG AA contrast compliance, ARIA attributes, Open Graph tags, and LocalBusiness JSON-LD structured data.
- **Zero Framework / Zero Dependency Runtime**: Blazing fast load times with lazy-loaded imagery and no build step required.

---

## 📄 Website Pages

1. **`index.html`** — Luxury Editorial Home Page:
   - High-impact editorial hero with 10+ Years credibility badge
   - Key trust statistics (Experience, Clients, Services, Rating)
   - Asymmetrical About preview with aesthetic framing
   - 6 Signature service cards with starting prices & direct booking
   - Featured Personalized Consultation experience banner
   - "Why Women Choose Lumière" numbered editorial benefits (01–04)
   - Visual gallery preview
   - Client Love testimonials (Demo Content)
   - Social / Instagram beauty journal grid
   - Final call to action with direct WhatsApp & booking triggers
2. **`about.html`** — Studio Story, Philosophy, Approach, and Meet the Team
3. **`services.html`** — Comprehensive categorization (Hair, Skin, Makeup, Nails, Bridal Packages) with transparent starting prices and booking buttons
4. **`gallery.html`** — Filterable photo portfolio with interactive fullscreen lightbox modal
5. **`contact.html`** — Location details, direct contact info, business hours, embedded map, and validated inquiry form

---

## 🛠 Technology Stack

- **Markup**: Semantic HTML5
- **Styling**: CSS3 with CSS Custom Properties (Variables) & Fluid `clamp()` Typography
- **Typography**: Google Fonts (*Cormorant Garamond* for serif display headings & *DM Sans* for body copy)
- **Icons**: Font Awesome 6.5.1
- **Scripting**: Vanilla JavaScript (ES6+)
- **Deployment**: GitHub Actions static deployment (`.github/workflows/deploy.yml`)

---

## 📁 Folder Structure

```text
lumiere-salon-template-01/
├── index.html                  # Home Page
├── about.html                  # About Page
├── services.html               # Services & Treatment Menu
├── gallery.html                # Filterable Gallery & Lightbox
├── contact.html                # Contact & Location Page
│
├── css/
│   └── style.css               # Global Design System & Responsive Styles
│
├── js/
│   ├── config.js               # Central Business Configuration (Edit this first!)
│   └── main.js                 # Header, Modal, Gallery, Lightbox & Validation
│
├── assets/
│   └── favicon.svg             # Luxury Monogram SVG Favicon
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages Deployment Action
│
├── package.json                # Project manifest & local dev scripts
├── server.js                   # Minimal Express server for local container preview
├── metadata.json               # Platform manifest
└── README.md                   # Complete template guide & documentation
```

---

## 🎨 How to Customize for a Client

### 1. Change Salon Name & Contact Details
Open **`js/config.js`** and edit the centralized variables:
```javascript
const SALON_CONFIG = {
  businessName: "Lumière Beauty Studio",    // Change to client's salon name
  tagline: "Where Beauty Meets Confidence", // Change to client's tagline
  phone: "+91 99999 99999",                 // Formatted display phone
  phoneRaw: "+919999999999",               // Raw phone for tel: links
  whatsappNumber: "919999999999",           // International format without '+'
  whatsappMessage: "Hi Lumière Beauty Studio, I would like to book an appointment.",
  email: "hello@lumierebeautystudio.com",
  address: "123 Luxury Avenue, Ground Floor",
  city: "New Delhi, Delhi",
  postalCode: "110001",
  openingHours: {
    weekdays: "Mon – Sat: 10:00 AM – 8:00 PM",
    sunday: "Sunday: 11:00 AM – 6:00 PM"
  }
};
```

### 2. Change Brand Colors
Open **`css/style.css`** and modify the root variables:
```css
:root {
  --color-background: #FAF8F5; /* Warm Ivory canvas */
  --color-surface: #FFFFFF;    /* Pure white surface */
  --color-surface-alt: #F4EFEB;/* Soft warm beige */
  --color-text: #23201D;       /* Deep warm charcoal */
  --color-accent: #B38E5D;     /* Champagne Gold */
  --color-accent-hover: #987545;
}
```

### 3. Change Typography
In **`css/style.css`**, adjust `--font-heading` or `--font-body`:
```css
:root {
  --font-heading: 'Cormorant Garamond', Garamond, serif;
  --font-body: 'DM Sans', sans-serif;
}
```

### 4. Change Images
All images use standard HTML `<img>` tags with Unsplash / local photography. To customize:
- Replace image URLs or place client photos in an `/assets/images/` folder.
- Ensure all `alt` tags describe the specific service or client visual.

### 5. Change Services & Pricing
Edit the service blocks in `services.html` and `index.html`. Format starting prices with proper spacing (e.g. `Starting from ₹800`).

### 6. Connect Booking & Contact Forms to Backend
The booking modal and contact form are validated on the client side. To connect to an email dispatch service or CRM:
- **Formspree**: Set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` on the `<form>` element.
- **Netlify Forms**: Add `data-netlify="true"` to `<form>`.
- **Custom Webhook / API**: Listen to the form submit event in `js/main.js` and `fetch('/api/book', { method: 'POST', body: ... })`.

---

## 🚀 GitHub Pages Deployment

This repository includes a ready-to-use GitHub Actions workflow:
1. Push this repository to GitHub on the `main` branch.
2. In your repository settings on GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build and deploy your static site.
5. Your live website will be accessible at: `https://<USERNAME>.github.io/<REPO-NAME>/`

*Note: All stylesheet, script, and page links use relative paths (`./`) so the site will work cleanly on root domains or repository subpaths without 404 errors.*

---

## 📦 Client Delivery Checklist

Before handing the website over to your client:
- [ ] Update `js/config.js` with verified business details
- [ ] Replace demo team members in `about.html` with real stylists
- [ ] Replace demo testimonials in `index.html` with authentic client reviews
- [ ] Update social media handles in `js/config.js`
- [ ] Update Google Maps iframe coordinates in `contact.html` and `js/config.js`
- [ ] Test the WhatsApp booking link on both mobile and desktop
- [ ] Verify form submissions to your preferred backend or email inbox
- [ ] Review SEO meta tags and JSON-LD schema on each page

---

## ⚖️ License & Commercial Use

Created as a reusable commercial website template for salons, spas, and beauty businesses.
© 2026 Lumière Beauty Studio. All Rights Reserved.
