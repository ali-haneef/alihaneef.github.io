(() => {
  "use strict";

  /* Mobile navigation toggle */
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  /* Project detail modal */
  const projectModal = document.querySelector("#project-modal");
  const projectModalImage = projectModal?.querySelector(".project-modal-image");
  const projectModalTitle = projectModal?.querySelector("#modal-project-title");
  const projectModalDescription = projectModal?.querySelector(
    ".project-modal-description"
  );
  const projectModalTags = projectModal?.querySelector(".project-modal-tags");
  const projectModalLink = projectModal?.querySelector(".project-modal-link");
  const projectModalClose = projectModal?.querySelector(".project-modal-close");
  let lastFocusedProject = null;

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocusedProject?.focus();
  };

  const openProjectModal = (projectCard) => {
    if (
      !projectModal ||
      !projectModalImage ||
      !projectModalTitle ||
      !projectModalDescription ||
      !projectModalTags
    ) {
      return;
    }

    const image = projectCard.querySelector(".project-image");
    const title = projectCard.querySelector(".project-info h3");
    const description = projectCard.querySelector(".project-info p");
    const tags = projectCard.querySelector(".project-info .tags");

    if (!image || !title || !description || !tags) return;

    lastFocusedProject = projectCard;
    projectModalImage.src = image.currentSrc || image.src;
    projectModalImage.alt = image.alt;
    projectModalTitle.textContent = title.textContent.trim();
    projectModalDescription.textContent = description.textContent.trim();
    if (projectModalLink) {
      projectModalLink.href = projectCard.dataset.liveUrl || "#";
      projectModalLink.hidden = !projectCard.dataset.liveUrl;
    }
    projectModalTags.replaceChildren(
      ...Array.from(tags.children, (tag) => tag.cloneNode(true))
    );
    projectModal.hidden = false;
    document.body.classList.add("modal-open");
    projectModalClose?.focus();
  };

  document.querySelectorAll(".project-card").forEach((projectCard) => {
    projectCard.addEventListener("click", () => openProjectModal(projectCard));
    projectCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(projectCard);
      }
    });
  });

  projectModal?.querySelectorAll("[data-modal-close]").forEach((control) => {
    control.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && projectModal && !projectModal.hidden) {
      closeProjectModal();
    }
  });

  /* Active nav link tracking based on section in view */
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.find(
            (a) => a.getAttribute("href") === `#${entry.target.id}`
          );
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* Reveal-on-scroll for project cards and section headings */
  const revealTargets = document.querySelectorAll(
    ".project-card, .section-heading, .skill-row, .timeline-item"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* Update footer year automatically if present */
  const yearEl = document.querySelector(".contact-bottom span");
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Ali Haneef`;
  }
})();
