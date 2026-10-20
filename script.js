// Jeyasingh T. — portfolio interactions
const typedElement = document.getElementById("typed-text");
const phrases = ["web experiences", "creative websites", "interactive ideas"];
let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeWords() {
  if (!typedElement) return;
  const phrase = phrases[phraseIndex];
  typedElement.textContent = phrase.slice(0, characterIndex);

  if (!deleting && characterIndex < phrase.length) {
    characterIndex++;
    setTimeout(typeWords, 75);
  } else if (!deleting && characterIndex === phrase.length) {
    deleting = true;
    setTimeout(typeWords, 1300);
  } else if (deleting && characterIndex > 0) {
    characterIndex--;
    setTimeout(typeWords, 35);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeWords, 350);
  }
}
typeWords();

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Reveal elements as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the navigation link for the visible section.
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

// Keep the footer year current.
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
