/**
 * Simple Router for Rocvon Website
 * Handles client-side navigation between pages
 */

class SimpleRouter {
  constructor() {
    this.routes = {
      'home': 'index.html',
      'tours': 'pages/tours.html',
      'about': 'pages/about.html',
      'booking': 'pages/booking.html',
      'faq': 'pages/faq.html',
      'team': 'pages/team.html'
    };

    this.currentPage = this.getCurrentPage();
    this.init();
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        this.loadPage(e.state.page, false);
      }
    });

    // Handle initial page load
    this.handleInitialLoad();

    // Handle navigation clicks
    this.setupNavigationListeners();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash.substring(1);

    if (hash) {
      return hash;
    }

    if (path.includes('tours.html')) return 'tours';
    if (path.includes('about.html')) return 'about';
    if (path.includes('booking.html')) return 'booking';
    if (path.includes('faq.html')) return 'faq';
    if (path.includes('team.html')) return 'team';

    return 'home';
  }

  handleInitialLoad() {
    const currentPage = this.getCurrentPage();

    // If we're on a page file but not the home page, load the content
    if (currentPage !== 'home' && !document.querySelector('.router-content')) {
      this.loadPage(currentPage, false);
    } else {
      this.setupPage(currentPage);
    }
  }

  setupNavigationListeners() {
    // Handle navigation menu clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('nav a[href^="#"]')) {
        e.preventDefault();
        const page = e.target.getAttribute('href').substring(1);
        this.navigateTo(page);
      }

      // Handle buttons that should navigate
      if (e.target.matches('.btn-book, .btn-pill[href^="#"], .ghost[href^="#"]')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
          const page = href.substring(1);
          this.navigateTo(page);
        }
      }

      // Handle "Lihat semua tur" button
      if (e.target.matches('.see-all')) {
        e.preventDefault();
        this.navigateTo('tours');
      }

      // Handle "Lihat tim kami" button and other ghost buttons
      if (e.target.matches('.ghost[href*="#team"], .ghost[href*="team"]')) {
        e.preventDefault();
        this.navigateTo('team');
      }

      // Handle "Hubungi kami" buttons
      if (e.target.matches('.btn-pill[href*="#contact"], .ghost[href*="#contact"]')) {
        e.preventDefault();
        alert('Fitur kontak sedang dalam pengembangan. Silakan hubungi kami melalui WhatsApp.');
      }

      // Handle "WhatsApp Kami" buttons
      if (e.target.textContent && e.target.textContent.includes('WhatsApp')) {
        e.preventDefault();
        alert('Fitur WhatsApp sedang dalam pengembangan.');
      }
    });
  }

  navigateTo(page) {
    if (this.routes[page]) {
      this.loadPage(page, true);
    }
  }

  async loadPage(page, updateHistory = true) {
    try {
      const response = await fetch(this.routes[page]);
      const html = await response.text();

      // Extract main content (everything inside <main> tags)
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('main');

      if (newContent) {
        // Replace current main content
        const currentMain = document.querySelector('main');
        if (currentMain) {
          currentMain.innerHTML = newContent.innerHTML;
        }

        // Update page title
        const newTitle = doc.querySelector('title');
        if (newTitle) {
          document.title = newTitle.textContent;
        }

        // Update active navigation
        this.updateActiveNavigation(page);

        // Update URL without triggering page reload
        if (updateHistory) {
          const url = page === 'home' ? '/' : `#${page}`;
          history.pushState({ page }, '', url);
        }

        // Setup page-specific functionality
        this.setupPage(page);

        this.currentPage = page;
      }
    } catch (error) {
      console.error('Error loading page:', error);
      // Fallback to direct navigation
      window.location.href = this.routes[page];
    }
  }

  updateActiveNavigation(currentPage) {
    // Remove active class from all nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current page link
    const activeLink = document.querySelector(`nav a[href="#${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  setupPage(page) {
    // Setup page-specific functionality
    switch (page) {
      case 'booking':
        this.setupBookingPage();
        break;
      case 'faq':
        this.setupFAQPage();
        break;
      case 'tours':
        this.setupToursPage();
        break;
    }
  }

  setupBookingPage() {
    // Re-setup booking form if it exists
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        if (!data.fullName || !data.email || !data.phone || !data.tripType || !data.destination) {
          alert('Mohon lengkapi semua field yang wajib diisi.');
          return;
        }

        alert('Terima kasih! Booking request Anda telah dikirim. Tim kami akan menghubungi Anda dalam 24 jam.');
        this.reset();
      });
    }
  }

  setupFAQPage() {
    // Re-setup FAQ toggles if they exist
    document.querySelectorAll('.faq-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');

        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        button.textContent = answer.style.display === 'block' ? '-' : '+';

        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
          if (otherAnswer !== answer) {
            otherAnswer.style.display = 'none';
            const otherButton = otherAnswer.closest('.faq-item').querySelector('.faq-toggle');
            if (otherButton) otherButton.textContent = '+';
          }
        });
      });
    });
  }

  setupToursPage() {
    // Setup tour booking buttons
    document.querySelectorAll('.btn-book').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        // Navigate to booking page with tour context
        this.navigateTo('booking');
      });
    });
  }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.router = new SimpleRouter();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleRouter;
}
