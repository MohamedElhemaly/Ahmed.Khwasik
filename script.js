// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const scrolled = window.scrollY > 50;

  if (scrolled) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";

  // Update ARIA state
  const isExpanded = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isExpanded);
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
        hamburger.setAttribute("aria-expanded", "false");
      }

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class based on scroll position
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Initialize navbar on load
document.addEventListener("DOMContentLoaded", () => {
  // Add active class to home link by default
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }

  // Initialize other functions
  checkProfileImage();
  setupContactFunctions();
  setupFormHandler();
});

// Profile image handling
function checkProfileImage() {
  const profileImage = document.getElementById("profile-pic");
  const imagePlaceholder = document.getElementById("image-placeholder");

  if (profileImage && profileImage.src) {
    // Check if image loaded successfully
    profileImage.onload = function () {
      profileImage.style.display = "block";
      if (imagePlaceholder) imagePlaceholder.style.display = "none";
    };

    profileImage.onerror = function () {
      if (profileImage) profileImage.style.display = "none";
      if (imagePlaceholder) imagePlaceholder.style.display = "flex";
    };

    // Trigger check
    if (profileImage.complete) {
      if (profileImage.naturalHeight !== 0) {
        profileImage.style.display = "block";
        if (imagePlaceholder) imagePlaceholder.style.display = "none";
      } else {
        if (profileImage) profileImage.style.display = "none";
        if (imagePlaceholder) imagePlaceholder.style.display = "flex";
      }
    }
  }
}

// Skill bars animation
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width;
  });
};

const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkillBars();
    }
  });
}, observerOptions);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Contact functions
function setupContactFunctions() {
  // Add click effect to contact items
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "translateY(-5px)";
      }, 150);
    });
  });
}

function openMap() {
  const address = "7 Dawood El-Azab St., Damanhour, Beheira, Egypt";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  window.open(mapsUrl, "_blank");
}

function callPhone() {
  window.location.href = "tel:+201026757026";
}

function sendEmail() {
  window.location.href =
    "mailto:ahmedkhwasik102@gmail.com?subject=Contact%20from%20Portfolio&body=Hello%20Ahmed,";
}

function openLinkedIn() {
  const linkedinUrl = "https://www.linkedin.com/in/ahmed-khwasik-000341211/";
  window.open(linkedinUrl, "_blank");
}

// Form submission handling
function setupFormHandler() {
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      alert(
        `Thank you ${name}! Your message has been sent successfully. I will get back to you soon at ${email}.`
      );

      this.reset();
    });
  }
}
