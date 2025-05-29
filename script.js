// --------------------------
// Imports and Plugin Registration
// --------------------------
gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

// --------------------------
// State Variables
// --------------------------
let introPlayed = false;          // false = intro not yet played, true = intro has played (post-animation)
let currentSection = "first";     // "first", "second", "third", or "fourth"
let isAnimating = false;          // Prevents overlapping animations
let lastGestureTime = 0;          // Simple debounce timestamp
const GESTURE_DEBOUNCE = 300;     // 300ms debounce threshold

// --------------------------
// Initial Element Setup
// --------------------------
const homeButton    = document.querySelector("#home-button");
const greeting      = document.querySelector(".title-greeting");
const titleName     = document.querySelector(".title-name");
const imageGreeting = document.querySelector(".image-greeting");
const bgImage       = document.querySelector(".bg-image");
const nav           = document.querySelector("nav");

// --------------------------
// GSAP Initial Setup
// --------------------------
gsap.set(homeButton,    { opacity: 0 });
gsap.set(greeting,      { opacity: 1 });
gsap.set(titleName,     { scale: 1, y: "0%", x: "0%" });
gsap.set(imageGreeting, { opacity: 0, scale: 0.5, y: "130%", x: "-20%" });
gsap.set(bgImage,       { filter: "blur(80px) brightness(0.5)", scale: 1.5 });
gsap.set(nav,           { y: "48vh", x: "100%", opacity: 0 });

// --------------------------
// ScrollTrigger Section Pinning
// --------------------------
ScrollTrigger.create({
  trigger: ".first",
  start: "top top",
  end: "+=100%",
  pin: true
});

ScrollTrigger.create({
  trigger: ".second",
  start: "top top",
  end: "+=100%",
  pin: true
});

ScrollTrigger.create({
  trigger: ".third",
  start: "top top",
  end: "+=100%",
  pin: true
});

ScrollTrigger.create({
  trigger: ".fourth",
  start: "top top",
  end: "+=100%",
  pin: true
});

// --------------------------
// Intro Animation Timeline
// --------------------------
const tlIntro = gsap.timeline({ paused: true });
tlIntro
  .to(greeting,      { opacity: 0, duration: 1, ease: "power2.out" }, "<")
  .to(titleName,     { scale: 0.6, y: "-10vh", x: "25vw", duration: 1, ease: "power2.out" }, "<")
  .to(nav,           { x: "10%", opacity: 1, duration: 1, ease: "power2.out" }, "<")
  .to(imageGreeting, { opacity: 1, scale: 0.8, y: "-38%", x: "-40%", duration: 1, ease: "power2.out" }, "<")
  .to(bgImage,       { filter: "blur(0px) brightness(1)", scale: 1, duration: 1, ease: "power2.out" }, "<")
  .to(homeButton,    { opacity: 0, duration: 0, ease: "none" }, "<");

// --------------------------
// Helper Functions for Scrolling
// --------------------------
function scrollToSecond() {
  isAnimating = true;
  gsap.to(window, {
    scrollTo: { y: ".second", autoKill: false },
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      currentSection = "second";
      isAnimating = false;
      ScrollTrigger.refresh();
    }
  });
}

function scrollToThird() {
  isAnimating = true;
  gsap.to(window, {
    scrollTo: { y: ".third", autoKill: false },
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      currentSection = "third";
      isAnimating = false;
      ScrollTrigger.refresh();
    }
  });
}

function scrollToFourth() {
  isAnimating = true;
  gsap.to(window, {
    scrollTo: { y: ".fourth", autoKill: false },
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      currentSection = "fourth";
      isAnimating = false;
      ScrollTrigger.refresh();
    }
  });
}

function scrollUpToFirst() {
  isAnimating = true;
  gsap.to(window, {
    scrollTo: { y: ".first", autoKill: false },
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      currentSection = "first";
      isAnimating = false;
      ScrollTrigger.refresh();
    }
  });
}

// --------------------------
// Event Listeners for Navigation
// --------------------------
Observer.create({
  target: window,
  type: "wheel,touch",
  onDown: () => {
    if (Date.now() - lastGestureTime < GESTURE_DEBOUNCE) return;
    lastGestureTime = Date.now();
    if (isAnimating) return;

    if (currentSection === "first") {
      if (!introPlayed) {
        isAnimating = true;
        tlIntro.play().eventCallback("onComplete", () => {
          introPlayed = true;
          isAnimating = false;
        });
      } else {
        scrollToSecond();
      }
    } else if (currentSection === "second") {
      scrollToThird();
    } else if (currentSection === "third") {
      scrollToFourth();
    }
  },
  onUp: () => {
    if (Date.now() - lastGestureTime < GESTURE_DEBOUNCE) return;
    lastGestureTime = Date.now();
    if (isAnimating) return;

    if (currentSection === "fourth") {
      scrollToThird();
    } else if (currentSection === "third") {
      scrollToSecond();
    } else if (currentSection === "second") {
      scrollUpToFirst();
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (isAnimating) return;

  switch (event.key) {
    case "ArrowDown":
    case "PageDown":
      if (currentSection === "first") {
        if (!introPlayed) {
          isAnimating = true;
          tlIntro.play().eventCallback("onComplete", () => {
            introPlayed = true;
            isAnimating = false;
          });
        } else {
          scrollToSecond();
        }
      } else if (currentSection === "second") {
        scrollToThird();
      } else if (currentSection === "third") {
        scrollToFourth();
      }
      break;

    case "ArrowUp":
    case "PageUp":
      if (currentSection === "fourth") {
        scrollToThird();
      } else if (currentSection === "third") {
        scrollToSecond();
      } else if (currentSection === "second") {
        scrollUpToFirst();
      }
      break;

    case "Enter":
      if (currentSection === "first" && !introPlayed) {
        isAnimating = true;
        tlIntro.play().eventCallback("onComplete", () => {
          introPlayed = true;
          isAnimating = false;
        });
      }
      break;

    default:
      break;
  }
});

// ----------------------------------------------------------------------
// PART 2: Modal Functionality and Smooth Scrolling for Navbar Links
// ----------------------------------------------------------------------
// --------------------------
// Modal Functionality
// --------------------------
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const modal = document.getElementById('portfolio-modal');
    modal.style.display = "flex";

    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    const modalContent = modal.querySelector(".modal-content");
    modalContent.classList.add("show");

    document.getElementById("modal-title").textContent = item.getAttribute("data-title");
    // Removed modalImage assignment since it's no longer used

    document.getElementById("modal-objective").textContent = item.getAttribute("data-objective");

    const keypoints = item.getAttribute("data-keypoints").split("|");
    const keypointsImages = item.getAttribute("data-keypoints-images").split("|");
    const keypointsList = document.getElementById("modal-keypoints");
    keypointsList.innerHTML = "";

    keypoints.forEach((point, index) => {
      const li = document.createElement("li");
      li.textContent = point;
      li.classList.add("keypoint-item");

      li.addEventListener("click", () => {
        // Close any open keypoint-image containers (except the one immediately following this li)
        document.querySelectorAll(".keypoint-image-container").forEach(container => {
          if (container.previousElementSibling !== li) {
            container.style.height = "0";
            setTimeout(() => {
              container.remove();
            }, 300);
          }
        });

        const existingImage = li.nextElementSibling;
        if (existingImage && existingImage.classList.contains("keypoint-image-container")) {
          // Toggle it closed if already open
          existingImage.style.height = "0";
          setTimeout(() => {
            existingImage.remove();
          }, 300);
        } else {
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("keypoint-image-container");
          imageContainer.style.overflow = "hidden";
          imageContainer.style.height = "0";
          imageContainer.style.transition = "height 0.3s ease";

          const img = document.createElement("img");
          img.src = keypointsImages[index];
          img.alt = point;
          // Add our custom class to enforce a cinematic, narrow-widescreen look
          img.classList.add("modal-keypoint");

          imageContainer.appendChild(img);
          li.insertAdjacentElement("afterend", imageContainer);

          setTimeout(() => {
            imageContainer.style.height = img.offsetHeight + "px";
          }, 10);
        }
      });

      keypointsList.appendChild(li);
    });
  });
});

// Add event listener for opening portfolio-item modals with the Enter key
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const modal = document.getElementById('portfolio-modal');
      modal.style.display = "flex";

      setTimeout(() => {
        modal.classList.add("show");
      }, 10);

      const modalContent = modal.querySelector(".modal-content");
      modalContent.classList.add("show");

      document.getElementById("modal-title").textContent = item.getAttribute("data-title");
      // Removed modalImage assignment since it's no longer used

      document.getElementById("modal-objective").textContent = item.getAttribute("data-objective");

      const keypoints = item.getAttribute("data-keypoints").split("|");
      const keypointsImages = item.getAttribute("data-keypoints-images").split("|");
      const keypointsList = document.getElementById("modal-keypoints");
      keypointsList.innerHTML = "";

      keypoints.forEach((point, index) => {
        const li = document.createElement("li");
        li.textContent = point;
        li.classList.add("keypoint-item");
        li.tabIndex = 0; // Make keypoints focusable

        li.addEventListener("click", () => {
          // Close any open keypoint-image containers (except the one immediately following this li)
          document.querySelectorAll(".keypoint-image-container").forEach(container => {
            if (container.previousElementSibling !== li) {
              container.style.height = "0";
              setTimeout(() => {
                container.remove();
              }, 300);
            }
          });

          const existingImage = li.nextElementSibling;
          if (existingImage && existingImage.classList.contains("keypoint-image-container")) {
            existingImage.style.height = "0";
            setTimeout(() => {
              existingImage.remove();
            }, 300);
          } else {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("keypoint-image-container");
            imageContainer.style.overflow = "hidden";
            imageContainer.style.height = "0";
            imageContainer.style.transition = "height 0.3s ease";

            const img = document.createElement("img");
            img.src = keypointsImages[index];
            img.alt = point;
            img.classList.add("modal-keypoint");

            imageContainer.appendChild(img);
            li.insertAdjacentElement("afterend", imageContainer);

            setTimeout(() => {
              imageContainer.style.height = img.offsetHeight + "px";
            }, 10);
          }
        });

        li.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            li.click();
          }
        });

        keypointsList.appendChild(li);
      });
    }
  });
});

document.querySelector('.close').addEventListener('click', () => {
  const modal = document.getElementById('portfolio-modal');
  const modalContent = modal.querySelector('.modal-content');

  modalContent.style.opacity = '0';
  modalContent.style.transform = 'scale(0.9)';

  setTimeout(() => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    modalContent.style.opacity = '';
    modalContent.style.transform = '';
  }, 300);
});

window.addEventListener('click', event => {
  const modal = document.getElementById('portfolio-modal');
  if (event.target === modal) {
    const modalContent = modal.querySelector('.modal-content');

    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.9)';

    setTimeout(() => {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalContent.style.opacity = '';
      modalContent.style.transform = '';
    }, 300);
  }
});

document.addEventListener('keydown', (event) => {
  const modal = document.getElementById('portfolio-modal');
  if (modal.classList.contains('show')) {
    if (event.key === 'Escape') {
      const closeButton = modal.querySelector('.close');
      closeButton.click();
    } else if (event.key === 'Tab') {
      const focusableElements = modal.querySelectorAll('button, [tabindex="0"]');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
});


// --------------------------
// ScrollTrigger Logic for Navbar and Home Button
// --------------------------
if (!window.matchMedia("(max-width: 768px)").matches) {
  gsap.to(nav, {
    scrollTrigger: {
      trigger: ".first",
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      onEnter: () => {
        nav.classList.add("nav--fixed");
      },
      onLeaveBack: () => {
        nav.classList.remove("nav--fixed");
      }
    },
    y: "0",
    ease: "none"
  });
}

gsap.to(homeButton, {
  scrollTrigger: {
    trigger: ".second",
    start: "top center",
    end: "top top",
    scrub: true,
    onEnter: () => gsap.to(homeButton, { opacity: 1, duration: 0.5 }),
    onLeaveBack: () => gsap.to(homeButton, { opacity: 0, duration: 0.5 })
  }
});

// --------------------------
// Additional Event Listener for Home Button
// --------------------------
homeButton.addEventListener("click", () => {
  scrollUpToFirst();
});

// --------------------------
// Smooth Scrolling for Navbar Links 
// --------------------------
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault(); // Prevent default anchor behavior

    const href = link.getAttribute("href");
    let targetSection;

    switch (href) {
      case "#first":
        targetSection = document.querySelector(".first");
        break;
      case "#second":
        targetSection = document.querySelector(".second");
        break;
      case "#third":
        targetSection = document.querySelector(".third");
        break;
      case "#fourth":
        targetSection = document.querySelector(".fourth");
        break;
      default:
        targetSection = null;
    }

    if (targetSection) {
      gsap.to(window, {
        scrollTo: { y: targetSection, autoKill: false },
        duration: 1,
        ease: "power2.out"
      });
    }
  });
});

// ----------------------------------------------------------------------
// PART 3: Additional Sections and Focus Management for Pinned Sections
// ----------------------------------------------------------------------

// Make the about-me-info sections focusable and allow smooth scrolling on Enter.
document.querySelectorAll('.about-me-info').forEach(section => {
  section.tabIndex = 0;
  section.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the browser's native scrolling
      gsap.to(window, {
        scrollTo: {
          y: section,       // Scroll to the section element
          autoKill: false,  // Prevent interruption of the pinned scroll
          offsetY: 0        // Adjust this value if you need to tweak the final position
        },
        duration: 0.5,       // Smooth scroll duration (adjustable)
        ease: "power2.out"
      });
    }
  });
});


// Make the meet-my-team sections focusable and allow smooth scrolling on Enter.
document.querySelectorAll('.meet-my-team').forEach(section => {
  section.tabIndex = 0;
  section.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the browser's native scrolling
      gsap.to(window, {
        scrollTo: {
          y: section,       // Scroll to the section element
          autoKill: false,  // Prevent interruption of the pinned scroll
          offsetY: 0        // Adjust this value if you need to tweak the final position
        },
        duration: 0.5,       // Smooth scroll duration (adjustable)
        ease: "power2.out"
      });
    }
  });
});


// --------------------------
// Focus Management for Pinned Sections
// --------------------------
// This function updates focusability so that only the active pinned section’s focusable
// elements (".first", ".second", ".third", or ".fourth") get tabindex=0 and the rest are disabled (tabindex=-1).
// Navbar links remain always focusable.
function updateTabIndexesForSection(activeSection) {
  const focusableSelectors = 'a, button, input, textarea, select, [tabindex]';
  const pinnedSections = document.querySelectorAll('.first, .second, .third, .fourth');

  pinnedSections.forEach(section => {
    const focusableElements = section.querySelectorAll(focusableSelectors);
    focusableElements.forEach(el => {
      el.tabIndex = (section === activeSection) ? 0 : -1;
    });
  });

  // Ensure navbar links are always focusable.
  document.querySelectorAll('nav a').forEach(link => {
    link.tabIndex = 0;
  });
}

// Instead of solely relying on ScrollTrigger callbacks (which seem to delay activating .second),
// use an IntersectionObserver to detect when a pinned section is actually visible. This observer
// will update the active section immediately when at least 50% of it is in view.
const observerOptions = {
  root: null,         // use the viewport as container
  threshold: 0.5      // fire when 50% visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // When a section is mostly intersecting, update its focusable elements immediately.
    if (entry.isIntersecting) {
      updateTabIndexesForSection(entry.target);
      // (Optional) for debugging:
      // console.log('Active section updated via IntersectionObserver:', entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.first, .second, .third, .fourth').forEach(section => {
  sectionObserver.observe(section);
});

// Also, initialize focus management for the first section on page load.
updateTabIndexesForSection(document.querySelector('.first'));


// --------------------------
// Easter Egg: Long Press on .team-card (Unique GIF per card, fade in/out, replayable)
// --------------------------
const LONG_PRESS_DURATION = 600; // milliseconds

document.querySelectorAll('.team-card').forEach(card => {
  let pressTimer;
  let overlay;

  // Ensure the card is positioned relatively if it isn’t already
  if (getComputedStyle(card).position === 'static') {
    card.style.position = 'relative';
  }

  // Function to show the overlay with a fade in
  function showOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('easter-egg-overlay');

    // Retrieve the specific GIF URL from the card
    const gifUrl = card.getAttribute('data-easter-gif');
    if (gifUrl) {
      overlay.style.backgroundImage = 'url(' + gifUrl + ')';
    }

    // Start with 0 opacity so we can fade in
    overlay.style.opacity = '0';
    card.appendChild(overlay);

    // Use requestAnimationFrame to ensure the browser applies the initial opacity,
    // then change it to 1 to trigger the fade in transition.
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  }

  // Function to hide (fade out) and then remove the overlay
  function hideOverlay() {
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay && overlay.parentElement) {
          overlay.remove();
          overlay = null;
        }
      }, 300); // This should match the CSS transition duration
    }
  }

  // Start timer on mouse or touch start
  card.addEventListener('mousedown', () => {
    pressTimer = setTimeout(showOverlay, LONG_PRESS_DURATION);
  });
  card.addEventListener('touchstart', () => {
    pressTimer = setTimeout(showOverlay, LONG_PRESS_DURATION);
  });

  // Clear timer and hide overlay when press stops
  card.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    hideOverlay();
  });
  card.addEventListener('mouseleave', () => {
    clearTimeout(pressTimer);
    hideOverlay();
  });
  card.addEventListener('touchend', () => {
    clearTimeout(pressTimer);
    hideOverlay();
  });
  card.addEventListener('touchcancel', () => {
    clearTimeout(pressTimer);
    hideOverlay();
  });
});


// --------------------------
// BREAKPOINTS: Responsive Adjustments
// --------------------------

if (window.matchMedia("(max-width: 768px)").matches) {
  console.log("Mobile breakpoint logic executed");
  console.log("imageGreeting initial state:", imageGreeting);

  tlIntro.clear();
  tlIntro
    .to(greeting,      { opacity: 0, duration: 0.7, ease: "power2.out" }, "<")
    .to(titleName,     { y: "-30vh", x: "0vw", scale: 1.15, duration: 0.7, ease: "power2.out" }, "<")
    .to(nav,           { x: "0%", y: "0%", opacity: 1, duration: 0.7, ease: "power2.out" }, "<")
    .to(imageGreeting, { opacity: 1, scale: 0.5, y: "-38%", x: "-45%", duration: 0.7, ease: "power2.out" }, "<")
    .to(bgImage,       { filter: "blur(0px) brightness(1)", scale: 1.1, duration: 0.7, ease: "power2.out" }, "<")
    .to(homeButton,    { opacity: 0, duration: 0, ease: "none" }, "<");

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.team-cards-grid');
  if (!grid) return;
  
  // Create arrow buttons
  const leftArrow = document.createElement('button');
  leftArrow.classList.add('arrow', 'arrow-left');
  leftArrow.setAttribute('aria-label', 'Previous Card');
  leftArrow.innerHTML = '&#10094;'; // Left arrow symbol
  
  const rightArrow = document.createElement('button');
  rightArrow.classList.add('arrow', 'arrow-right');
  rightArrow.setAttribute('aria-label', 'Next Card');
  rightArrow.innerHTML = '&#10095;'; // Right arrow symbol
  
  // Insert arrows relative to the grid’s parent element
  grid.parentElement.insertBefore(leftArrow, grid);
  grid.parentElement.appendChild(rightArrow);
  
  // Function to get the index of the currently centered card
  function getCenteredCardIndex() {
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2;
    const cards = Array.from(grid.querySelectorAll('.team-card'));
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - gridCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  }
  
  // Function to center a given card in the grid
  function centerCard(targetCard) {
    // Calculate desired scrollLeft so that the target card's center aligns with grid's center
    const desiredScrollLeft = targetCard.offsetLeft - ((grid.clientWidth - targetCard.clientWidth) / 2);
    grid.scrollTo({
      left: desiredScrollLeft,
      behavior: 'smooth'
    });
  }
  
  // Function that scrolls to the next or previous card based on direction
  function scrollToCard(direction) {
    const cards = Array.from(grid.querySelectorAll('.team-card'));
    if (cards.length === 0) return;
    
    const currentIndex = getCenteredCardIndex();
    let targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    targetIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
    centerCard(cards[targetIndex]);
  }
  
  // Attach click events to the arrow buttons
  leftArrow.addEventListener('click', () => scrollToCard('prev'));
  rightArrow.addEventListener('click', () => scrollToCard('next'));
  
  // Optional: Add keyboard navigation for left/right arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      scrollToCard('prev');
    } else if (e.key === 'ArrowRight') {
      scrollToCard('next');
    }
  });
});



}




