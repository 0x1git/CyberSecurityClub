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
});
