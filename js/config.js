/**
 * LUMIÈRE BEAUTY STUDIO - CENTRAL BUSINESS CONFIGURATION
 * 
 * =========================================================================
 * ⚠️ REPLACE BEFORE CLIENT DELIVERY ⚠️
 * All primary business details are centralized here. Updating values in
 * this configuration automatically updates relevant dynamic text, contact
 * links, social icons, and WhatsApp triggers across the website.
 * =========================================================================
 */

const SALON_CONFIG = {
  // Brand Identity
  businessName: "Lumière Beauty Studio",
  tagline: "Where Beauty Meets Confidence",
  shortDescription: "Premium hair styling, advanced skin treatments, bespoke bridal beauty, and luxury nail care crafted around you.",

  // Contact Information (DEMO PLACEHOLDERS - REPLACE BEFORE CLIENT DELIVERY)
  phone: "+91 99999 99999",
  phoneRaw: "+919999999999",
  whatsappNumber: "919999999999",
  whatsappMessage: "Hi Lumière Beauty Studio, I would like to book an appointment.",
  email: "hello@lumierebeautystudio.com",

  // Physical Location
  address: "123 Luxury Avenue, Ground Floor",
  city: "New Delhi, Delhi",
  postalCode: "110001",
  country: "India",
  fullAddress: "123 Luxury Avenue, New Delhi, Delhi 110001, India",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114885827677!2d77.218536!3d28.632429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b8a7a919%3A0xda550882e70e9f13!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // Business Hours
  openingHours: {
    weekdays: "Mon – Sat: 10:00 AM – 8:00 PM",
    sunday: "Sunday: 11:00 AM – 6:00 PM",
    schedule: "Monday – Saturday 10:00 AM to 8:00 PM | Sunday 11:00 AM to 6:00 PM"
  },

  // Social Media Links (DEMO CONTENT - REPLACE WITH ACTUAL CLIENT SOCIAL URLS)
  socialLinks: {
    instagram: "https://instagram.com/lumierebeautystudio",
    facebook: "https://facebook.com/lumierebeautystudio",
    youtube: "https://youtube.com/@lumierebeautystudio",
    pinterest: "https://pinterest.com/lumierebeautystudio"
  },

  // Services Starting Prices (INR currency format)
  startingPrices: {
    haircut: "₹800",
    hairColor: "₹2,500",
    facial: "₹1,200",
    bridal: "₹15,000",
    nails: "₹600",
    makeup: "₹2,000"
  },

  // Currency symbol & code
  currency: "₹",
  currencyCode: "INR",

  // Helper method to get WhatsApp Booking Link with prefilled text
  getWhatsAppUrl(customMessage) {
    const text = encodeURIComponent(customMessage || this.whatsappMessage);
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }
};

// Export for module or global browser scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SALON_CONFIG;
} else if (typeof window !== 'undefined') {
  window.SALON_CONFIG = SALON_CONFIG;
}
