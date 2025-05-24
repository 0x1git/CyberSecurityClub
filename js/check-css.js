console.log("CSS loaded check");

// Get the contact section
const contactSection = document.querySelector('.contact-section');

// Log styles to debug
if (contactSection) {
  const styles = window.getComputedStyle(contactSection);
  console.log("Contact section background:", styles.backgroundColor);
  console.log("Contact section padding:", styles.padding);
}

// Check if contact.css is loaded
const isContactCSSLoaded = Array.from(document.styleSheets)
  .some(sheet => sheet.href && sheet.href.includes('contact.css'));
console.log("Is contact.css loaded:", isContactCSSLoaded);

// List all loaded stylesheets
console.log("Loaded stylesheets:");
Array.from(document.styleSheets).forEach((sheet, index) => {
  console.log(`${index}: ${sheet.href || 'inline'}`);
});
