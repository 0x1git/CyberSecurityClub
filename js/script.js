document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Update accessibility
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
    });

    // Close menu on nav link click
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Typing effect
  const text = "Securing Tomorrow, Today !";
  const speed = 100;
  let index = 0;

  function typeWriter() {
    const typedTextElement = document.getElementById("typed-text");
    if (!typedTextElement) return;

    if (index < text.length) {
      typedTextElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter(); // Start typing directly on DOM ready
  // Enhanced Scroll effect for transparent navbar
  function updateNavbarTransparency() {
    const navbar = document.getElementById("navbar");
    const scrollPosition = window.scrollY;
    
    if (navbar) {
      // Add scrolled class when user scrolls down
      navbar.classList.toggle("scrolled", scrollPosition > 50);
      
      // Make sure navbar is always visible at top
      if (scrollPosition === 0) {
        navbar.style.backgroundColor = "transparent";
        navbar.style.boxShadow = "none";
      }
    }
  }
  
  // Initial call to set the correct state
  updateNavbarTransparency();
  // Listen for scroll events
  window.addEventListener("scroll", updateNavbarTransparency);

  // Team Slider Functionality
  initTeamSlider();
});

function initTeamSlider() {
  const track = document.querySelector('.team-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.team-card');
  const cardWidth = 350 + 30; // card width + gap
  const cardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1200 ? 2 : 3;
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  
  let currentSlide = 0;

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update dots
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const translateX = -(currentSlide * cardsPerView * cardWidth);
    track.style.transform = `translateX(${translateX}px)`;
    updateDots();
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Initialize
  createDots();

  // Auto-play (optional)
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Pause auto-play on hover
  const sliderContainer = document.querySelector('.team-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }

  // Handle resize
  window.addEventListener('resize', () => {
    const newCardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1200 ? 2 : 3;
    if (newCardsPerView !== cardsPerView) {
      location.reload(); // Simple solution for responsive changes
    }
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
      isDragging = false;
  });
}
