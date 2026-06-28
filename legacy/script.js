const navItems = document.querySelectorAll(".nav__link");
const cursor = document.querySelector(".cursor");
const root = document.documentElement;
const parallaxRoot = document.querySelector("[data-parallax-root]");
const parallaxText = document.querySelector("[data-parallax='text']");
const parallaxOrb = document.querySelector("[data-parallax='orb']");
const tiltCard = document.querySelector("[data-tilt-card]");
const tiltLayers = document.querySelectorAll("[data-tilt-layer]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarToggle = document.querySelector(".sidebar__toggle--floating");
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("is-open");
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar?.classList.remove("is-open");
  });
});

const sections = Array.from(document.querySelectorAll("section[id]"));

const setActiveLink = () => {
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navItems.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === `#${currentId}`);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const updateParallax = () => {
  const scrollY = window.scrollY;
  const shiftX = Math.sin(scrollY / 400) * 20;
  const shiftY = scrollY * 0.05;
  root.style.setProperty("--grid-x", `${shiftX}px`);
  root.style.setProperty("--grid-y", `${shiftY}px`);
};

window.addEventListener("scroll", updateParallax);
window.addEventListener("load", updateParallax);

if (parallaxRoot) {
  parallaxRoot.addEventListener("mousemove", (event) => {
    const rect = parallaxRoot.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    const textX = offsetX * 14;
    const textY = offsetY * 14;
    const orbX = offsetX * -22;
    const orbY = offsetY * -22;

    if (parallaxText) {
      parallaxText.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
    }

    if (parallaxOrb) {
      parallaxOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
    }

    if (tiltCard) {
      const tiltX = offsetY * -12;
      const tiltY = offsetX * 12;
      tiltCard.style.transform = `perspective(1100px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      tiltLayers.forEach((layer) => {
        const depth = Number(layer.dataset.tiltLayer || 0);
        const shiftX = offsetX * depth * 18;
        const shiftY = offsetY * depth * 18;
        layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${depth * 14}px)`;
      });
    }
  });

  parallaxRoot.addEventListener("mouseleave", () => {
    if (parallaxText) parallaxText.style.transform = "translate3d(0, 0, 0)";
    if (parallaxOrb) parallaxOrb.style.transform = "translate3d(0, 0, 0)";
    if (tiltCard) {
      tiltCard.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      tiltLayers.forEach((layer) => {
        layer.style.transform = "translate3d(0, 0, 0)";
      });
    }
  });
}


const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

let cursorX = 0;
let cursorY = 0;
let cursorVisible = false;

const cursorShrinkSelectors = [
  "button",
  ".btn",
  ".nav__cta",
  ".sidebar__toggle",
  ".nav__link",
  ".card",
  ".timeline__content"
];

const shouldShrinkCursor = (target) =>
  !!target.closest(cursorShrinkSelectors.join(","));

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  if (cursor && !cursorVisible) {
    cursor.classList.add("is-visible");
    cursorVisible = true;
  }

  if (cursor) {
    cursor.classList.toggle("is-compact", shouldShrinkCursor(event.target));
  }
});

const renderCursor = () => {
  if (cursor) {
    cursor.style.transform = cursor.classList.contains("is-compact")
      ? `translate(${cursorX}px, ${cursorY}px) scale(0.6)`
      : `translate(${cursorX}px, ${cursorY}px)`;
  }
  requestAnimationFrame(renderCursor);
};

renderCursor();
